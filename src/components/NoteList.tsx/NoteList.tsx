import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./NoteList.module.css";
import CreateButton from "../utils/CreateButton";
import React, { useEffect, useState } from "react";
import { getCategories, getNotesByCategory } from "./../utils/notesapi";

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
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchNotes = async () => {
      if (activeCategory) {
        try {
          const fetchedNotes = await getNotesByCategory(activeCategory);
          setNotes(fetchedNotes);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      }
    };
    fetchNotes();
  }, [activeCategory, setNotes]);

  const handleCreateNote = () => {
    setOpenEditor(true);
    setActiveNote({
      id: 0,
      name: "",
      category_id: activeCategory || 0,
      content: "",
    });
  };

  return (
    <div className={styles.noteListContainer}>
      <div className={styles.noteListHeader}>
        <CreateButton
          onClick={handleCreateNote}
          width={"218px"}
          text="Create Note"
        />
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className={styles.searchInput}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.notesList}>
        {filteredNotes.map((note) => (
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
