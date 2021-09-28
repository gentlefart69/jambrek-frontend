import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "./Auth/auth";
import { Link } from "react-router-dom";
import Register from "../pages/Register";

const Header = () => {
  const auth = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JD Leather belts
          </Typography>

          {!auth.currentUser ? (
            <>
              <Button to="/login" component={Link} color="inherit">
                Login
              </Button>
              <Button to="/register" component={Link} color="inherit">
                Register
              </Button>
            </>
          ) : null}
          {auth.currentUser ? (
            <>
              <Button to="/admin" component={Link} color="inherit">
                Admin Panel
              </Button>
              <Button
                onClick={() => {
                  auth.logout();
                }}
                color="inherit"
              >
                Logout ({auth.currentUser.email})
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
