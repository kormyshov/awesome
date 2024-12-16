import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Header from '../features/header';
import { useDispatch } from 'react-redux';
import { saveProject } from '../entities/actions/projects.tsx'; 

import { useState } from 'react';


export default function EditProject(props) {

  const { id } = useParams();
  const project = useSelector((state) => state.projects.filter(project => project.id === id))[0];

  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState(project.projectName);
  const [projectDescription, setProjectDescription] = useState(project.projectDescription);

  const [projectStatus, setProjectStatus] = React.useState(project.projectStatus);

  const projectStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectStatus((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Header page_name="Edit project" />
      <div className="pageWrapper">
        <TextField id="project_name" label="Project name" variant="standard" size="small" className="pageWrapperInput" value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
        <TextField id="project_description" label="Description" variant="standard" size="small" className="pageWrapperInput" value={projectDescription} onChange={(e)=>setProjectDescription(e.target.value)} />
        <br /><br />
        <FormControl>
          <FormLabel id="project_status">Status</FormLabel>
          <RadioGroup
            aria-labelledby="project_status"
            name="radio-buttons-group"
            value={projectStatus}
            onChange={projectStatusChange}
          >
            <FormControlLabel value="ACTIVE" control={<Radio />} label="Active" />
            <FormControlLabel value="SOMEDAY" control={<Radio />} label="Someday" />
          </RadioGroup>
        </FormControl>

        <div className="pageWrapperButtonGroup">
          <Link to="/projects">
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to="/projects">
            <Button variant="contained" size="small" className="pageWrapperButton" onClick={()=>dispatch(saveProject(id, projectName, projectDescription, projectStatus))}>Save</Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
