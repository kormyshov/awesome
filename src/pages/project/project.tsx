import React, { useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Link } from "react-router-dom";

import Header from '../../features/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import NamedList from '../../widgets/named_list.tsx';

import { ProjectsContext } from '../../app/App.tsx';
import { TasksContext } from '../../app/App.tsx';
import { Project as ObjProject } from '../../entities/types/project/project.tsx';
import { uploadProjects } from '../../entities/upload/projects.tsx';
import { TaskStatus } from '../../entities/types/task/task_status.tsx';
import { uploadTasks } from '../../entities/upload/tasks.tsx';


export default function Project(props) {

  const { id } = useParams();
  const { projects, setProjects } = useContext(ProjectsContext);
  const project: ObjProject = projects.items.get(id);

  const location = useLocation();

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const { tasks, setTasks } = useContext(TasksContext);

  const items = tasks
    .toList()
    .filter(task => task.isProject(id))
    ;

  console.log(items);
  console.log(id, items);

  const actions_with_status = ["Next", "Waiting", "Scheduled", "Someday"]
    .map(status => ({
      status: status,
      tasks: items
        .filter(task => task.statusIs(status as TaskStatus))
        .map(task => ({value: task.name, id: task.id, is_checked: task.isChecked, status: task.status}))
    }))
    .filter(e => e.tasks.length > 0)
    .map(e => (<NamedList list_name={e.status} is_checked={true} items={e.tasks} from={location.pathname.substring(1)} />))
    ;

  const deleteProject = () => {
  
    project.setDeleted();
    uploadProjects(projects);
    setProjects(projects);
  
    items.forEach(task => task.setDeleted())
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
            { project.name }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            { project.description }
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="./edit">
            <Button size="small">Edit</Button>
          </Link>
          <Button size="small" color="error" onClick={handleDialogDeleteOpen}>Delete</Button>
        </CardActions>
      </Card>

      {actions_with_status}

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
