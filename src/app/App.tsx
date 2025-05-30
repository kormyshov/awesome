import React, { useMemo } from 'react';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import TaskList from "../pages/task/list.tsx";
import ProjectList from "../pages/project/list.tsx";
import NotFound from '../pages/not_found.tsx';
import Sidebar from '../widgets/sidebar.tsx';
import NewProject from '../pages/project/new.tsx';
import Project from '../pages/project/project.tsx';
import EditProject from '../pages/project/edit.tsx';
import EditTask from '../pages/task/edit.tsx';

import NewContact from '../pages/contact/new.tsx';
import EditContact from '../pages/contact/edit.tsx';
import ContactList from '../pages/contact/list.tsx';

import NewArea from '../pages/area/new.tsx';
import EditArea from '../pages/area/edit.tsx';
import AreaList from '../pages/area/list.tsx';

import NewTask from '../pages/task/new.tsx';

import { Contacts } from '../entities/types/contact/contacts.ts';
import { Contact } from '../entities/types/contact/contact.ts';
import { Areas } from '../entities/types/area/areas.ts';
import { Area } from '../entities/types/area/area.ts';
import { Projects } from '../entities/types/project/projects.ts';
import { Project as ObjProject } from '../entities/types/project/project.ts';
import { Tasks } from '../entities/types/task/tasks.ts';
import { SidebarState } from '../entities/types/sidebar/sidebar_state.ts';
import { getCommand } from '../entities/upload/common.ts';
import { RepeatedRule } from '../entities/types/task/repeated_rule.ts';
import { Weekday } from 'rrule';
import { AreaStatus } from '../entities/types/area/area_status.ts';

import { InboxTaskListStrategy } from '../entities/strategies/task_list/inbox_task_list_strategy.ts';
import { NextTaskListStrategy } from '../entities/strategies/task_list/next_task_list_strategy.ts';
import { WaitingTaskListStrategy } from '../entities/strategies/task_list/waiting_task_list_strategy.ts';
import { SomedayTaskListStrategy } from '../entities/strategies/task_list/someday_task_list_strategy.ts';
import { ScheduledTaskListStrategy } from '../entities/strategies/task_list/scheduled_task_list_strategy.ts';
import { ProjectTaskListStrategy } from '../entities/strategies/task_list/project_task_list_strategy.ts';
import { uploadTasks } from '../entities/upload/tasks.ts';

export const ContactsContext = React.createContext(
  {
    contacts: new Contacts(),
    setContacts: (contacts: Contacts) => {}
  }
);
export const AreasContext = React.createContext(
  {
    areas: new Areas(),
    setAreas: (areas: Areas) => {}
  }
);
export const ProjectsContext = React.createContext(
  {
    projects: new Projects(),
    setProjects: (projects: Projects) => {}
  }
);
export const TasksContext = React.createContext(
  {
    tasks: new Tasks(),
    setTasks: (tasks: Tasks) => {}
  }
);
export const SidebarContext = React.createContext(
  {
    sidebar: new SidebarState(),
    setSidebar: (sidebarState: SidebarState) => {}
  }
);
export const CurrentAreaContext = React.createContext(
  {
    currentArea: new Area("all_areas", "All areas", AreaStatus.ACTIVE),
    setCurrentArea: (currentArea: Area) => {}
  }
);

const smallTheme = createTheme({
  typography: {
    fontSize: 12,
  },
});

export default function App() {

  const [contacts, setContacts] = useState(new Contacts());
  const contactsValue = useMemo(() => ({contacts, setContacts}), [contacts]);

  const [areas, setAreas] = useState(new Areas());
  const areasValue = useMemo(() => ({areas, setAreas}), [areas]);

  const [projects, setProjects] = useState(new Projects());
  const projectsValue = useMemo(() => ({projects, setProjects}), [projects]);

  const [tasks, setTasks] = useState(new Tasks());
  const tasksValue = useMemo(() => ({tasks, setTasks}), [tasks]);

  const [sidebar, setSidebar] = useState(new SidebarState());
  const sidebarValue = useMemo(() => ({sidebar, setSidebar}), [sidebar]);

  const [currentArea, setCurrentArea] = useState(new Area("all_areas", "All areas", AreaStatus.ACTIVE));
  const currentAreaValue = useMemo(() => ({currentArea, setCurrentArea}), [currentArea]);

  useEffect(() => {
    const fetchData = async () => {
      window.Telegram.WebApp.expand();
      const response = await fetch(getCommand("get_tasks"))

      const data = await response.json()
      console.log(data)
      data.tasks.forEach((task) => {
        tasks.buildFullTask(
          task.id, 
          task.name, 
          task.description, 
          task.isChecked, 
          task.checkedDate, 
          task.status, 
          task.deletedDate, 
          task.areaId, 
          task.projectId, 
          task.waitingContactId, 
          task.scheduledDate,
          task.repeatedRule !== undefined ? 
            new RepeatedRule(
              task.repeatedRule.freq, 
              dayjs(task.repeatedRule.dtstart), 
              task.repeatedRule.interval, 
              task.repeatedRule.byweekday.map(d => new Weekday(d.weekday, d.n)),
              task.repeatedRule.bymonthday,
              task.repeatedRule.bymonth,
            ) : 
            undefined,
          false
        )
      })
      setTasks(new Tasks(tasks.getItems()));
      uploadTasks(tasks);
      console.log(tasks);

      data.contacts.forEach((contact) => {
        contacts.add(new Contact(contact.id, contact.name, contact.status))
        setContacts(contacts)
      })
      data.areas.forEach((area) => {
        areas.add(new Area(area.id, area.name, area.status))
        setAreas(areas)
      })
      data.projects.forEach((project) => {
        projects.add(new ObjProject(project.id, project.name, project.description, project.areaId, project.status))
        setProjects(projects)
      })
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, areas, projects])


  return (

    <div id="App">
      <ThemeProvider theme={smallTheme}>
      <SidebarContext.Provider value={sidebarValue}>
      <CurrentAreaContext.Provider value={currentAreaValue}>
      <AreasContext.Provider value={areasValue}>
        <Sidebar />

        <ContactsContext.Provider value={contactsValue}>
        <ProjectsContext.Provider value={projectsValue}>
        <TasksContext.Provider value={tasksValue}>
          <Routes>
            <Route index element={<TaskList page_name="Inbox" task_list_strategy={new InboxTaskListStrategy()} />} />
            <Route path="/">
              <Route index element={<TaskList page_name="Inbox" task_list_strategy={new InboxTaskListStrategy()} />} />
            </Route>
            <Route path="inbox">
              <Route index element={<TaskList page_name="Inbox" task_list_strategy={new InboxTaskListStrategy()} />} />
            </Route>
            <Route path="next" element={<TaskList page_name="Next" task_list_strategy={new NextTaskListStrategy()} />} />
            <Route path="waiting" element={<TaskList page_name="Waiting" task_list_strategy={new WaitingTaskListStrategy()} />} />
            <Route path="scheduled" element={<TaskList page_name="Scheduled" task_list_strategy={new ScheduledTaskListStrategy()} />} />
            <Route path="someday" element={<TaskList page_name="Someday" task_list_strategy={new SomedayTaskListStrategy()} />} />
            {/* <Route path="focus" element={<TaskList page_name="Focus" />} /> */}

            <Route path="tasks">
              <Route path="new/:from" element={<NewTask />} />
              <Route path="new/projects/:project_id" element={<NewTask />} />

              <Route path=":id/edit/projects/:project_id" element={<EditTask />} />
              <Route path=":id/edit/:from" element={<EditTask />} />
            </Route>

            <Route path="areas">
              <Route index element={<AreaList />} />
              <Route path="new" element={<NewArea />} />
              <Route path=":id" element={<EditArea />} />
            </Route>

            <Route path="projects">
              <Route index element={<ProjectList />} />
              <Route path="new" element={<NewProject />} />
              <Route path=":id" element={<Project task_list_strategy={new ProjectTaskListStrategy()} />} />
              <Route path=":id/edit" element={<EditProject />} />
            </Route>

            <Route path="contacts">
              <Route index element={<ContactList />} />
              <Route path="new" element={<NewContact />} />
              <Route path=":id" element={<EditContact />} />
            </Route>

            {/* <Route path="archive" element={<TaskList page_name="Archive" />} /> */}
            {/* <Route path="trash" element={<TaskList page_name="Trash" />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TasksContext.Provider>
        </ProjectsContext.Provider>
        </ContactsContext.Provider>

      </AreasContext.Provider>
      </CurrentAreaContext.Provider>
      </SidebarContext.Provider>
      </ThemeProvider>

    </div>

  );
}
