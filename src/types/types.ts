import { Theme as MuiTheme } from "@mui/material/styles";

export interface MyTheme extends MuiTheme {
  palette: MuiTheme["palette"] & {
    mode: "light" | "dark";
  };
}

export interface FormData {
  title: string;
  description: string;
  dueDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export interface TaskContextType {
  tasks: Task[];
  editTask: Task | null;
  addTask: (task: Task) => void;
  handleDelete: (taskId: string) => void;
  setEditableTask: (task: Task) => void;
  handleEditTask: (taskId: string, updatedTask: Task) => void;
  setEditTask: React.Dispatch<React.SetStateAction<Task | null>>;
}
