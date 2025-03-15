import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../../features/header.tsx';

import { useState, useContext } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { Area } from '../../entities/types/area/area.ts';
import { AreasContext, TasksContext, ProjectsContext } from '../../app/App.tsx';
import { uploadAreas } from '../../entities/upload/areas.ts';
import { uploadTasks } from '../../entities/upload/tasks.ts';
import { uploadProjects } from '../../entities/upload/projects.ts';


export default function EditArea(props) {

  const { areas, setAreas } = useContext(AreasContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const { projects, setProjects } = useContext(ProjectsContext);

  const { id } = useParams();

  const area: Area = areas.get(id);
  const filteredTasks = tasks.filterByAreaId(id);
  const filteredProjects = projects.filterByAreaId(id);

  const [areaName, setAreaName] = useState(area.getName());

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const saveArea = () => {
    area.setName(areaName);
    uploadAreas(areas);
    setAreas(areas);
  };

  const deleteArea = () => {

    area.setDeleted();
    uploadAreas(areas);
    setAreas(areas);

    filteredTasks.forEach(task => task.clearArea());
    uploadTasks(tasks);
    setTasks(tasks);

    filteredProjects.forEach(project => project.clearArea());
    uploadProjects(projects);
    setProjects(projects);
  };

  return (
    <>
      <Header page_name="Edit area" />
      <div className="pageWrapper">

        <TextField 
          id="area_name" 
          label="Area name" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          value={areaName} 
          onChange={(e)=>setAreaName(e.target.value)}
        />

        <br /><br />

        <div className="pageWrapperButtonGroup">
          <Link to={"/areas"}>
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to={"/areas"}>
            <Button
              variant="contained" 
              size="small" 
              className="pageWrapperButton" 
              onClick={()=>saveArea()}
            >
              Save
            </Button>
          </Link>
          <br /><br />
          <Button size="small" color="error" variant="outlined" style={{ width: "100%" }} onClick={handleDialogDeleteOpen}>
            <DeleteIcon />
          </Button>
        </div>
      </div>

      <Dialog
        open={dialogDelete}
        onClose={handleDialogDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-delete-title">
          {"Would you like to delete area?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-delete-description">
            All tasks will be moved to Inbox.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleDialogDeleteClose}>Cancel</Button>
          <Link to={"/areas"}>
            <Button 
              onClick={()=>deleteArea()} 
              autoFocus 
              color="error"
            >
              Delete
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      
    </>
  );
}
