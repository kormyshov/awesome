import React, { useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Link } from "react-router-dom";

import Header from '../../features/header.tsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import NamedList from '../../widgets/named_list.tsx';

import { ContactsContext, ProjectsContext } from '../../app/App.tsx';
import { AreasContext } from '../../app/App.tsx';
import { TasksContext } from '../../app/App.tsx';
import { Project as ObjProject } from '../../entities/types/project/project.ts';
import { Area } from '../../entities/types/area/area.ts';
import { uploadProjects } from '../../entities/upload/projects.ts';
import { uploadTasks } from '../../entities/upload/tasks.ts';


export default function Project(props) {

  const { id } = useParams();
  const { projects, setProjects } = useContext(ProjectsContext);
  const project: ObjProject = projects.get(id);

  const { areas } = useContext(AreasContext);
  const area: Area = areas.get(project.getAreaId());

  const location = useLocation();

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const { tasks, setTasks } = useContext(TasksContext);

  const { contacts } = useContext(ContactsContext);

  const task_list_strategy = props.task_list_strategy;
  const task_lists = task_list_strategy.prepare_list(tasks, projects, contacts, areas, area, id);
  const task_list = task_lists
    .map(e => (
      <NamedList 
        list_name={e.getListName()} 
        is_checked={true} 
        items={task_list_strategy.decorate_list(e)} 
        from={location.pathname.substring(1)} 
      />))
    ;

  const deleteProject = () => {
  
    project.setDeleted();
    uploadProjects(projects);
    setProjects(projects);
  
    task_lists.forEach(e => e.getItems().forEach(task => task.setDeleted()));
    uploadTasks(tasks);
    setTasks(tasks);
  };

  return (
    <>
      <Header page_name="Project" />

      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
              project.isActive() ? 
              <CircleIcon sx={{ fontSize: 16, marginRight: 1 }} color="primary" /> : 
              <CircleIcon sx={{ fontSize: 16, marginRight: 1 }} color="disabled" />
            }
            { project.getName() }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            { project.getDescription() }
          </Typography>
          <br />
          <Stack direction="row" spacing={1}>
            { area.getName() !== "Unknown area" ? <Chip label={area.getName()} /> : "" }
          </Stack>
        </CardContent>
        <CardActions>
          <Link to="./edit">
            <Button size="small">Edit</Button>
          </Link>
          <Button size="small" color="error" onClick={handleDialogDeleteOpen}>Delete</Button>
        </CardActions>
      </Card>

      {task_list}

      <Dialog
        open={dialogDelete}
        onClose={handleDialogDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-delete-title">
          {"Would you like to delete project?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delete-description">
            All tasks will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogDeleteClose}>Cancel</Button>
          <Link to="/projects">
            <Button onClick={()=>deleteProject()} autoFocus color="error">
              Delete
            </Button>
          </Link>
        </DialogActions>
      </Dialog>

      <div className="fabAdd">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
