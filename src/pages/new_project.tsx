import React from 'react';
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../features/header';
import { useDispatch } from 'react-redux';
import { addProject } from '../entities/actions/projects.tsx'; 

import { useState } from 'react';


export default function NewProject(props) {

  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState('');

  return (
    <>
      <Header page_name="Create project" />
      <div className="pageWrapper">
        <TextField id="new_project" label="New project" variant="outlined" size="small" className="pageWrapperInput" value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
        <div className="pageWrapperButtonGroup">
          <Link to="/projects">
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to="/projects">
            <Button variant="contained" size="small" className="pageWrapperButton" onClick={()=>dispatch(addProject(projectName))}>Create</Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
