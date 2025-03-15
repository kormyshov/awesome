import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Header from '../../features/header.tsx';

import { useState } from 'react';
import { AreasContext } from '../../app/App.tsx';
import { Area } from '../../entities/types/area/area.ts';
import { uploadAreas } from '../../entities/upload/areas.ts';


export default function NewArea(props) {

  const [areaName, setAreaName] = useState('');

  const { areas, setAreas } = useContext(AreasContext);

  const addNewArea = () => {
    areas.add(new Area(areaName));
    uploadAreas(areas);
    setAreas(areas);
  };

  return (
    <>
      <Header page_name="Create area" />
      <div className="pageWrapper">
        <TextField 
          id="area_name" 
          label="Area name" 
          variant="standard" 
          size="small" 
          className="pageWrapperInput" 
          value={areaName} 
          onChange={(e)=>setAreaName(e.target.value)} />
        <br /><br />

        <div className="pageWrapperButtonGroup">
          <Link to="/areas">
            <Button variant="outlined" size="small" className="pageWrapperButton">Cancel</Button>
          </Link>
          <Link to="/areas">
            <Button variant="contained" size="small" className="pageWrapperButton" onClick={()=>addNewArea()}>Create</Button>
          </Link>
        </div>
      </div>

    </>
  );
}
