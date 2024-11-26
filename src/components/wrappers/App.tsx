import React from 'react';
import Page from "./page.tsx";
import Sidebar from './sidebar.tsx';

export default function App() {
  const [page, setPage] = React.useState("Inbox");

  const togglePage = (newPage: string) => () => {
    setPage(newPage);
  };

  return (

    <div id="App">
      <Sidebar tooglePage={togglePage} />
      <Page page_name={page} />
    </div>

  );
}
