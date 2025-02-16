import React, { useContext } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { ProjectsContext } from '../../app/App.tsx';


export default function SelectProjectList(props) {

    const { projects } = useContext(ProjectsContext);

    const projectList = projects
        .filterIsNotDeleted()
        .map(project => (
            <MenuItem key={project.getId()} value={project.getId()}>
                {project.getName()}
            </MenuItem>
        ))
    ;

    return (
        <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
          <InputLabel id="task_project">Project</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={props.taskProject}
            onChange={props.taskProjectChange}
            label="Project"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {projectList}
          </Select>
        </FormControl>
    );
}