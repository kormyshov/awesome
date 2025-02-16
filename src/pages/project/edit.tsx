import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Header from '../../features/header.tsx';

import { useState } from 'react';
import { ProjectsContext } from '../../app/App.tsx';
import { Project } from '../../entities/types/project/project.ts';
import { uploadProjects } from '../../entities/upload/projects.ts';
import { ProjectStatus } from '../../entities/types/project/project_status.ts';


export default function EditProject(props) {

  const { id } = useParams();
  const { projects, setProjects } = useContext(ProjectsContext);
  const project: Project = projects.get(id);

  const [projectName, setProjectName] = useState(project.getName());
  const [projectDescription, setProjectDescription] = useState(project.getDescription());

  const [projectStatus, setProjectStatus] = React.useState(project.getStatus());

  const projectStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectStatus((event.target as HTMLInputElement).value);
  };

  const saveProject = () => {
    project.setName(projectName);
    project.setDescription(projectDescription);
    project.setStatus(projectStatus);
    uploadProjects(projects);
    setProjects(projects);
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
            <FormControlLabel value={ProjectStatus.ACTIVE} control={<Radio />} label="Active" />
            <FormControlLabel value={ProjectStatus.SOMEDAY} control={<Radio />} label="Someday" />
          </RadioGroup>
        </FormControl>

        <div className="pageWrapperButtonGroup">
          <Link to={"/projects/" + id}>
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to={"/projects/" + id}>
            <Button variant="contained" size="small" className="pageWrapperButton" onClick={()=>saveProject()}>Save</Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
