import { render, screen, fireEvent } from "@testing-library/react";
import Categories from "./Categories";
import AddTitleForm from "./AddCategoryForm";

describe("Categories Component", () => {
  const mockCategories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
  ];
  const mockSetActiveCategory = jest.fn();
  const mockSetOpenEditor = jest.fn();

  it("should render a list of categories", () => {
    render(
      <Categories
        categories={mockCategories}
        activeCategory={null}
        setActiveCategory={mockSetActiveCategory}
        setOpenEditor={mockSetOpenEditor}
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
      />
    );

    fireEvent.click(screen.getByText("Create Category"));
    expect(screen.getByPlaceholderText("Add a title...")).toBeInTheDocument();
  });
});



describe("AddCategoryForm Component", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  it("should call onSubmit with the title value", () => {
    render(<AddTitleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const input = screen.getByPlaceholderText("Add a title...");
    fireEvent.change(input, { target: { value: "New Category" } });
    fireEvent.submit(screen.getByRole("button", { name: /check/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith("New Category");
    expect(input).toHaveValue("");
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(<AddTitleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should clear the input after submission", () => {
    render(<AddTitleForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText("Add a title...");
    fireEvent.change(input, { target: { value: "New Category" } });
    fireEvent.submit(screen.getByRole("button", { name: /check/i }));

    expect(input).toHaveValue("");
  });
});