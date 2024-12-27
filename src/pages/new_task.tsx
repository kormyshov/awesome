import React from 'react';
import { useParams } from 'react-router-dom';

import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../features/header';
import { useDispatch } from 'react-redux';
import { addTask } from '../entities/actions/tasks.tsx'; 

import { useState } from 'react';


export default function NewTask(props) {

  const { from } = useParams();

  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  return (
    <>
      <Header page_name="Create task" />
      <div className="pageWrapper">
        <TextField 
          id="task_name" 
          label="Task" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          value={taskName} 
          onChange={(e)=>setTaskName(e.target.value)}
        />
        <TextField
          id="task_description" 
          label="Description" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          value={taskDescription} 
          onChange={(e)=>setTaskDescription(e.target.value)}
        />
        <br />

        <div className="pageWrapperButtonGroup">
          <Link to={"/" + from}>
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to={"/" + from}>
            <Button 
              variant="contained" 
              size="small" 
              className="pageWrapperButton" 
              onClick={()=>dispatch(addTask(taskName, taskDescription))}
            >
              Create
            </Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
