import React, { useMemo } from 'react';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import TaskList from "../pages/task_list.tsx";
import ProjectList from "../pages/project_list.tsx";
import NotFound from '../pages/not_found.tsx';
import Sidebar from '../widgets/sidebar.tsx';
import NewProject from '../pages/new_project.tsx';
import Project from '../pages/project.tsx';
import EditProject from '../pages/edit_project.tsx';
import EditTask from '../pages/edit_task.tsx';

import NewContact from '../pages/contact/new.tsx';
import EditContact from '../pages/contact/edit.tsx';
import ContactList from '../pages/contact/list.tsx';

import NewTask from '../pages/new_task.tsx';

import { initProjects } from '../entities/actions/projects.tsx';
import { initTasks } from '../entities/actions/tasks.tsx';
import { Contacts } from '../entities/types/contact/contacts.tsx';
import { Contact } from '../entities/types/contact/contact.tsx';

export const ContactsContext = React.createContext(new Contacts());

export default function App() {

  const [contacts, setContacts] = useState(new Contacts);
  const contactsValue = useMemo(() => ({contacts, setContacts}), [contacts]);

  const dispatch = useDispatch();

  const fetchData = () => async (dispatch) => {
    window.Telegram.WebApp.expand();
    let user_id = window.Telegram.WebApp.initDataUnsafe.user?.id;
    const validation = encodeURIComponent(window.Telegram.WebApp.initData);
    if (typeof user_id === "undefined") user_id = "test"
    const response = await fetch("https://functions.yandexcloud.net/d4e343ukvmnpbmhsmf0u?method=get_tasks&user=" + user_id + "&validate=" + validation)
    const data = await response.json()
    console.log(data)
    dispatch(initProjects(data.projects));
    dispatch(initTasks(data.tasks));
    data.contacts.forEach((contact) => {
      contacts.add(new Contact(contact.id, contact.name, contact.status))
      setContacts(contacts)
    })
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch, fetchData])


  return (

    <div id="App">
      <Sidebar />

      <ContactsContext.Provider value={contactsValue}>
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
      </ContactsContext.Provider>

    </div>

  );
}
