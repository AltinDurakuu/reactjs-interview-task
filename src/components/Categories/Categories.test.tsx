import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import  Categories  from "./Categories";
import AddTitleForm from "./AddCategoryForm";
import { createCategory } from "../utils/notesapi";

jest.mock("../utils/notesapi", () => ({
  createCategory: jest.fn(),
}));

describe("Categories Component", () => {
  const mockCategories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
  ];
  const mockSetActiveCategory = jest.fn();
  const mockSetOpenEditor = jest.fn();
  const mockFetchCategories = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a list of categories", () => {
    render(
      <Categories
        categories={mockCategories}
        activeCategory={null}
        setActiveCategory={mockSetActiveCategory}
        setOpenEditor={mockSetOpenEditor}
        fetchCategories={mockFetchCategories}
      />
    );

    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  it("should display CreateButton initially", () => {
    render(
      <Categories
        categories={mockCategories}
        setActiveCategory={mockSetActiveCategory}
        activeCategory={null}
        setOpenEditor={mockSetOpenEditor}
        fetchCategories={mockFetchCategories}
      />
    );

    expect(screen.getByText("Create Category")).toBeInTheDocument();
  });

  it("should toggle to AddTitleForm when CreateButton is clicked", () => {
    render(
      <Categories
        categories={mockCategories}
        activeCategory={null}
        setActiveCategory={mockSetActiveCategory}
        setOpenEditor={mockSetOpenEditor}
        fetchCategories={mockFetchCategories}
      />
    );

    fireEvent.click(screen.getByText("Create Category"));
    expect(screen.getByPlaceholderText("Add a title...")).toBeInTheDocument();
  });

  it("should call createCategory and fetchCategories when a new category is submitted", async () => {
    (createCategory as jest.Mock).mockResolvedValue({
      id: 3,
      name: "New Category",
    });

    render(
      <Categories
        categories={mockCategories}
        activeCategory={null}
        setActiveCategory={mockSetActiveCategory}
        setOpenEditor={mockSetOpenEditor}
        fetchCategories={mockFetchCategories}
      />
    );

    fireEvent.click(screen.getByText("Create Category"));
    const input = screen.getByPlaceholderText("Add a title...");
    fireEvent.change(input, { target: { value: "New Category" } });
    fireEvent.click(screen.getByRole("button", { name: /check/i }));

    await waitFor(() => {
      expect(createCategory).toHaveBeenCalledWith("New Category");
      expect(mockFetchCategories).toHaveBeenCalled();
    });
  });
});

describe("AddCategoryForm Component", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onSubmit with the title value", async () => {
    render(<AddTitleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const input = screen.getByPlaceholderText("Add a title...");
    fireEvent.change(input, { target: { value: "New Category" } });
    fireEvent.click(screen.getByRole("button", { name: /check/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith("New Category");
      expect(input).toHaveValue("");
    });
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(<AddTitleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should clear the input after submission", async () => {
    render(<AddTitleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const input = screen.getByPlaceholderText("Add a title...");
    fireEvent.change(input, { target: { value: "New Category" } });
    fireEvent.click(screen.getByRole("button", { name: /check/i }));

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });
});
