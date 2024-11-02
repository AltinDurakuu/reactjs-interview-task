import { DeleteFilled } from "@ant-design/icons";
import styles from "./DeleteButton.module.css";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button onClick={onClick} className={styles.deleteButton} type="button">
      <span className={styles.text}>Delete Note</span>
      <span className={styles.icon}>
        <DeleteFilled />
      </span>
    </button>
  );
};

export default DeleteButton;
