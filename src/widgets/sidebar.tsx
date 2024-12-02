import React from "react";
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Icon from '@mui/material/Icon';

export default function Sidebar(props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key="Inbox" disablePadding>
          <Link to="/" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>inbox_text</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Next" disablePadding>
          <Link to="/next" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>arrow_circle_right</Icon>
              </ListItemIcon>
              <ListItemText primary="Next" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Waiting" disablePadding>
          <Link to="/waiting" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>hourglass_empty</Icon>
              </ListItemIcon>
              <ListItemText primary="Waiting" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Scheduled" disablePadding>
          <Link to="/scheduled" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>calendar_month</Icon>
              </ListItemIcon>
              <ListItemText primary="Scheduled" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Someday" disablePadding>
          <Link to="/someday" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>wb_twilight</Icon>
              </ListItemIcon>
              <ListItemText primary="Someday" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Focus" disablePadding>
          <Link to="/focus" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>star</Icon>
              </ListItemIcon>
              <ListItemText primary="Focus" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>

      <Divider />
      
      <List>
        <ListItem key="Projects" disablePadding>
          <Link to="/projects" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>business_center</Icon>
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </Link>
        </ListItem>
        {/* <ListItem key="Notebooks" disablePadding>
          <Link to="/notebooks" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>description</Icon>
              </ListItemIcon>
              <ListItemText primary="Notebooks" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Tags" disablePadding>
          <Link to="/tags" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>sell</Icon>
              </ListItemIcon>
              <ListItemText primary="Tags" />
            </ListItemButton>
          </Link>
        </ListItem> */}
      </List>

      <Divider />
      
      <List>
        <ListItem key="Archive" disablePadding>
          <Link to="/archive" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>archive</Icon>
              </ListItemIcon>
              <ListItemText primary="Archive" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Trash" disablePadding>
          <Link to="/trash" className="linkMenu">
            <ListItemButton>
              <ListItemIcon>
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <div className="menu" onClick={toggleDrawer(true)}>
        <IconButton>
          <Icon fontSize="medium">menu</Icon>
        </IconButton>
      </div>
      <SwipeableDrawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </SwipeableDrawer>
    </div>
  );
}
