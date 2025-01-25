import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../../features/header';

import { useState, useContext } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Contact } from '../../entities/types/contact/contact.tsx';
import { ContactsContext } from '../../app/App.tsx';
import { uploadContacts } from '../../entities/upload/contacts.tsx';


export default function EditContact(props) {

  const { contacts, setContacts } = useContext(ContactsContext);

  const { id } = useParams();

  const contact: Contact = contacts.items.get(id);
  console.log('contact', contact);

  const [contactName, setContactName] = useState(contact.name);

  const [dialogDelete, setDialogDeleteOpen] = React.useState(false);

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogDeleteClose = () => {
    setDialogDeleteOpen(false);
  };

  const saveContact = () => {
    contact.name = contactName;
    uploadContacts(contacts);
    setContacts(contacts);
  };

  const deleteContact = () => {
    contact.setDeleted();
    uploadContacts(contacts);
    setContacts(contacts);
  };

  return (
    <>
      <Header page_name="Edit contact" />
      <div className="pageWrapper">

        <TextField 
          id="contact_name" 
          label="Contact name" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          value={contactName} 
          onChange={(e)=>setContactName(e.target.value)}
        />

        <br /><br />

        <div className="pageWrapperButtonGroup">
          <Link to={"/contacts"}>
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to={"/contacts"}>
            <Button
              variant="contained" 
              size="small" 
              className="pageWrapperButton" 
              onClick={()=>saveContact()}
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
          {"Would you like to delete contact?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delete-description">
            All tasks will be moved to Inbox.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogDeleteClose}>Cancel</Button>
          <Link to={"/contacts"}>
            <Button 
              onClick={()=>deleteContact()} 
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
