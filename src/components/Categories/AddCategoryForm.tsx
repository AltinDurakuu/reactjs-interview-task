import { useState, FormEvent } from "react";
import { Input, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./AddCategoryForm.css";
import { createCategory } from "../utils/notesapi";

interface AddTitleFormProps {
  onSubmit: (title: string) => void;
  onCancel?: () => void;
}

const AddTitleForm = ({ onSubmit, onCancel }: AddTitleFormProps) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await onSubmit(title);
      setTitle("");
    }
  };

  const handleCancel = () => {
    setTitle("");
    onCancel && onCancel();
  };

  return (
    <form className="add-title-container" onSubmit={handleSubmit}>
      <Input
        className="add-title-input"
        placeholder="Add a title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        className="add-title-button confirm"
        icon={<CheckOutlined />}
        htmlType="submit"
      />
      <Button
        className="add-title-button cancel"
        icon={<CloseOutlined />}
        onClick={handleCancel}
      />
    </form>
  );
};

export default AddTitleForm;
