import React from 'react';

import ListHeader from '../features/list_header';

export default function NamedList(props) {

  const lst = props.items.map(e => <li>{e.value}</li>)

  return (
    <>
      <ListHeader list_name={props.list_name} />
      <ul>
        {lst}
      </ul>
    </>
  );
}
