import React from "react";

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
import Typography from '@mui/material/Typography';

export default function Sidebar(props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography variant="h4" gutterBottom>
        AWESOME
      </Typography>
      <List>
        <ListItem key="Inbox" disablePadding>
          <ListItemButton onClick={props.tooglePage("Inbox")}>
            <ListItemIcon>
              <Icon>inbox_text</Icon>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Next" disablePadding>
          <ListItemButton onClick={props.tooglePage("Next")}>
            <ListItemIcon>
              <Icon>arrow_circle_right</Icon>
            </ListItemIcon>
            <ListItemText primary="Next" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Waiting" disablePadding>
          <ListItemButton onClick={props.tooglePage("Waiting")}>
            <ListItemIcon>
              <Icon>hourglass_empty</Icon>
            </ListItemIcon>
            <ListItemText primary="Waiting" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Scheduled" disablePadding>
          <ListItemButton onClick={props.tooglePage("Scheduled")}>
            <ListItemIcon>
              <Icon>calendar_month</Icon>
            </ListItemIcon>
            <ListItemText primary="Scheduled" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Someday" disablePadding>
          <ListItemButton onClick={props.tooglePage("Someday")}>
            <ListItemIcon>
              <Icon>wb_twilight</Icon>
            </ListItemIcon>
            <ListItemText primary="Someday" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Focus" disablePadding>
          <ListItemButton onClick={props.tooglePage("Focus")}>
            <ListItemIcon>
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Focus" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      
      <List>
      <ListItem key="Projects" disablePadding>
          <ListItemButton onClick={props.tooglePage("Projects")}>
            <ListItemIcon>
              <Icon>business_center</Icon>
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Notebooks" disablePadding>
          <ListItemButton onClick={props.tooglePage("Notebooks")}>
            <ListItemIcon>
              <Icon>description</Icon>
            </ListItemIcon>
            <ListItemText primary="Notebooks" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Tags" disablePadding>
          <ListItemButton onClick={props.tooglePage("Tags")}>
            <ListItemIcon>
              <Icon>sell</Icon>
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      
      <List>
      <ListItem key="Archive" disablePadding>
          <ListItemButton onClick={props.tooglePage("Archive")}>
            <ListItemIcon>
              <Icon>archive</Icon>
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Trash" disablePadding>
          <ListItemButton onClick={props.tooglePage("Trash")}>
            <ListItemIcon>
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <div className="menu" onClick={toggleDrawer(true)}>
        <IconButton>
          <Icon fontSize="large">menu</Icon>
        </IconButton>
      </div>
      <SwipeableDrawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </SwipeableDrawer>
    </div>
  );
}
