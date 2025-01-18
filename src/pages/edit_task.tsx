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
import DialogTitle from '@mui/material/DialogTitle';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function EditTask(props) {

  const { id } = useParams();
  const { from } = useParams();
  const { project_id } = useParams();
  const ext_from = from !== null && from !== undefined ? from : "projects/" + project_id;

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

  const [taskStatus, setTaskStatus] = React.useState(task.taskStatus);

  let cantSelectContact = taskStatus !== "WAITING";

  const taskStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskStatus((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value === "") {
      setTaskProject("");
    }
    cantSelectContact = taskStatus !== "WAITING";
    if ((event.target as HTMLInputElement).value !== "WAITING") {
      setWaitingContact("");
    }
  };

  const project = useSelector((state) => state.projects);
  const projectList = project.map(project => (
    <MenuItem key={project.id} value={project.id}>
      {project.projectName}
    </MenuItem>
  ));

  const [taskProject, setTaskProject] = React.useState(task.taskProject);

  const taskProjectChange = (event: SelectChangeEvent) => {
    setTaskProject(event.target.value);
    if (event.target.value !== "" && taskStatus === "") {
      setTaskStatus("NEXT");
    }
  };

  const contacts = useSelector((state) => state.contacts);
  const contactList = contacts
    .filter(contact => contact.contactStatus !== "DELETED")
    .map(contact => (
      <MenuItem key={contact.id} value={contact.id}>
        {contact.contactName}
      </MenuItem>
    ));

  const [waitingContact, setWaitingContact] = React.useState(task.waitingContact);

  const waitingContactChange = (event: SelectChangeEvent) => {
    setWaitingContact(event.target.value);
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
        <FormControl sx={{ width: "100%" }}>
          <FormLabel id="task_status">Status</FormLabel>
          <RadioGroup
            aria-labelledby="task_status"
            name="radio-buttons-group"
            value={taskStatus}
            onChange={taskStatusChange}
          >
            <FormControlLabel value="" control={<Radio />} label="Inbox" />
            <FormControlLabel value="NEXT" control={<Radio />} label="Next" />
            <FormControlLabel value="WAITING" control={<Radio />} label="Waiting" />
            <FormControl variant="standard" disabled={cantSelectContact}>
              <InputLabel id="task_waiting_contact">Contact</InputLabel>
              <Select
                labelId="simple-select-standard-label"
                id="simple-select-standard"
                value={waitingContact}
                onChange={waitingContactChange}
                label="Contact"
              >
                {contactList}
              </Select>
            </FormControl>
            <FormControlLabel value="SOMEDAY" control={<Radio />} label="Someday" />
          </RadioGroup>
        </FormControl>
        <br /><br />

        <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
          <InputLabel id="task_project">Project</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={taskProject}
            onChange={taskProjectChange}
            label="Project"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {projectList}
          </Select>
        </FormControl>

        <div className="pageWrapperButtonGroup">
          <Link to={"/" + ext_from}>
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to={"/" + ext_from}>
            <Button
              variant="contained" 
              size="small" 
              className="pageWrapperButton" 
              onClick={()=>dispatch(saveTask(id, taskName, taskDescription, taskIsChecked, taskStatus, taskProject, waitingContact))}
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
        <DialogActions>
          <Button onClick={handleDialogDeleteClose}>Cancel</Button>
          <Link to={"/" + ext_from}>
            <Button 
              onClick={()=>dispatch(deleteTask(id, taskName, taskDescription, taskIsChecked, taskProject, waitingContact))} 
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
