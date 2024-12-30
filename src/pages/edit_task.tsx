import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../features/header';
import { useDispatch } from 'react-redux';
import { saveTask } from '../entities/actions/tasks.tsx'; 

import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function EditTask(props) {

  const { id } = useParams();
  const { from } = useParams();
  const task = useSelector((state) => state.tasks.filter(task => task.id === id))[0];

  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState(task.taskName);
  const [taskDescription, setTaskDescription] = useState(task.taskDescription);

  const [taskIsChecked, setTaskIsChecked] = React.useState(task.isChecked);

  return (
    <>
      <Header page_name="Edit task" />
      <div className="pageWrapper">
        <FormControlLabel 
          control={
            <Checkbox
              checked={taskIsChecked}
              onChange={(e) => setTaskIsChecked(e.target.checked)}
            />
          }
          label={
            <TextField 
              id="task_name" 
              label="Task name" 
              variant="standard" 
              size="small" 
              className="pageWrapperInput" 
              value={taskName} 
              onChange={(e)=>setTaskName(e.target.value)}
              style={{ width: '100%'}}
            />
          }
          style={{ width: '100%' }}
        />
        <br /><br />

        <TextField 
          id="task_description" 
          label="Description" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          value={taskDescription} 
          onChange={(e)=>setTaskDescription(e.target.value)} 
        />
        <br /><br />

        <div className="pageWrapperButtonGroup">
          <Link to={"/" + from}>
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to={"/" + from}>
            <Button
              variant="contained" 
              size="small" 
              className="pageWrapperButton" 
              onClick={()=>dispatch(saveTask(id, taskName, taskDescription, taskIsChecked))}
            >
              Save
            </Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
