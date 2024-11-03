import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import NoteEditor, { Note } from "./NoteEditor";

// Mock the entire notesapi module
jest.mock("../utils/notesapi", () => ({
  createNote: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn(),
}));

describe("NoteEditor Component", () => {
  const mockSetActiveNote = jest.fn();
  const mockFetchNotes = jest.fn();

  const noteProps = {
    activeNote: {
      id: 1,
      name: "Test Title",
      content: "Test Content",
      category_id: 1,
    } as Note,
    setActiveNote: mockSetActiveNote,
    fetchNotes: mockFetchNotes,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(<NoteEditor {...noteProps} />);
    expect(screen.getByPlaceholderText("Add a title")).toHaveValue(
      noteProps.activeNote.name
    );
    expect(screen.getByPlaceholderText("Write your note here...")).toHaveValue(
      noteProps.activeNote.content
    );
  });

  it("updates title input on change", () => {
    render(<NoteEditor {...noteProps} />);
    const titleInput = screen.getByPlaceholderText("Add a title");
    fireEvent.change(titleInput, {
      target: { value: "New Title", name: "name" },
    });

    expect(mockSetActiveNote).toHaveBeenCalledWith({
      id: 1,
      name: "New Title",
      content: "Test Content",
      category_id: 1,
    });
  });

  it("updates content textarea on change", () => {
    render(<NoteEditor {...noteProps} />);
    const contentTextarea = screen.getByPlaceholderText(
      "Write your note here..."
    );
    fireEvent.change(contentTextarea, {
      target: { value: "New Content", name: "content" },
    });

    expect(mockSetActiveNote).toHaveBeenCalledWith({
      id: 1,
      name: "Test Title",
      content: "New Content",
      category_id: 1,
    });
  });

  it("calls updateNote on form submit for existing note", async () => {
    const { updateNote } = require("../utils/notesapi");
    updateNote.mockResolvedValue({
      ...noteProps.activeNote,
      name: "Updated Title",
    });

    render(<NoteEditor {...noteProps} />);
    const form = screen.getByTestId("note-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(updateNote).toHaveBeenCalledWith(noteProps.activeNote);
      expect(mockSetActiveNote).toHaveBeenCalledWith({
        ...noteProps.activeNote,
        name: "Updated Title",
      });
      expect(mockFetchNotes).toHaveBeenCalled();
    });
  });

  it("calls createNote on form submit for new note", async () => {
    const { createNote } = require("../utils/notesapi");
    createNote.mockResolvedValue({
      id: 2,
      name: "New Note",
      content: "",
      category_id: 1,
    });

    const newNoteProps = {
      ...noteProps,
      activeNote: { id: 0, name: "", content: "", category_id: 1 } as Note,
    };

    render(<NoteEditor {...newNoteProps} />);
    const form = screen.getByTestId("note-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(createNote).toHaveBeenCalledWith(newNoteProps.activeNote);
      expect(mockSetActiveNote).toHaveBeenCalledWith({
        id: 2,
        name: "New Note",
        content: "",
        category_id: 1,
      });
      expect(mockFetchNotes).toHaveBeenCalled();
    });
  });

  it("calls deleteNote when delete button is clicked", async () => {
    const { deleteNote } = require("../utils/notesapi");
    deleteNote.mockResolvedValue({});

    render(<NoteEditor {...noteProps} />);
    const deleteButton = screen.getByRole("button", { name: /delete note/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteNote).toHaveBeenCalledWith(noteProps.activeNote.id);
      expect(mockSetActiveNote).toHaveBeenCalledWith({
        id: 0,
        name: "",
        category_id: 0,
        content: "",
      });
      expect(mockFetchNotes).toHaveBeenCalled();
    });
  });
});
