import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from '../../features/header.tsx';

import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { SelectChangeEvent } from '@mui/material/Select';

import { TasksContext } from '../../app/App.tsx';
import { Task } from '../../entities/types/task/task.ts';
import { TaskStatus } from '../../entities/types/task/task_status.ts';
import { uploadTasks } from '../../entities/upload/tasks.ts';
import DialogDeleteTask from '../../widgets/dialogs/delete_task.tsx';
import ButtonGroupEditTask from '../../widgets/buttons/edit_task.tsx';
import SelectProjectList from '../../widgets/selects/project_list.tsx';
import TabsRepeated from '../../widgets/tabs/repeated.tsx';
import SelectContactList from '../../widgets/selects/contact_list.tsx';


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

  const [taskProject, setTaskProject] = React.useState(task.getProjectId());

  const taskProjectChange = (event: SelectChangeEvent) => {
    setTaskProject(event.target.value);
    if (event.target.value !== "" && taskStatus === TaskStatus.INBOX) {
      setTaskStatus(TaskStatus.NEXT);
    }
  };

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

  const [rrule_dtstart, setRRuleDtStart] = React.useState<Dayjs | null>(dayjs(task.getRRuleDtStart()));

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
        
        <SelectProjectList 
          taskProject={taskProject}
          taskProjectChange={taskProjectChange}
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
            <FormControlLabel value={TaskStatus.SOMEDAY} control={<Radio />} label="Someday" />
            <FormControlLabel value={TaskStatus.WAITING} control={<Radio />} label="Waiting" />
            { cantSelectContact ? null :
              <SelectContactList
                cantSelectContact={cantSelectContact}
                waitingContact={waitingContact}
                waitingContactChange={waitingContactChange}
              />
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
              <TabsRepeated 
                tabValue={tabValue} 
                handleChangeTabValue={handleChangeTabValue}
                rrule_dtstart={rrule_dtstart}
                setRRuleDtStart={setRRuleDtStart}
              /> 
            }
          </RadioGroup>
        </FormControl>
        <br /><br />

        <ButtonGroupEditTask 
          handleDialogDeleteOpen={handleDialogDeleteOpen}
          from={"/" + ext_from}
          saveTask={saveTask}
        />
      </div>

      <DialogDeleteTask 
        dialogDelete={dialogDelete}
        handleDialogDeleteClose={handleDialogDeleteClose}
        from={"/" + ext_from}
        deleteTask={deleteTask}
      />
      
    </>
  );
}
