import React from 'react';
import Header from '../ui/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function Page(props) {
  return (
    <>
      <Header page_name={props.page_name} />
      <div className="fabAdd">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}

export default Page;
