import React, { createContext, useContext, useState, useEffect } from "react";
import { Task, TaskContextType } from "../types/types";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Load tasks from local storage
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  // Edit task state
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const setEditableTask = (task: Task) => {
    setEditTask(task);
  };

  // Edit task function
  const handleEditTask = (taskId: string, updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        handleDelete,
        editTask,
        setEditableTask,
        handleEditTask,
        setEditTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
