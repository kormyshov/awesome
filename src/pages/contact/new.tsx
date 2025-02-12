import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../../features/header.tsx';

import { useState } from 'react';
import { ContactsContext } from '../../app/App.tsx';
import { Contact } from '../../entities/types/contact/contact.ts';
import { uploadContacts } from '../../entities/upload/contacts.ts';


export default function NewContact(props) {

  const [contactName, setContactName] = useState('');

  const { contacts, setContacts } = useContext(ContactsContext);

  const addNewContact = () => {
    contacts.add(new Contact(contactName));
    uploadContacts(contacts);
    setContacts(contacts);
  };

  return (
    <>
      <Header page_name="Create contact" />
      <div className="pageWrapper">
        <TextField 
          id="contact_name" 
          label="Contact name" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          value={contactName} 
          onChange={(e)=>setContactName(e.target.value)} />
        <br /><br />

        <div className="pageWrapperButtonGroup">
          <Link to="/contacts">
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to="/contacts">
            <Button variant="contained" size="small" className="pageWrapperButton" onClick={()=>addNewContact()}>Create</Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
