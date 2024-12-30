import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../features/header';
import { useDispatch } from 'react-redux';
import { saveTask } from '../entities/actions/tasks.tsx'; 
import { deleteTask } from '../entities/actions/tasks.tsx'; 

import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditTask(props) {

  const { id } = useParams();
  const { from } = useParams();
  const task = useSelector((state) => state.tasks.filter(task => task.id === id))[0];

  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState(task.taskName);
  const [taskDescription, setTaskDescription] = useState(task.taskDescription);

  const [taskIsChecked, setTaskIsChecked] = React.useState(task.isChecked);

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

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
              style={{ width: '150%'}}
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
          <br /><br />
          <Button size="small" color="error" variant="outlined" style={{ width: "100%" }} onClick={handleDialogDeleteOpen}>
            <DeleteIcon />
          </Button>
        </div>
      </div>

      <Dialog
        open={dialogDelete}
        onClose={handleDialogDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-delete-title">
          {"Would you like to delete task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delete-description">
            All tasks will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogDeleteClose}>Cancel</Button>
          <Link to={"/" + from}>
            <Button 
              onClick={()=>dispatch(deleteTask(id, taskName, taskDescription, taskIsChecked))} 
              autoFocus 
              color="error"
            >
              Delete
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      
    </>
  );
}
