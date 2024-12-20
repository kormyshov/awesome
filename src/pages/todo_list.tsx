import React from 'react';

import { Link } from 'react-router-dom';

import Header from '../features/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function ToDoList(props) {
  return (
    <>
      <Header page_name={props.page_name} />

      <div className="fabAdd">
        <Link to="new">
          <Fab color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </>
  );
}
