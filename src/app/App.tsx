import React, { useMemo } from 'react';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';

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

import NewTask from '../pages/task/new.tsx';

import { Contacts } from '../entities/types/contact/contacts.tsx';
import { Contact } from '../entities/types/contact/contact.tsx';
import { Projects } from '../entities/types/project/projects.tsx';
import { Project as ObjProject } from '../entities/types/project/project.tsx';
import { Tasks } from '../entities/types/task/tasks.tsx';
import { Task } from '../entities/types/task/task.tsx';
import { SidebarState } from '../entities/types/sidebar/sidebar_state.tsx';

export const ContactsContext = React.createContext(
  {
    contacts: new Contacts(),
    setContacts: (contacts: Contacts) => {}
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

export default function App() {

  const [contacts, setContacts] = useState(new Contacts());
  const contactsValue = useMemo(() => ({contacts, setContacts}), [contacts]);

  const [projects, setProjects] = useState(new Projects());
  const projectsValue = useMemo(() => ({projects, setProjects}), [projects]);

  const [tasks, setTasks] = useState(new Tasks());
  const tasksValue = useMemo(() => ({tasks, setTasks}), [tasks]);

  const [sidebar, setSidebar] = useState(new SidebarState());
  const sidebarValue = useMemo(() => ({sidebar, setSidebar}), [sidebar]);

  useEffect(() => {
    const fetchData = async () => {
      window.Telegram.WebApp.expand();
      let user_id = window.Telegram.WebApp.initDataUnsafe.user?.id;
      const validation = encodeURIComponent(window.Telegram.WebApp.initData);
      if (typeof user_id === "undefined") user_id = "test"
      const response = await fetch("https://functions.yandexcloud.net/d4e343ukvmnpbmhsmf0u?method=get_tasks&user=" + user_id + "&validate=" + validation)
      const data = await response.json()
      console.log(data)
      // dispatch(initTasks(data.tasks));
      data.tasks.forEach((task) => {
        tasks.add(new Task(
          task.id, 
          task.name, 
          task.description, 
          task.isChecked, 
          task.checkedDate, 
          task.status, 
          task.deletedDate, 
          task.projectId, 
          task.waitingContactId, 
          task.scheduledDate
        ))
        setTasks(tasks)
      })
      const new_tasks = new Tasks();
      new_tasks.items = tasks.items;
      setTasks(new_tasks);

      data.contacts.forEach((contact) => {
        contacts.add(new Contact(contact.id, contact.name, contact.status))
        setContacts(contacts)
      })
      data.projects.forEach((project) => {
        projects.add(new ObjProject(project.id, project.name, project.description, project.status))
        setProjects(projects)
      })
      console.log(tasks);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, projects])


  return (

    <div id="App">
      <SidebarContext.Provider value={sidebarValue}>
        <Sidebar />

        <ContactsContext.Provider value={contactsValue}>
        <ProjectsContext.Provider value={projectsValue}>
        <TasksContext.Provider value={tasksValue}>
          <Routes>
            <Route index element={<TaskList page_name="Inbox" />} />
            <Route path="/">
              <Route index element={<TaskList page_name="Inbox" />} />
            </Route>
            <Route path="inbox">
              <Route index element={<TaskList page_name="Inbox" />} />
            </Route>
            <Route path="next" element={<TaskList page_name="Next" />} />
            <Route path="waiting" element={<TaskList page_name="Waiting" />} />
            <Route path="scheduled" element={<TaskList page_name="Scheduled" />} />
            <Route path="someday" element={<TaskList page_name="Someday" />} />
            <Route path="focus" element={<TaskList page_name="Focus" />} />

            <Route path="tasks">
              <Route path=":from/new" element={<NewTask />} />
              <Route path=":id/edit/projects/:project_id" element={<EditTask />} />
              <Route path=":id/edit/:from" element={<EditTask />} />
            </Route>

            <Route path="projects">
              <Route index element={<ProjectList />} />
              <Route path="new" element={<NewProject />} />
              <Route path=":id" element={<Project />} />
              <Route path=":id/edit" element={<EditProject />} />
            </Route>

            <Route path="contacts">
              <Route index element={<ContactList />} />
              <Route path="new" element={<NewContact />} />
              <Route path=":id" element={<EditContact />} />
            </Route>

            <Route path="archive" element={<TaskList page_name="Archive" />} />
            <Route path="trash" element={<TaskList page_name="Trash" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TasksContext.Provider>
        </ProjectsContext.Provider>
        </ContactsContext.Provider>
  
      </SidebarContext.Provider>

    </div>

  );
}
