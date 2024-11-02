import { Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./NoteList.module.css";
import CreateButton from "../utils/CreateButton";
import React, { useEffect } from "react";
import axios from "axios";

interface Note {
  id: number;
  name: string;
  category_id: number;
  content: string;
}

interface NoteListProps {
  activeCategory: number | null;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  setOpenEditor: (openEditor: boolean) => void;
  setActiveNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

function NoteList({
  activeCategory,
  notes,
  setOpenEditor,
  setNotes,
  setActiveNote,
}: NoteListProps) {

  useEffect(() => {
    axios
      .get("/notes.txt")
      .then((response) => {
        const data = response.data;
        const parsedNotes = data.split("\n").map((line: string) => {
          const [id, name, category_id, content] = line.split(",");
          return {
            id: parseInt(id),
            name,
            category_id: parseInt(category_id),
            content,
          };
        });
        const filteredNotes: Note[] = activeCategory
          ? parsedNotes.filter(
              (note: { category_id: number }) =>
                note.category_id === activeCategory
            )
          : parsedNotes;

        setNotes(filteredNotes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, [activeCategory]);

  const handleCreateNote = () => {
    setOpenEditor(true);
    setActiveNote({
      id: 0,
      name: "",
      category_id: activeCategory || 0,
      content: "",
    });
  }

  return (
    <div className={styles.noteListContainer}>
      <div className={styles.noteListHeader}>
        <CreateButton  onClick={handleCreateNote} width={"218px"} text="Create Note" />
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.notesList}>
        {notes.map((note) => (
          <div
            onClick={() => {
              setActiveNote(note);
              setOpenEditor(true);
            }}
            key={note.id}
            className={styles.noteItem}
          >
            <h3 className={styles.noteTitle}>{note.name}</h3>
            <p className={styles.noteContent}>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
