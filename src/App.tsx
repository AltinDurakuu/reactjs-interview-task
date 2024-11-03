import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "antd/dist/antd";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import NoteEditor from "./components/NoteEditor/NoteEditor";
import NoteList from "./components/NoteList.tsx/NoteList";

const { Content } = Layout;

interface Category {
  id: number;
  name: string;
}
interface Note {
  id: number;
  name: string;
  category_id: number;
  content: string;
}

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [openEditor, setOpenEditor] = useState<boolean>(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  useEffect(() => {
    axios
      .get("/categories.txt")
      .then((response) => {
        const data = response.data;
        const parsedCategories = data.split("\n").map((line: string) => {
          const [id, name] = line.split(",");
          return { id: parseInt(id), name };
        });
        setCategories(parsedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <Layout className="App">
      <Header />
      <Content style={{ margin: "10px", display: "flex" }}>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setOpenEditor={setOpenEditor}
        />
        {activeCategory && (
          <NoteList
            activeCategory={activeCategory}
            notes={notes}
            setNotes={setNotes}
            setActiveNote={setActiveNote}
            setOpenEditor={setOpenEditor}
          />
        )}
        {openEditor && (
          <NoteEditor
            activeNote={activeNote}
            setActiveNote={(note: Note | null) => {
              setActiveNote(note);
            }}
          />
        )}
      </Content>
    </Layout>
  );
}

export default App;
