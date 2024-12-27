import React from 'react';
import { Route, Routes } from "react-router-dom";

import TaskList from "../pages/task_list.tsx";
import ProjectList from "../pages/project_list.tsx";
import NotFound from '../pages/not_found.tsx';
import Sidebar from '../widgets/sidebar.tsx';
import NewProject from '../pages/new_project.tsx';
import Project from '../pages/project.tsx';
import EditProject from '../pages/edit_project.tsx';

import NewTask from '../pages/new_task.tsx';

export default function App() {

  return (

    <div id="App">
      <Sidebar />

      <Routes>
        <Route index element={<TaskList page_name="Inbox" />} />
        <Route path="/">
          <Route index element={<TaskList page_name="Inbox" />} />
          <Route path="new" element={<NewTask from="" />} />
        </Route>
        <Route path="next" element={<TaskList page_name="Next" />} />
        <Route path="waiting" element={<TaskList page_name="Waiting" />} />
        <Route path="scheduled" element={<TaskList page_name="Scheduled" />} />
        <Route path="someday" element={<TaskList page_name="Someday" />} />
        <Route path="focus" element={<TaskList page_name="Focus" />} />

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
