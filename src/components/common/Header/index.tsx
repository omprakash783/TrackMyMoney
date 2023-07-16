import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export const Header: React.FC = (props: Props) => {
  /* -------------------------------------------------------------------------- */
  /*                               For Mobile View : Start                       */
  /* -------------------------------------------------------------------------- */
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" component={"span"} sx={{ color: "red" }}>
          TRACK MY{" "}
        </Typography>
        <Typography variant="h6" component={"span"} sx={{ color: "green" }}>
          MONEY
        </Typography>
      </Box>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  /* -------------------------------------------------------------------------- */
  /*                           For Mobile View : End                            */
  /* -------------------------------------------------------------------------- */

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" elevation={0} sx={{ background: "#d0bfff" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              textAlign: "center",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              padding: "20px"
            }}
          >
            <Typography variant="h3" component={"span"} sx={{ color: "red" }}>
              TRACKMy
            </Typography>
            <Typography variant="h3" component={"span"} sx={{ color: "green" }}>
              MONEY
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
};
