import { FormEvent } from "react";
import styles from "./NoteEditor.module.css";
import { Button } from "antd";
import DeleteButton from "./../utils/DeleteButton";
import { createNote, deleteNote, updateNote } from "./../utils/notesapi";

interface NoteEditorProps {
  activeNote: Note | null;
  setActiveNote: (note: Note) => void;
  fetchNotes: () => void;
}

export interface Note {
  id: number;
  name: string;
  category_id: number;
  content: string;
}

function NoteEditor({ activeNote, setActiveNote, fetchNotes}: NoteEditorProps) {

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (activeNote) {
      try {
        if (activeNote.id === 0) {
          const newNote = await createNote(activeNote);
          setActiveNote({ ...newNote });
        } else {
          const updatedNote = await updateNote(activeNote);
          setActiveNote({ ...updatedNote });
        }
        console.log("Note saved successfully");
      } catch (error) {
        console.error("Error saving note:", error);
      } finally {
        fetchNotes()
      }
    }
  };

  const handleDelete = async () => {
    if (activeNote && activeNote.id !== 0) {
      try {
        await deleteNote(activeNote.id);
        setActiveNote({id: 0, name: "", category_id: 0, content: ""});
        console.log("Note deleted successfully");
      } catch (error) {
        console.error("Error deleting note:", error);
      } finally {
        fetchNotes()
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (activeNote) {
      setActiveNote({
        ...activeNote,
      [name]: name === "id" ? Number(value) : value,
      });
    }
  };

  return (
    <form
      className={styles.noteContainer}
      data-testid="note-form"
      onSubmit={handleSubmit}
    >
      <div className={styles.topButtons}>
        <div>
          <Button
            className={styles.topButton}
            style={{ backgroundColor: "#1264A3" }}
          />
          <Button
            className={styles.topButton}
            style={{ backgroundColor: "#1264A3" }}
          />
          <Button
            className={styles.topButton}
            style={{ backgroundColor: "#71CF48" }}
          />
        </div>
        <div className={styles.rightSideButtons}>
          <Button
            className={styles.topButton}
            style={{ backgroundColor: "#1264A3" }}
          />
          <Button
            className={styles.topButton}
            style={{ backgroundColor: "#1264A3" }}
          />
          <Button
            className={styles.topButton}
            style={{ backgroundColor: "#1264A3" }}
          />
        </div>
      </div>

      <input
        className={styles.titleInput}
        name="name"
        value={activeNote?.name}
        placeholder="Add a title"
        onChange={handleChange}
      />

      <textarea
        className={styles.noteArea}
        name="content"
        value={activeNote?.content || ""}
        placeholder="Write your note here..."
        onChange={handleChange}
      ></textarea>

      <div className={styles.bottomButtons}>
        {activeNote?.id !== 0 && <DeleteButton onClick={handleDelete} />}
        <Button className={styles.saveButton} type="primary" htmlType="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default NoteEditor;
