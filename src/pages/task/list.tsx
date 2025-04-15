import React, { useContext } from 'react';

import { Link, useLocation } from 'react-router-dom';

import Header from '../../features/header.tsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NamedList from '../../widgets/named_list.tsx';

import { ContactsContext, CurrentAreaContext, TasksContext, ProjectsContext } from '../../app/App.tsx';


export default function TaskList(props) {

  const { tasks } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);
  const { contacts } = useContext(ContactsContext);
  const { currentArea } = useContext(CurrentAreaContext);
  
  const location = useLocation();
  const current_page = location.pathname === "/" ? "inbox" : location.pathname.substring(1);

  const task_list_strategy = props.task_list_strategy;
  const task_list = task_list_strategy
    .prepare_list(tasks, projects, contacts, currentArea, '')
    .map(e => (
      <NamedList 
        list_name={e.getListName()} 
        is_checked={true} 
        items={task_list_strategy.decorate_list(e)}
        from={current_page} 
      />))
    ;

  return (
    <>
      <Header page_name={props.page_name} />

      {task_list}
      
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
