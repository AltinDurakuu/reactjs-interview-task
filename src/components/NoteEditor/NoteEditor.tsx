import { FormEvent } from "react";
import styles from "./NoteEditor.module.css";
import { Button } from "antd";
import DeleteButton from "./../utils/DeleteButton";

interface NoteEditorProps {
  activeNote: Note | null;
  setActiveNote: (note: Note) => void;
}

export interface Note {
  id: number;
  name: string;
  category_id: number;
  content: string;
}

function NoteEditor({ activeNote, setActiveNote}: NoteEditorProps) {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //if id is 0 add a new note, if not update the notea
    console.log("activeNote saved:", activeNote);
  };

  const handleDelete = () => {
    console.log("Note deleted:", activeNote?.id);
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
        {activeNote?.id !== undefined && <DeleteButton onClick={handleDelete} />}
        <Button className={styles.saveButton} type="primary" htmlType="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default NoteEditor;
