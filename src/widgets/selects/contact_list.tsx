import React, { useContext } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { ContactsContext } from '../../app/App.tsx';


export default function SelectContactList(props) {

    const { contacts } = useContext(ContactsContext);

    const contactList = contacts
      .filterIsActive()
      .map(contact => (
        <MenuItem key={contact.getId()} value={contact.getId()}>
          {contact.getName()}
        </MenuItem>
      ));

    return (
        <FormControl variant="standard" disabled={props.cantSelectContact}>
            <InputLabel id="task_waiting_contact">Contact</InputLabel>
            <Select
                labelId="simple-select-standard-label"
                id="simple-select-standard"
                value={props.waitingContact}
                onChange={props.waitingContactChange}
                label="Contact"
            >
                {contactList}
            </Select>
        </FormControl>
    );
}