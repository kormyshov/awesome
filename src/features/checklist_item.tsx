import React from 'react';
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Checkbox from '@mui/material/Checkbox';

export default function ChecklistItem(props) {

  const task = useSelector((state) => state.tasks.filter(task => task.id === props.item_id))[0];

  const [isChecked, setIsChecked] = React.useState(task.isChecked);

  return (
      <>
        <ListItemButton sx={{ pl: 2 }}>
          <Checkbox
            checked={isChecked}
            onChange={(e) => props.switchTask(task.id, task.taskName, task.taskDescription, e.target.checked)}
          />
          <Link to={props.item_id} className="linkMenu">
            <ListItemText secondary={props.item_value} />
          </Link>
        </ListItemButton>
      </>
  );
}
