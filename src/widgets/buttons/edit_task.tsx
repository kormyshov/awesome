import React from 'react';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ButtonGroupEditTask(props) {

    return (
        <div className="pageWrapperButtonGroup">
          <Link to={props.from}>
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to={props.from}>
            <Button
              variant="contained" 
              size="small" 
              className="pageWrapperButton" 
              onClick={()=>props.saveTask()}
            >
              Save
            </Button>
          </Link>
          <br /><br />
          <Button size="small" color="error" variant="outlined" style={{ width: "100%" }} onClick={props.handleDialogDeleteOpen}>
            <DeleteIcon />
          </Button>
        </div>
    );
}