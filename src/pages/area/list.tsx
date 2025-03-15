import React, { useContext } from 'react';
import Header from '../../features/header.tsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

import NamedList from '../../widgets/named_list.tsx';
import { AreasContext } from '../../app/App.tsx';


export default function AreaList(props) {

  const { areas } = useContext(AreasContext);

  const items = areas
    .filterIsActive()
    .map(area => ({value: area.getName(), id: area.getId(), status: area.getStatus()}));

  return (
    <>
      <Header page_name="Areas" />
      <NamedList list_name="All areas" items={items} />

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
