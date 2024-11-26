import React from 'react';
import Header from '../features/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function ProjectList(props) {
  return (
    <>
      <Header page_name="Projects" />
      <div className="fabAdd">
        <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
