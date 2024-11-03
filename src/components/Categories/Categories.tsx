import CategoryItem from "./Category";
import styles from "./Categories.module.css";
import CreateButton from "../utils/CreateButton";
import { useState } from "react";
import AddTitleForm from "./AddCategoryForm";
import { Category } from "../utils/notesapi";
import { createCategory } from "../utils/notesapi";

interface CategoriesProps {
  categories: Category[];
  activeCategory: number | null;
  setActiveCategory: (id: number | null) => void;
  setOpenEditor: (openEditor: boolean) => void;
  fetchCategories: () => void;
}

const Categories = ({
  categories,
  activeCategory,
  setOpenEditor,
  setActiveCategory,
  fetchCategories,
}: CategoriesProps) => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] =
    useState<boolean>(false);

  const handleSubmit = async (title: string) => {
    try {
      await createCategory(title.trim());
      console.log(title);
      setIsCreateCategoryOpen(false);
      await fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };
  return (
    <div className={styles.categoriesContainer}>
      {isCreateCategoryOpen ? (
        <AddTitleForm
          onCancel={() => setIsCreateCategoryOpen(false)}
          onSubmit={handleSubmit}
        />
      ) : (
        <CreateButton
          onClick={() => setIsCreateCategoryOpen(true)}
          width={"100%"}
          text="Create Category"
        />
      )}
      {categories.map((category: Category) => (
        <CategoryItem
          activeCategory={activeCategory}
          key={category.id}
          id={category.id ?? 0}
          setActiveCategory={setActiveCategory}
          setOpenEditor={setOpenEditor}
          name={category.name}
        />
      ))}
    </div>
  );
};

export default Categories;
