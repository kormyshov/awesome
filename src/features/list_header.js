import React from 'react';
import Typography from '@mui/material/Typography';


function ListHeader(props) {
  return (
    <div className='list_header'>
      <Typography variant="subtitle1" gutterBottom>
        {props.list_name}
      </Typography>
    </div>
  );
}

export default ListHeader;
