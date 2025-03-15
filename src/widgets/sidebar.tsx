import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Icon from '@mui/material/Icon';

import { SidebarContext } from "../app/App.tsx";
import { SidebarState } from "../entities/types/sidebar/sidebar_state.ts";

export default function Sidebar(props) {

  const { sidebar, setSidebar } = useContext(SidebarContext);

  const closeSidebar = () => {
    const new_sidebar = new SidebarState();
    new_sidebar.close();
    setSidebar(new_sidebar);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>closeSidebar()}>
      <List>
          <Link to="/" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>inbox_text</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </Link>
          <Link to="/next" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>arrow_circle_right</Icon>
              </ListItemIcon>
              <ListItemText primary="Next" />
            </ListItemButton>
          </Link>
          <Link to="/waiting" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>hourglass_empty</Icon>
              </ListItemIcon>
              <ListItemText primary="Waiting" />
            </ListItemButton>
          </Link>
          <Link to="/scheduled" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>calendar_month</Icon>
              </ListItemIcon>
              <ListItemText primary="Scheduled" />
            </ListItemButton>
          </Link>
          <Link to="/someday" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>wb_twilight</Icon>
              </ListItemIcon>
              <ListItemText primary="Someday" />
            </ListItemButton>
          </Link>
          <Link to="/focus" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>star</Icon>
              </ListItemIcon>
              <ListItemText primary="Focus" />
            </ListItemButton>
          </Link>
      </List>

      <Divider />
      
      <List>
          <Link to="/areas" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>label_important</Icon>
              </ListItemIcon>
              <ListItemText primary="Areas" />
            </ListItemButton>
          </Link>
          <Link to="/projects" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>business_center</Icon>
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </Link>
          <Link to="/contacts" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>person</Icon>
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItemButton>
          </Link>
        {/* 
          <Link to="/notebooks" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>description</Icon>
              </ListItemIcon>
              <ListItemText primary="Notebooks" />
            </ListItemButton>
          </Link>
          <Link to="/tags" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>sell</Icon>
              </ListItemIcon>
              <ListItemText primary="Tags" />
            </ListItemButton>
          </Link> */}
      </List>

      <Divider />
      
      <List>
          <Link to="/archive" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>archive</Icon>
              </ListItemIcon>
              <ListItemText primary="Archive" />
            </ListItemButton>
          </Link>
          <Link to="/trash" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </Link>
      </List>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer open={sidebar.isOpen()} onClose={()=>closeSidebar()}>
        {DrawerList}
      </SwipeableDrawer>
    </div>
  );
}
