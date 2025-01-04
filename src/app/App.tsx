import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TaskList from "../pages/task_list.tsx";
import ProjectList from "../pages/project_list.tsx";
import NotFound from '../pages/not_found.tsx';
import Sidebar from '../widgets/sidebar.tsx';
import NewProject from '../pages/new_project.tsx';
import Project from '../pages/project.tsx';
import EditProject from '../pages/edit_project.tsx';
import EditTask from '../pages/edit_task.tsx';

import NewTask from '../pages/new_task.tsx';

import { initProjects } from '../entities/actions/projects.tsx';
import { initTasks } from '../entities/actions/tasks.tsx';


export default function App() {

  const dispatch = useDispatch();

  const fetchData = () => async (dispatch) => {
    window.Telegram.WebApp.expand();
    let user_id = window.Telegram.WebApp.initDataUnsafe.user?.id;
    if (typeof user_id === "undefined") user_id = "64906703"
    const response = await fetch("https://functions.yandexcloud.net/d4e8kmjr3ahqqj1u4jbr?method=get_tasks&user=" + user_id)
    const data = await response.json()
    console.log(data)
    dispatch(initProjects(data.projects));
    dispatch(initTasks(data.tasks));
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (

    <div id="App">
      <Sidebar />

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
          <Route path=":id/edit/:from" element={<EditTask />} />
        </Route>

        <Route path="projects">
          <Route index element={<ProjectList />} />
          <Route path="new" element={<NewProject />} />
          <Route path=":id" element={<Project />} />
          <Route path=":id/edit" element={<EditProject />} />
        </Route>

        <Route path="archive" element={<TaskList page_name="Archive" />} />
        <Route path="trash" element={<TaskList page_name="Trash" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>

  );
}
