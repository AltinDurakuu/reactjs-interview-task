import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "antd/dist/antd";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import NoteEditor from "./components/NoteEditor/NoteEditor";
import NoteList from "./components/NoteList.tsx/NoteList";
import { getCategories, getNotesByCategory, Category } from "./components/utils/notesapi";

const { Content } = Layout;

// interface Category {
//   id: number;
//   name: string;
// }
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
  const [activeNote, setActiveNote] = useState<Note | null>({id:0, name:"", content:"", category_id:0 });

  const fetchCategories = async () => {
    console.log("Fetching categories");
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
 
      console.log(fetchedCategories); 
      console.log("Categories fetched successfully");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("Fetching categories");
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        setActiveNote((prevNote) => ({
          id: prevNote?.id || 0,
          name: prevNote?.name || "",
          content: prevNote?.content || "",
          category_id: fetchedCategories[0]?.id || 0
        }));
        console.log(fetchedCategories); 
        console.log("Categories fetched successfully");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    
  }, []);

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

  useEffect(() => {
    fetchNotes();
  }, [activeCategory]);

  return (
    <Layout className="App">
      <Header />
      <Content style={{ margin: "10px", display: "flex" }}>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setOpenEditor={setOpenEditor}
          fetchCategories={fetchCategories}
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
            fetchNotes={fetchNotes}
          />
        )}
      </Content>
    </Layout>
  );
}

export default App;
