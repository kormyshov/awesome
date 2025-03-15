import React, { useContext } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AreasContext } from '../../app/App.tsx';


export default function SelectAreaList(props) {

    const { areas } = useContext(AreasContext);

    const areaList = areas
        .filterIsNotDeleted()
        .map(area => (
            <MenuItem key={area.getId()} value={area.getId()}>
                {area.getName()}
            </MenuItem>
        ))
    ;

    return (
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="task_area">Area</InputLabel>
          <Select
            labelId="simple-select-standard-label"
            id="simple-select-area"
            value={props.area}
            onChange={props.areaChange}
            label="Area"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {areaList}
          </Select>
        </FormControl>
    );
}