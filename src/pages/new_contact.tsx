import React from 'react';
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../features/header';
import { useDispatch } from 'react-redux';
import { addContact } from '../entities/actions/contacts.tsx';

import { useState } from 'react';


export default function NewContact(props) {

  const dispatch = useDispatch();

  const [contactName, setContactName] = useState('');

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
            <Button variant="contained" size="small" className="pageWrapperButton" onClick={()=>dispatch(addContact(contactName))}>Create</Button>
          </Link>
        </div>
      </div>
      
    </>
  );
}
