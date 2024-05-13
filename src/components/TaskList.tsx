import React from "react";
import { useTaskContext } from "../context/TaskContext";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import useMobileWidth from "../hooks/useMobileWidth";

const TaskList: React.FC = () => {
  const { tasks, handleDelete, setEditableTask } = useTaskContext();
  const isMobileWidth = useMobileWidth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        marginTop: 5,
        marginX: isMobileWidth ? 2 : 10,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Task List
      </Typography>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} md={4} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {task.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  {task.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  Due Date: {task.dueDate}
                </Typography>
              </CardContent>

              <CardActions>
                <IconButton onClick={() => handleDelete(task.id)}>
                  <Delete style={{ color: "red" }} />
                </IconButton>

                <IconButton onClick={() => setEditableTask(task)}>
                  <Edit style={{ color: "blue" }} />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskList;
