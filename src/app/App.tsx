import React from 'react';
import { Route, Routes } from "react-router-dom";

import ToDoList from "../pages/todo_list.tsx";
import ProjectList from "../pages/project_list.tsx";
import NotFound from '../pages/not_found.tsx';
import Sidebar from '../widgets/sidebar.tsx';

export default function App() {

  return (

    <div id="App">
      <Sidebar />

      <Routes>
        <Route index element={<ToDoList page_name="Inbox" />} />
        <Route path="/" element={<ToDoList page_name="Inbox" />} />
        <Route path="/next" element={<ToDoList page_name="Next" />} />
        <Route path="/waiting" element={<ToDoList page_name="Waiting" />} />
        <Route path="/scheduled" element={<ToDoList page_name="Scheduled" />} />
        <Route path="/someday" element={<ToDoList page_name="Someday" />} />
        <Route path="/focus" element={<ToDoList page_name="Focus" />} />

        <Route path="/projects" element={<ProjectList />} />

        <Route path="/archive" element={<ToDoList page_name="Archive" />} />
        <Route path="/trash" element={<ToDoList page_name="Trash" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
}
