import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../../features/header.tsx';

import { useState } from 'react';
import { TasksContext } from '../../app/App.tsx';
import { Task } from '../../entities/types/task/task.ts';
import { uploadTasks } from '../../entities/upload/tasks.ts';


export default function NewTask(props) {

  const { tasks, setTasks } = useContext(TasksContext);

  const { from } = useParams();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const addNewTask = () => {
    tasks.add(new Task(taskName, taskDescription));
    uploadTasks(tasks);
    setTasks(tasks);
  };

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
              onClick={()=>addNewTask()}
            >
              Create
            </Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
