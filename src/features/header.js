import React from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { openSidebar } from '../entities/actions/sidebar.tsx';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Header(props) {

  const dispatch = useDispatch();

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
            onClick={()=>dispatch(openSidebar())}
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
