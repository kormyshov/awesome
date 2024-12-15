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


export default function Project(props) {

  const { id } = useParams();
  const project = useSelector((state) => state.projects.filter(project => project.id === id));

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Header page_name="Project" />

      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
              project[0].projectStatus === "ACTIVE" ? 
              <CircleIcon sx={{ fontSize: 16, marginRight: 1 }} color="primary" /> : 
              <CircleIcon sx={{ fontSize: 16, marginRight: 1 }} color="disabled" />
            }
            { project[0].projectName }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            { project[0].projectDescription }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small" color="error" onClick={handleDialogDeleteOpen}>Delete</Button>
        </CardActions>
      </Card>

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
            <Button onClick={()=>dispatch(deleteProject(project[0].id, project[0].projectName, project[0].projectDescription))} autoFocus color="error">
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
