import React from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

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

import { useDispatch } from 'react-redux';
import { deleteProject } from '../entities/actions/projects.tsx'; 
import { Link } from "react-router-dom";

import Header from '../features/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import NamedList from '../widgets/named_list.tsx';


export default function Project(props) {

  const { id } = useParams();
  const project = useSelector((state) => state.projects.filter(project => project.id === id))[0];

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.tasks);

  const items = taskList
    .filter(e => e.taskProject === project.id && "taskProject" in e)
    ;

  const actions_with_status = ["Next", "Someday"]
    .map(e => ({
      status: e,
      tasks: items.filter(t => t.taskStatus.toLowerCase() === e.toLowerCase()).map(t => ({value: t.taskName, id: t.id, is_checked: t.isChecked, status: t.taskStatus}))
    }))
    .filter(e => e.tasks.length > 0)
    .map(e => (<NamedList list_name={e.status} is_checked={true} items={e.tasks} />))
    ;

  return (
    <>
      <Header page_name="Project" />

      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
              project.projectStatus === "ACTIVE" ? 
              <CircleIcon sx={{ fontSize: 16, marginRight: 1 }} color="primary" /> : 
              <CircleIcon sx={{ fontSize: 16, marginRight: 1 }} color="disabled" />
            }
            { project.projectName }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            { project.projectDescription }
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
            <Button onClick={()=>dispatch(deleteProject(project.id, project.projectName, project.projectDescription))} autoFocus color="error">
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
