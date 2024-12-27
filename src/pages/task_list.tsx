import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../features/header.js';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NamedList from '../widgets/named_list.tsx';


export default function TaskList(props) {

  const taskList = useSelector((state) => state.tasks);
  const items = taskList.map(e => ({value: e.taskName, id: e.id, is_checked: e.isChecked}));

  return (
    <>
      <Header page_name={props.page_name} />

      <NamedList list_name={props.page_name} is_checked={true} items={items} />

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
