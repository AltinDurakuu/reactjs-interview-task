import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NoteEditor, { Note } from "./NoteEditor";

describe("NoteEditor Component", () => {
  const mockSetNote = jest.fn();
  
  const noteProps = {
    activeNote: {
      id: 1,
      name: "Test Title",
      content: "Test Content",
      category_id: 1,
    } as Note,
    setActiveNote: mockSetNote,
  };
  
  beforeEach(() => {
    render(<NoteEditor {...noteProps} />);
  });

  test("renders correctly with initial props", () => {
    expect(screen.getByPlaceholderText("Add a title")).toHaveValue(noteProps.activeNote.name);
    expect(screen.getByPlaceholderText("Write your note here...")).toHaveValue(noteProps.activeNote.content);
  });

  test("updates title input on change", () => {
    const titleInput = screen.getByPlaceholderText("Add a title");
    fireEvent.change(titleInput, { target: { value: "New Title", name: "name" } });

    expect(mockSetNote).toHaveBeenCalledWith({
      id: 1,
      name: "New Title",
      content: "Test Content",
      category_id: 1,
    });
  });

  test("updates content textarea on change", () => {
    const contentTextarea = screen.getByPlaceholderText("Write your note here...");
    fireEvent.change(contentTextarea, { target: { value: "New Content", name: "content" } });

    expect(mockSetNote).toHaveBeenCalledWith({
      id: 1,
      name: "Test Title",
      content: "New Content",
      category_id: 1,
    });
  });

  test("calls handleSubmit on form submit", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const form = screen.getByTestId("note-form");
    
    fireEvent.submit(form);

    expect(consoleSpy).toHaveBeenCalledWith("activeNote saved:", noteProps.activeNote);
    
    consoleSpy.mockRestore(); 
  });
});
