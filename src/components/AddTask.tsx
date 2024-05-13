import { FC } from "react";
import Form from "./Form";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useMobileWidth from "../hooks/useMobileWidth";

interface AddTaskProps {}

const AddTask: FC<AddTaskProps> = () => {
  const isMobileWidth = useMobileWidth();

  return (
    <Card
      sx={{
        maxWidth: isMobileWidth ? 350 : 800,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 1,
      }}
    >
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  );
};

export default AddTask;
