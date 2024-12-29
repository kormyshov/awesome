import React from 'react';
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Checkbox from '@mui/material/Checkbox';

import { switchTask } from '../entities/actions/tasks.tsx';


export default function ChecklistItem(props) {

  const [isChecked, setIsChecked] = React.useState(props.item_is_checked);

  const task = useSelector((state) => state.tasks.filter(task => task.id === props.item_id))[0];
  const dispatch = useDispatch();

  const handleSwitchTask = (isChecked) => {
    setIsChecked(isChecked);
    dispatch(switchTask(task.id, task.taskName, task.taskDescription, isChecked));
  };

  return (
      <>
        <ListItemButton sx={{ pl: 2 }}>
          <Checkbox
            checked={isChecked}
            onChange={(e) => handleSwitchTask(e.target.checked)}
          />
          <Link to={"/tasks/" + props.item_id + "/edit/" + props.from} className="linkMenu">
            <ListItemText secondary={props.item_value} />
          </Link>
        </ListItemButton>
      </>
  );
}
