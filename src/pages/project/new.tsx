import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { SelectChangeEvent } from '@mui/material/Select';

import Header from '../../features/header.tsx';

import { useState } from 'react';
import { CurrentAreaContext, ProjectsContext } from '../../app/App.tsx';
import { Project } from '../../entities/types/project/project.ts';
import { ProjectStatus } from '../../entities/types/project/project_status.ts';
import { uploadProjects } from '../../entities/upload/projects.ts';
import SelectAreaList from '../../widgets/selects/area_list.tsx';


export default function NewProject(props) {

  const { projects, setProjects } = useContext(ProjectsContext);

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const { currentArea } = useContext(CurrentAreaContext);
  const [projectArea, setProjectArea] = useState(currentArea.getId() === 'all_areas' ? '' : currentArea.getId());

  const projectAreaChange = (event: SelectChangeEvent) => {
    setProjectArea(event.target.value);
  };

  const [projectStatus, setProjectStatus] = React.useState('ACTIVE');

  const projectStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectStatus((event.target as HTMLInputElement).value);
  };

  const addNewProject = () => {
    projects.add(new Project(projectName, projectDescription, projectArea, ProjectStatus[projectStatus]));
    uploadProjects(projects);
    setProjects(projects);
  };

  return (
    <>
      <Header page_name="Create project" />
      <div className="pageWrapper">
        <TextField 
          id="project_name" 
          label="Project name" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          value={projectName} 
          onChange={(e)=>setProjectName(e.target.value)} 
        />
        <TextField 
          id="project_description" 
          label="Description" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          multiline
          value={projectDescription} 
          onChange={(e)=>setProjectDescription(e.target.value)} 
        />
        <SelectAreaList 
          area={projectArea}
          areaChange={projectAreaChange}
          noneValue="None"
        />
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
            <Button variant="contained" size="small" className="pageWrapperButton" onClick={()=>addNewProject()}>Create</Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
