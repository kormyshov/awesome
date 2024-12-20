import React from 'react';
import { Route, Routes } from "react-router-dom";

import ToDoList from "../pages/todo_list.tsx";
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
        <Route index element={<ToDoList page_name="Inbox" />} />
        <Route path="/">
          <Route index element={<ToDoList page_name="Inbox" />} />
          <Route path="new" element={<NewTask from="" />} />
        </Route>
        <Route path="next" element={<ToDoList page_name="Next" />} />
        <Route path="waiting" element={<ToDoList page_name="Waiting" />} />
        <Route path="scheduled" element={<ToDoList page_name="Scheduled" />} />
        <Route path="someday" element={<ToDoList page_name="Someday" />} />
        <Route path="focus" element={<ToDoList page_name="Focus" />} />

        <Route path="projects">
          <Route index element={<ProjectList />} />
          <Route path="new" element={<NewProject />} />
          <Route path=":id" element={<Project />} />
          <Route path=":id/edit" element={<EditProject />} />
        </Route>

        <Route path="archive" element={<ToDoList page_name="Archive" />} />
        <Route path="trash" element={<ToDoList page_name="Trash" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>

  );
}
