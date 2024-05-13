import React, { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { FormData } from "../types/types";
import { useTaskContext } from "../context/TaskContext";

const Form: React.FC = () => {
  const { addTask, editTask, handleEditTask, setEditTask } = useTaskContext();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description,
        dueDate: editTask.dueDate,
      });
    }
  }, [editTask]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      const task = {
        id: editTask ? editTask.id : Date.now().toString(),
        ...formData,
      };

      // If editTask is not null, then we are editing a task
      if (editTask) {
        handleEditTask(editTask.id, task);
        setEditTask(null);
      } else {
        addTask(task);
      }

      setFormData({ title: "", description: "", dueDate: "" });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="dueDate"
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {editTask ? "Edit Task" : "Add Task"}
          </Button>

          {editTask && (
            <Button
              style={{ marginLeft: 10 }}
              variant="contained"
              color="primary"
              onClick={() => {
                setEditTask(null);
                setFormData({ title: "", description: "", dueDate: "" });
              }}
            >
              Cancel
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
