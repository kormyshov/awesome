import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from "react-router-dom";

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { SelectChangeEvent } from '@mui/material/Select';

import Header from '../../features/header.tsx';

import SelectAreaList from '../../widgets/selects/area_list.tsx';
import SelectProjectList from '../../widgets/selects/project_list.tsx';
import SelectContactList from '../../widgets/selects/contact_list.tsx';

import { TabsRepeated } from '../../widgets/tabs/repeated.tsx';

import { TaskStatus } from '../../entities/types/task/task_status.ts';
import { CurrentAreaContext, TasksContext, ProjectsContext } from '../../app/App.tsx';

import { RepeatedRule } from '../../entities/types/task/repeated_rule.ts';


export default function NewTask(props) {

  const { tasks, setTasks } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);

  const { from } = useParams();
  const { project_id } = useParams();
  const back_link = (from !== undefined ? "/" + from : "/projects/" + project_id);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const mapping_from_to_status = {
    "": TaskStatus.INBOX,
    "next": TaskStatus.NEXT,
    "waiting": TaskStatus.WAITING,
    "inbox": TaskStatus.INBOX,
    "someday": TaskStatus.SOMEDAY,
    "scheduled": TaskStatus.SCHEDULED,
  };

  const [taskStatus, setTaskStatus] = React.useState(from === undefined ? TaskStatus.NEXT : mapping_from_to_status[from]);

  let cantSelectContact = taskStatus !== TaskStatus.WAITING;

  const taskStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskStatus((event.target as HTMLInputElement).value as TaskStatus);
    if ((event.target as HTMLInputElement).value === "" || event.target.value === TaskStatus.INBOX) {
      setTaskProject("");
    }
    cantSelectContact = taskStatus !== TaskStatus.WAITING;
    if ((event.target as HTMLInputElement).value !== TaskStatus.WAITING) {
      setWaitingContact("");
    }
    if ((event.target as HTMLInputElement).value !== TaskStatus.REPEATED) {
      setRepeatedRuleFreq(undefined);
    } else {
      setRepeatedRuleFreq(3);
    }
  };

  const { currentArea } = useContext(CurrentAreaContext);
  const [taskArea, setTaskArea] = React.useState(project_id === undefined ? (currentArea.getId() === "all_areas" ? "": currentArea.getId()) : projects.get(project_id).getAreaId());

  const taskAreaChange = (event: SelectChangeEvent) => {
    setTaskArea(event.target.value);
    if (taskProject !== "" && projects.get(taskProject).getAreaId() !== event.target.value) {
      setTaskProject("")
    }
  };

  const [taskProject, setTaskProject] = React.useState(project_id !== undefined ? project_id : "");

  const taskProjectChange = (event: SelectChangeEvent) => {
    setTaskProject(event.target.value);
    if (event.target.value !== "" && taskStatus === TaskStatus.INBOX) {
      setTaskStatus(TaskStatus.NEXT);
    }
    if (event.target.value !== "" && projects.get(event.target.value).getAreaId() !== taskArea) {
      setTaskArea(projects.get(event.target.value).getAreaId());
    }
  };

  const [waitingContact, setWaitingContact] = React.useState("");

  const waitingContactChange = (event: SelectChangeEvent) => {
    setWaitingContact(event.target.value);
  };

  const [scheduledDate, setScheduledDate] = React.useState<Dayjs | null>(null);

  const [repeatedRule] = React.useState<RepeatedRule>(new RepeatedRule(3, dayjs(new Date()), 1));
  const [repeatedRule_freq, setRepeatedRuleFreq] = React.useState<number | undefined>(repeatedRule?.getFreq());

  const addNewTask = () => {
    console.log("Create new task", repeatedRule);
    tasks.buildNewTask(
      taskName,
      taskDescription,
      false,
      taskStatus,
      taskArea,
      taskProject,
      waitingContact,
      taskStatus === TaskStatus.SCHEDULED && scheduledDate !== null ? scheduledDate.format("YYYY-MM-DD") : "",
      taskStatus === TaskStatus.REPEATED ? repeatedRule : undefined,
    )
    setTasks(tasks);
  };

  const handleChangeTabValue = (event: React.SyntheticEvent, newTabValue: number) => {
    setRepeatedRuleFreq(3 - newTabValue);
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
          multiline
          value={taskDescription} 
          onChange={(e)=>setTaskDescription(e.target.value)}
        />

        <br /><br />
        <SelectAreaList
          area={taskArea}
          areaChange={taskAreaChange}
          noneValue="None"
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
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
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
                tabValue={repeatedRule_freq !== undefined ? 3 - repeatedRule_freq : 0}
                handleChangeTabValue={handleChangeTabValue}
                repeatedRule={repeatedRule}
              /> 
            }
          </RadioGroup>
        </FormControl>

        <div className="pageWrapperButtonGroup">
          <Link to={back_link}>
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to={back_link}>
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
