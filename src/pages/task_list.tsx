import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../features/header.js';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NamedList from '../widgets/named_list.tsx';


export default function TaskList(props) {

  const taskList = useSelector((state) => state.tasks);
  const projectList = useSelector((state) => state.projects);

  const items = taskList
    .filter(e => e.taskStatus.toLowerCase() === props.page_name.toLowerCase() || (e.taskStatus === "" && props.page_name === "Inbox"))
    ;

  const actions = items.filter(e => !("taskProject" in e) || e.taskProject === "").map(e => ({value: e.taskName, id: e.id, is_checked: e.isChecked, status: e.taskStatus}));

  const actions_with_project = projectList
    .map(e => ({
      projectName: e.projectName,
      tasks: items.filter(t => t.taskProject === e.id).map(t => ({value: t.taskName, id: t.id, is_checked: t.isChecked, status: t.taskStatus}))
    }))
    .filter(e => e.tasks.length > 0)
    .map(e => (<NamedList list_name={e.projectName} is_checked={true} items={e.tasks} />))
    ;


  return (
    <>
      <Header page_name={props.page_name} />

      
      {actions.length > 0 ?
        <NamedList list_name="Actions" is_checked={true} items={actions} /> : <></>
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
