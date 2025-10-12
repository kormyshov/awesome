import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import CenterFocusStrong from '@mui/icons-material/CenterFocusStrong';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from '../../features/header.tsx';

import { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { SelectChangeEvent } from '@mui/material/Select';

import { TasksContext, ProjectsContext } from '../../app/App.tsx';
import { Task } from '../../entities/types/task/task.ts';
import { TaskStatus } from '../../entities/types/task/task_status.ts';
import { uploadTasks } from '../../entities/upload/tasks.ts';
import DialogDeleteTask from '../../widgets/dialogs/delete_task.tsx';
import ButtonGroupEditTask from '../../widgets/buttons/edit_task.tsx';
import SelectAreaList from '../../widgets/selects/area_list.tsx';
import SelectProjectList from '../../widgets/selects/project_list.tsx';
import { TabsRepeated } from '../../widgets/tabs/repeated.tsx';
import SelectContactList from '../../widgets/selects/contact_list.tsx';
import { RepeatedRule } from '../../entities/types/task/repeated_rule.ts';


export default function EditTask(props) {

  const { id } = useParams();
  const { tasks, setTasks } = useContext(TasksContext);
  const task: Task = tasks.get(id);

  const { projects } = useContext(ProjectsContext);

  const { from } = useParams();
  const { project_id } = useParams();
  const ext_from = from !== null && from !== undefined ? from : "projects/" + project_id;

  const [taskName, setTaskName] = useState(task.getName());
  const [taskDescription, setTaskDescription] = useState(task.getDescription());

  const [taskIsChecked] = React.useState(task.getIsChecked());
  const [taskIsFocus, setTaskIsFocus] = React.useState(task.getIsFocus());

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const [taskStatus, setTaskStatus] = React.useState(task.getStatus(false));

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

  const [taskArea, setTaskArea] = React.useState(task.getAreaId());

  const taskAreaChange = (event: SelectChangeEvent) => {
    setTaskArea(event.target.value);
    if (taskProject !== "" && projects.get(taskProject).getAreaId() !== event.target.value) {
      setTaskProject("")
    }
  };

  const [taskProject, setTaskProject] = React.useState(task.getProjectId());

  const taskProjectChange = (event: SelectChangeEvent) => {
    setTaskProject(event.target.value);
    if (event.target.value !== "" && taskStatus === TaskStatus.INBOX) {
      setTaskStatus(TaskStatus.NEXT);
    }
    if (event.target.value !== "" && projects.get(event.target.value).getAreaId() !== taskArea) {
      setTaskArea(projects.get(event.target.value).getAreaId());
    }
  };

  const [waitingContact, setWaitingContact] = React.useState(task.getWaitingContactId());

  const waitingContactChange = (event: SelectChangeEvent) => {
    setWaitingContact(event.target.value);
  };

  const [scheduledDate, setScheduledDate] = React.useState<Dayjs | null>(dayjs(task.getScheduledDate()));

  const saveTask = () => {
    console.log("Save task", repeatedRule);
    tasks.buildCommonTask(
      id,
      taskName,
      taskDescription,
      taskIsChecked,
      taskIsFocus,
      task.getCheckedDate(),
      taskStatus,
      taskArea,
      taskProject,
      waitingContact,
      taskStatus === TaskStatus.SCHEDULED && scheduledDate !== null ? scheduledDate.format("YYYY-MM-DD") : "",
      taskStatus === TaskStatus.REPEATED ? repeatedRule : undefined,
    )
    setTasks(tasks);
  };

  const [repeatedRule] = React.useState<RepeatedRule>(task.getRepeatedRule() || new RepeatedRule(3, dayjs(new Date()), 1));
  const [repeatedRule_freq, setRepeatedRuleFreq] = React.useState<number | undefined>(repeatedRule?.getFreq());

  const deleteTask = () => {
    task.setDeleted();
    uploadTasks(tasks);
    setTasks(tasks);
  };

  const handleChangeTabValue = (event: React.SyntheticEvent, newTabValue: number) => {
    setRepeatedRuleFreq(3 - newTabValue);
  };

  return (
    <>
      <Header page_name="Edit task" />
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
        <br /><br />

        <ButtonGroupEditTask 
          handleDialogDeleteOpen={handleDialogDeleteOpen}
          from={"/" + ext_from}
          saveTask={saveTask}
        />
        <br /><br />
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
