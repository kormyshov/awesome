import React from 'react';
import Header from '../features/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProjectList(props) {

  const projectList = useSelector((state) => state.projects);

  const lst = projectList.map(e => <li>{e.projectName}</li>)

  return (
    <>
      <Header page_name="Projects" />
      <ul>
        {lst}
      </ul>
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
