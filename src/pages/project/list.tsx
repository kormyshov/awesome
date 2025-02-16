import React, { useContext } from 'react';
import Header from '../../features/header.tsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

import NamedList from '../../widgets/named_list.tsx';
import { ProjectsContext } from '../../app/App.tsx';


export default function ProjectList(props) {

  const { projects } = useContext(ProjectsContext);

  const items = projects
    .filterIsNotDeleted()
    .map(project => ({value: project.getName(), id: project.getId(), status: project.getStatus()}));

  const activeProjects = items.filter(e => e.status === "ACTIVE");
  const somedayProjects = items.filter(e => e.status === "SOMEDAY");

  return (
    <>
      <Header page_name="Projects" />
      <NamedList list_name="ACTIVE" items={activeProjects} />
      <NamedList list_name="SOMEDAY" items={somedayProjects} />

      <div className="fabAdd">
        <Link to="new">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </>
  );
}
