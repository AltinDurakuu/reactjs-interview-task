import { PlusOutlined } from "@ant-design/icons";
import styles from "./CreateButton.module.css";

interface CreateButtonProps {
  text: string;
  width?: string;
  onClick?: () => void;
}

const CreateButton = ({ text, width, onClick }: CreateButtonProps) => {
  return (
    <button onClick={onClick} style={{ width: width }} className={styles.createButton}>
      <span className={styles.text}>{text}</span>
      <span className={styles.icon}>
        <PlusOutlined />
      </span>
    </button>
  );
};

export default CreateButton;
