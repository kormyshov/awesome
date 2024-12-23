import React from 'react';
import { Link } from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Checkbox from '@mui/material/Checkbox';

export default function ChecklistItem(props) {

    return (
      <>
        <ListItemButton sx={{ pl: 2 }}>
          {
            props.item_is_checked ? 
            <Checkbox defaultChecked /> : 
            <Checkbox />
          }
          <Link to={props.item_id} className="linkMenu">
            <ListItemText secondary={props.item_value} />
          </Link>
        </ListItemButton>
      </>
    );
}
