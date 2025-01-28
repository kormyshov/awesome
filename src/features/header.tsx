import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { SidebarContext } from '../app/App.tsx';
import { SidebarState } from '../entities/types/sidebar/sidebar_state.tsx';

function Header(props) {

  const { setSidebar } = useContext(SidebarContext);

  const openSidebar = () => {
    const new_sidebar = new SidebarState();
    new_sidebar.open();
    setSidebar(new_sidebar);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>openSidebar()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.page_name}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
