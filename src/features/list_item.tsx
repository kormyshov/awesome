import React from 'react';
import { Link } from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import CircleIcon from '@mui/icons-material/Circle';

export default function ListItem(props) {
    return (
        <Link to={props.item_id} className="linkMenu">
        <ListItemButton sx={{ pl: 2 }}>
          {
            props.item_status === "ACTIVE" ? 
            <CircleIcon sx={{ fontSize: 12, marginRight: 1 }} color="primary" /> : 
            <CircleIcon sx={{ fontSize: 12, marginRight: 1 }} color="disabled" />
          }
          <ListItemText secondary={props.item_value} />
        </ListItemButton>
      </Link>
    );
}
