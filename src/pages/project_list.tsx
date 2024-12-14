import React from 'react';
import Header from '../features/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NamedList from '../widgets/named_list.tsx';


export default function ProjectList(props) {

  const projectList = useSelector((state) => state.projects);

  const items = projectList.map(e => ({value: e.projectName, key: e.key, status: e.projectStatus}));
  const activeProjects = items.filter(e => e.status === "ACTIVE");
  const somedayProjects = items.filter(e => e.status === "SOMEDAY");

  return (
    <>
      <Header page_name="Projects" />
      <NamedList list_name="ACTIVE" items={activeProjects} />
      <NamedList list_name="SOMEDAY" items={somedayProjects} />

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
