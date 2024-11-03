import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export interface Category {
  id?: number;
  name: string;
}

export interface Note {
  id: number;
  name: string;
  category_id: number;
  content: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

export const createCategory = async (name: string): Promise<Category> => {
  const response = await axios.post(`${API_BASE_URL}/categories`, { name });
  return response.data;
};

export const getNotesByCategory = async (
  categoryId: number
): Promise<Note[]> => {
  const response = await axios.get(`${API_BASE_URL}/notes/${categoryId}`);
  return response.data;
};

export const updateNote = async (note: Note): Promise<Note> => {
  const response = await axios.put(`${API_BASE_URL}/notes/${note.id}`, note);
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/notes/${noteId}`);
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const response = await axios.post(`${API_BASE_URL}/notes`, note);
  return response.data;
};
