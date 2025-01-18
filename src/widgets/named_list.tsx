import React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import ChecklistItem from '../features/checklist_item.tsx';
import ListItem from '../features/list_item.tsx';


export default function NamedList(props) {

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const lst = props.is_checked ?
    props.items.map(e => <ChecklistItem key={e.id} item_id={e.id} item_is_checked={e.is_checked} item_value={e.value} from={props.from} />) :
    props.items.map(e => <ListItem key={e.id} item_id={e.id} item_status={e.status} item_value={e.value} />)
  ;

  return (
    <>
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={props.list_name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {lst}
          </List>
        </Collapse>
      </List>
    </>
  );
}
