import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from '../../features/header.tsx';

import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';

import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ContactsContext, TasksContext } from '../../app/App.tsx';
import { ProjectsContext } from '../../app/App.tsx';
import { Task } from '../../entities/types/task/task.ts';
import { TaskStatus } from '../../entities/types/task/task_status.ts';
import { uploadTasks } from '../../entities/upload/tasks.ts';


export default function EditTask(props) {

  const { id } = useParams();
  const { tasks, setTasks } = useContext(TasksContext);
  const task: Task = tasks.get(id);

  const { from } = useParams();
  const { project_id } = useParams();
  const ext_from = from !== null && from !== undefined ? from : "projects/" + project_id;

  const [taskName, setTaskName] = useState(task.getName());
  const [taskDescription, setTaskDescription] = useState(task.getDescription());

  const [taskIsChecked, setTaskIsChecked] = React.useState(task.getIsChecked());

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const [taskStatus, setTaskStatus] = React.useState(task.getStatus());

  let cantSelectContact = taskStatus !== TaskStatus.WAITING;

  const taskStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskStatus((event.target as HTMLInputElement).value as TaskStatus);
    if ((event.target as HTMLInputElement).value === "") {
      setTaskProject("");
    }
    cantSelectContact = taskStatus !== TaskStatus.WAITING;
    if ((event.target as HTMLInputElement).value !== TaskStatus.WAITING) {
      setWaitingContact("");
    }
  };

  const { projects } = useContext(ProjectsContext);

  const projectList = projects
    .filterIsNotDeleted()
    .map(project => (
      <MenuItem key={project.getId()} value={project.getId()}>
        {project.getName()}
      </MenuItem>
    ))
    ;

  const [taskProject, setTaskProject] = React.useState(task.getProjectId());

  const taskProjectChange = (event: SelectChangeEvent) => {
    setTaskProject(event.target.value);
    if (event.target.value !== "" && taskStatus === TaskStatus.INBOX) {
      setTaskStatus(TaskStatus.NEXT);
    }
  };

  const { contacts } = useContext(ContactsContext);
  const contactList = contacts
    .filterIsActive()
    .map(contact => (
      <MenuItem key={contact.getId()} value={contact.getId()}>
        {contact.getName()}
      </MenuItem>
    ));

  const [waitingContact, setWaitingContact] = React.useState(task.getWaitingContactId());

  const waitingContactChange = (event: SelectChangeEvent) => {
    setWaitingContact(event.target.value);
  };

  const [scheduledDate, setScheduledDate] = React.useState<Dayjs | null>(dayjs(task.getScheduledDate()));

  const saveTask = () => {
    tasks.buildCommonTask(
      id,
      taskName,
      taskDescription,
      taskIsChecked,
      taskStatus,
      taskProject,
      waitingContact,
      scheduledDate ? scheduledDate.format("YYYY-MM-DD") : "",
    )
    setTasks(tasks);
  };

  const deleteTask = () => {
    task.setDeleted();
    uploadTasks(tasks);
    setTasks(tasks);
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTabValue = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
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
            <FormControlLabel value={TaskStatus.INBOX} control={<Radio />} label="Inbox" />
            <FormControlLabel value={TaskStatus.NEXT} control={<Radio />} label="Next" />
            <FormControlLabel value={TaskStatus.WAITING} control={<Radio />} label="Waiting" />
            { cantSelectContact ? null :
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
            }
            <FormControlLabel value={TaskStatus.SCHEDULED} control={<Radio />} label="Scheduled" />
            { taskStatus !== TaskStatus.SCHEDULED ? null :
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <DatePicker 
                  label="Scheduled date"
                  value={scheduledDate}
                  onChange={(newValue) => setScheduledDate(newValue)}
                />
              </LocalizationProvider>
            }
            <FormControlLabel value={TaskStatus.REPEATED} control={<Radio />} label="Repeated" />
            { taskStatus !== TaskStatus.REPEATED ? null :
              <>
                <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="repeated tabs">
                  <Tab label="Daily" id="tab-daily" />
                  <Tab label="Weekly" id="tab-weekly" />
                  <Tab label="Monthly" id="tab-monthly" />
                  <Tab label="Yearly" id="tab-yearly" />
                </Tabs>

                <div
                  role="tabpanel"
                  hidden={tabValue !== 0}
                  id="tabpanel-daily"
                  aria-labelledby="tab-daily"
                >
                  daily
                </div>
                <div
                  role="tabpanel"
                  hidden={tabValue !== 1}
                  id="tabpanel-weekly"
                  aria-labelledby="tab-weekly"
                >
                  in progress
                </div>
                <div
                  role="tabpanel"
                  hidden={tabValue !== 2}
                  id="tabpanel-monthly"
                  aria-labelledby="tab-monthly"
                >
                  in progress
                </div>
                <div
                  role="tabpanel"
                  hidden={tabValue !== 3}
                  id="tabpanel-yearly"
                  aria-labelledby="tab-yearly"
                >
                  in progress
                </div>
                <br />
                <Divider />
              </>
            }
            <FormControlLabel value={TaskStatus.SOMEDAY} control={<Radio />} label="Someday" />
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
              onClick={()=>saveTask()}
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
              onClick={()=>deleteTask()} 
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
