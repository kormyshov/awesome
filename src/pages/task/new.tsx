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

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CenterFocusStrong from '@mui/icons-material/CenterFocusStrong';

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

  const [taskIsFocus, setTaskIsFocus] = useState(false);

  const mapping_from_to_status = {
    "": TaskStatus.INBOX,
    "next": TaskStatus.NEXT,
    "waiting": TaskStatus.WAITING,
    "inbox": TaskStatus.INBOX,
    "someday": TaskStatus.SOMEDAY,
    "scheduled": TaskStatus.SCHEDULED,
    "focus": TaskStatus.INBOX,
  };

  const [taskStatus, setTaskStatus] = React.useState(from === undefined ? TaskStatus.NEXT : mapping_from_to_status[from]);

  let cantSelectContact = taskStatus !== TaskStatus.WAITING;

  const taskStatusChange = (_: React.MouseEvent<HTMLElement>, newStatus: string | null) => {
    setTaskStatus(newStatus as TaskStatus);
    if (newStatus === "" || newStatus === TaskStatus.INBOX) {
      setTaskProject("");
    }
    cantSelectContact = taskStatus !== TaskStatus.WAITING;
    if (newStatus !== TaskStatus.WAITING) {
      setWaitingContact("");
    }
    if (newStatus !== TaskStatus.REPEATED) {
      setRepeatedRuleFreq(undefined);
    } else {
      setRepeatedRuleFreq(3);
    }
  };

  const { currentArea } = useContext(CurrentAreaContext);
  const [taskArea, setTaskArea] = React.useState(
    project_id === undefined ? 
    (currentArea.getId() === "all_areas" ? "" : currentArea.getId()) : 
    projects.get(project_id).getAreaId()
  );

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
    repeatedRule.nomalize();
    console.log("Create new task", repeatedRule);
    tasks.buildNewTask(
      taskName,
      taskDescription,
      false,
      taskIsFocus,
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
          sx={{ float: "left", width: "80%" }}
        />
        <ToggleButton
          value="check"
          selected={taskIsFocus}
          onChange={() => setTaskIsFocus(!taskIsFocus)}
          sx={{ float: "right" }}
        >
          <CenterFocusStrong />
        </ToggleButton>
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
          <ToggleButtonGroup
            value={taskStatus}
            exclusive
            onChange={taskStatusChange}
            aria-label="task_status"
            size="small"
          >
            <ToggleButton value={TaskStatus.INBOX} aria-label="Inbox">
              Inbox
            </ToggleButton>
            <ToggleButton value={TaskStatus.NEXT} aria-label="Next">
              Next
            </ToggleButton>
            <ToggleButton value={TaskStatus.SOMEDAY} aria-label="Someday">
              Someday
            </ToggleButton>
            <ToggleButton value={TaskStatus.WAITING} aria-label="Waiting">
              Waiting
            </ToggleButton>
            <ToggleButton value={TaskStatus.SCHEDULED} aria-label="Scheduled">
              Scheduled
            </ToggleButton>
            <ToggleButton value={TaskStatus.REPEATED} aria-label="Repeated">
              Repeated
            </ToggleButton>
          </ToggleButtonGroup>
          { cantSelectContact ? null :
            <>
              <br />
              <SelectContactList
                cantSelectContact={cantSelectContact}
                waitingContact={waitingContact}
                waitingContactChange={waitingContactChange}
              />
            </>              
          }
          { taskStatus !== TaskStatus.SCHEDULED ? null :
            <>
              <br /><br />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <DatePicker 
                  label="Scheduled date"
                  value={scheduledDate}
                  onChange={(newValue) => setScheduledDate(newValue)}
                />
              </LocalizationProvider>
            </>
          }
          { taskStatus !== TaskStatus.REPEATED ? null : 
              <TabsRepeated 
                tabValue={repeatedRule_freq !== undefined ? 3 - repeatedRule_freq : 0}
                handleChangeTabValue={handleChangeTabValue}
                repeatedRule={repeatedRule}
              /> 
          }
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
