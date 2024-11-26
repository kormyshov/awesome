import React from 'react';
import { Route, Routes } from "react-router-dom";

import Page from "./page.tsx";
import Sidebar from './sidebar.tsx';

export default function App() {

  return (

    <div id="App">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Page page_name="Inbox" />} />
        <Route path="/next" element={<Page page_name="Next" />} />
        <Route path="/waiting" element={<Page page_name="Waiting" />} />
        <Route path="/scheduled" element={<Page page_name="Scheduled" />} />
        <Route path="/someday" element={<Page page_name="Someday" />} />
        <Route path="/focus" element={<Page page_name="Focus" />} />

        <Route path="/archive" element={<Page page_name="Archive" />} />
        <Route path="/trash" element={<Page page_name="Trash" />} />
      </Routes>
    </div>

  );
}
