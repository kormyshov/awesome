import React from 'react';
import { Link } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@mui/material/Button';


export default function DialogDeleteTask(props) {

    return (
        <Dialog
            open={props.dialogDelete}
            onClose={props.handleDialogDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-delete-title">
                {"Would you like to delete task?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={props.handleDialogDeleteClose}>Cancel</Button>
                <Link to={props.from}>
                    <Button 
                        onClick={()=>props.deleteTask()} 
                        autoFocus 
                        color="error"
                    >
                        Delete
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
}
