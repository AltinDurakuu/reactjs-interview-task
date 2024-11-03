import styles from "./Category.module.css";
import { Button } from "antd";
import {
  CaretDownOutlined,
  CaretRightFilled,
  FolderFilled,
} from "@ant-design/icons";

interface CategoryProps {
  id: number;
  name: string;
  activeCategory: number | null;
  setActiveCategory: (id: number | null) => void;
  setOpenEditor: (openEditor: boolean) => void;
}

const CategoryItem = ({
  name,
  id,
  activeCategory,
  setOpenEditor,
  setActiveCategory,
}: CategoryProps) => {
  const handleOnClick = (id: number) => {
    if (id == activeCategory) {
      setActiveCategory(null);
      setOpenEditor(true);
      return;
    }
    setOpenEditor(false);
    setActiveCategory(id);
  };

  return (
    <Button
      onClick={() => handleOnClick(id)}
      className={`${styles.categoryButton} ${
        activeCategory == id ? styles.activeCategory : ""
      }`}
    >
      <div className={styles.iconTextContainer}>
        <FolderFilled className={styles.icon} />
        <span>
          {name}
        </span>
      </div>
      {activeCategory == id ? (
        <CaretRightFilled className={styles.dropdownIcon} />
      ) : (
        <CaretDownOutlined className={styles.dropdownIcon} />
      )}
    </Button>
  );
};

export default CategoryItem;
