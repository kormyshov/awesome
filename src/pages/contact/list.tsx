import React, { useContext } from 'react';
import Header from '../../features/header.tsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

import NamedList from '../../widgets/named_list.tsx';
import { ContactsContext } from '../../app/App.tsx';


export default function ContactList(props) {

  const { contacts } = useContext(ContactsContext);

  const items = contacts
    .filterIsActive()
    .map(contact => ({value: contact.getName(), id: contact.getId(), status: contact.getStatus()}));

  return (
    <>
      <Header page_name="Contacts" />
      <NamedList list_name="All contacts" items={items} />

      <div className="fabAdd">
        <Link to="new">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </>
  );
}
