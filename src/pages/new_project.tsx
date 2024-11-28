import React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../features/header';


export default function NewProject(props) {
  return (
    <>
      <Header page_name="Create project" />
      <div className="pageWrapper">
        <TextField id="new_project" label="New project" variant="outlined" size="small" className="pageWrapperInput" />
        <div className="pageWrapperButtonGroup">
          <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          <Button variant="contained" size="small" className="pageWrapperButton">Create</Button>
        </div>
      </div>
      
    </>
  );
}
