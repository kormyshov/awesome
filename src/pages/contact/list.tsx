import React from 'react';
import Header from '../../features/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NamedList from '../../widgets/named_list.tsx';
import { Contact } from '../../entities/types/contact/contact.tsx';
import { Contacts } from '../../entities/types/contact/contacts.tsx';


export default function ContactList(props) {

  const contacts: Contacts = useSelector((state) => state.contacts);
  console.log('list contacts', contacts);

  const items = contacts
    .filter(Contact.prototype.isActive)
    .map(contact => ({value: contact.name, id: contact.id, status: contact.status}));

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
