import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setToken, setUser, setAuthenticated } = useAuthContext();
  //   const [items, setItems] = React.useState([]);

  //   React.useEffect(() => {
  //     const storedItems = JSON.parse(localStorage.getItem("spotify_user"));
  //     if (storedItems) {
  //       setItems(storedItems);
  //     }
  //   }, []);
  //   console.log("user", items.name);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("spotify_user");

    setToken(null);
    setUser(null);
    setAuthenticated(false);
    handleClose();
    navigate("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="profile and signout">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                textTransform: "uppercase",
                backgroundColor: "green",
              }}
            >
              M
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Link to={"https://www.spotify.com/in-en/premium/"}>Premium</Link>
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
