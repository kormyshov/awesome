import React from 'react';
import { Link } from "react-router-dom";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

export default function NamedList(props) {

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const lst = props.items.map(e => <Link to={e.key} className="linkMenu"><ListItemButton sx={{ pl: 2 }}><ListItemText secondary={e.value} /></ListItemButton></Link>)

  return (
    <>
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={props.list_name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {lst}
          </List>
        </Collapse>
      </List>
    </>
  );
}
