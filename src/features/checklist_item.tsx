import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Checkbox from '@mui/material/Checkbox';

import { TasksContext } from '../app/App.tsx';
import { Task } from '../entities/types/task/task.ts';
import { uploadTasks } from '../entities/upload/tasks.ts';


export default function ChecklistItem(props) {

  const [isChecked, setIsChecked] = React.useState(props.item_is_checked);

  const { tasks, setTasks } = useContext(TasksContext);
  const task: Task = tasks.get(props.item_id);

  const handleSwitchTask = (isChecked) => {
    setIsChecked(isChecked);
    task.setIsChecked(isChecked);
    uploadTasks(tasks);
    setTasks(tasks);
  };

  return (
      <>
        <ListItemButton sx={{ pl: 2 }}>
          <Checkbox
            checked={isChecked}
            onChange={(e) => handleSwitchTask(e.target.checked)}
          />
          <Link to={"/tasks/" + props.item_id + "/edit/" + props.from} className="linkMenu">
            <ListItemText primary={props.item_value} secondary={props.item_added_field} />
          </Link>
        </ListItemButton>
      </>
  );
}
