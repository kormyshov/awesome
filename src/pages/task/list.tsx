import React, { useContext } from 'react';

import { Link, useLocation } from 'react-router-dom';

import Header from '../../features/header.tsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NamedList from '../../widgets/named_list.tsx';

import { TasksContext } from '../../app/App.tsx';
import { ProjectsContext } from '../../app/App.tsx';


export default function TaskList(props) {

  const { tasks } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);

  const location = useLocation();

  const items = tasks
    .filterByStatus(props.page_name)
    ;
  
  const notDeletedProjects = projects.filterIsNotDeleted();

  const actions = items
    .filter(task => task.isProjectEmpty(notDeletedProjects))
    .map(e => ({value: e.getName(), id: e.getId(), is_checked: e.getIsChecked(), status: e.getStatus()}))
    ;

  const current_page = location.pathname === "/" ? "inbox" : location.pathname.substring(1);

  const actions_with_project = notDeletedProjects
    .map(project => ({
      projectName: project.name,
      tasks: items
              .filter(task => task.projectIdEqual(project.id))
              .map(task => ({value: task.getName(), id: task.getId(), is_checked: task.getIsChecked(), status: task.getStatus()}))
    }))
    .filter(e => e.tasks.length > 0)
    .map(e => (<NamedList list_name={e.projectName} is_checked={true} items={e.tasks} from={current_page} />))
    ;

  return (
    <>
      <Header page_name={props.page_name} />

      
      {actions.length > 0 ?
        <NamedList list_name="Actions" is_checked={true} items={actions} from={current_page} /> : <></>
      }
      {actions_with_project}
      

      <div className="fabAdd">
        <Link to={"/tasks/" + props.page_name + "/new"}>
          <Fab color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </>
  );
}
