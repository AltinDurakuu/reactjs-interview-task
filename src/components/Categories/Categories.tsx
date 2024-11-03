import Category from "./Category";
import styles from "./Categories.module.css";
import CreateButton from "../utils/CreateButton";
import { useState } from "react";
import AddTitleForm from "./AddCategoryForm";

interface CategoriesProps {
  categories: category[];
  activeCategory: number | null;
  setActiveCategory: (id: number | null) => void;
  setOpenEditor: (openEditor: boolean) => void;
}
interface category {
  id: number;
  name: string;
}

const Categories = ({
  categories,
  activeCategory,
  setOpenEditor,
  setActiveCategory,
}: CategoriesProps) => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] =
    useState<boolean>(false);

  return (
    <div className={styles.categoriesContainer}>
      {isCreateCategoryOpen ? (
        <AddTitleForm
          onCancel={() => setIsCreateCategoryOpen(false)}
          onSubmit={(title: string) => {
            console.log(title);
            setIsCreateCategoryOpen(false);
          }}
        />
      ) : (
        <CreateButton
          onClick={() => setIsCreateCategoryOpen(true)}
          width={"100%"}
          text="Create Category"
        />
      )}
      {categories.map((category: category) => (
        <Category
          activeCategory={activeCategory}
          key={category.id}
          id={category.id}
          setActiveCategory={setActiveCategory}
          setOpenEditor={setOpenEditor}
          name={category.name}
        />
      ))}
    </div>
  );
};

export default Categories;
