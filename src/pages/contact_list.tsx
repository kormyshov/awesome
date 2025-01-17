import React from 'react';
import Header from '../features/header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NamedList from '../widgets/named_list.tsx';


export default function ContactList(props) {

  const contactList = useSelector((state) => state.contacts);
  console.log(contactList);

  const items = contactList
    .filter(e => e.contactStatus === "ACTIVE")
    .map(e => ({value: e.contactName, id: e.id, status: e.contactStatus}));

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
