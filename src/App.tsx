import "./App.css";
import AddTask from "./components/AddTask";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useMemo, useState } from "react";
import NavBar from "./components/NavBar";
import { MyTheme } from "./types/types";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList";

// Create a context to manage the color mode
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Create a function to toggle the color mode
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Create a theme instance
  const theme: MyTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TaskProvider>
          <NavBar />
          <AddTask />
          <TaskList />
        </TaskProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
