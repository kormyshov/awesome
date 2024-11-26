import React from 'react';
import Typography from '@mui/material/Typography';


function Header(props) {
  return (
    <div className='header'>
      <Typography variant="h4" gutterBottom>
        {props.page_name}
      </Typography>
    </div>
  );
}

export default Header;
