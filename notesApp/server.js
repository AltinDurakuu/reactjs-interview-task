const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "notesapp",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the database at:", res.rows[0].now);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Server setup complete. Now let's create our database tables.");

app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM category");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/categories", async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid category name" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO category (name) VALUES ($1) RETURNING *",
      [name.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/notes/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE category_id = $1",
      [categoryId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, content, category_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE notes SET name = $1, content = $2, category_id = $3 WHERE id = $4 RETURNING *",
      [name, content, category_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/notes", async (req, res) => {
  const { name, content, category_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO notes (name, content, category_id) VALUES ($1, $2, $3) RETURNING *",
      [name, content, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
