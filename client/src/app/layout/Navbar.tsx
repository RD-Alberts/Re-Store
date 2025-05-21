import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const naveStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};


export default function Navbar() {
  const {isLoading, darkMode} = useAppSelector(state => state.ui);
  const dispach = useAppDispatch();
  return (
    <AppBar position="fixed">
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box display='flex' alignItems='center'>
           <Typography sx={naveStyles} component={NavLink} to={"/"} variant="h6">
          RE-STORE
        </Typography>
        <IconButton onClick={() => dispach(setDarkMode())}>
          {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
        </IconButton>
        </Box>
       

        {/* List in the middle of the navbar */}
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={naveStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton sx={{ color: "inherit" }} size="large">
          <Badge badgeContent="4" color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {/* List on the right of the navbar */}
        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={naveStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{width: '100%'}}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  );
}
