import { useTheme } from "@emotion/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { ColorModeContext } from "../App";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { MyTheme } from "../types/types";

export default function NavBar() {
  const theme = useTheme() as MyTheme;
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ justifyContent: "space-between", width: "100%" }}
        >
          <Typography variant="h6" color="inherit" component="div">
            Task Manager
          </Typography>

          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
