import React from 'react';
import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import NumberInputBasic from '../../features/number_input.tsx';
import { Weekday } from 'rrule';


export default function TabWeekly(props) {

    const [monday, setMonday] = useState(props.repeatedRule.hasByweekday(0));
    const [tuesday, setTuesday] = useState(props.repeatedRule.hasByweekday(1));
    const [wednesday, setWednesday] = useState(props.repeatedRule.hasByweekday(2));
    const [thursday, setThursday] = useState(props.repeatedRule.hasByweekday(3));
    const [friday, setFriday] = useState(props.repeatedRule.hasByweekday(4));
    const [saturday, setSaturday] = useState(props.repeatedRule.hasByweekday(5));
    const [sunday, setSunday] = useState(props.repeatedRule.hasByweekday(6));

    const handleChangeWeekday = (foo, day, value) => {
        foo(value);
        if (value) {
            props.repeatedRule.setByweekday(props.repeatedRule.getByweekday().concat(new Weekday(day)));
        } else {
            props.repeatedRule.setByweekday(props.repeatedRule.getByweekday().filter(weekday => weekday.weekday !== day));
        }
    };

    return (
        <div
            role="tabpanel"
            hidden={props.tabValue !== 1}
            id="tabpanel-weekly"
            aria-labelledby="tab-weekly"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <DatePicker 
                    label="Start date"
                    value={props.repeatedRule.getDtstart()}
                    onChange={(newValue) => props.repeatedRule.setDtstart(newValue)}
                />
            </LocalizationProvider>
            <br /><br />

            <FormGroup aria-label="position" row>
                <FormControlLabel
                    control={<Checkbox checked={sunday} onChange={(e) => handleChangeWeekday(setSunday, 6, e.target.checked)} />}
                    label="S"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    control={<Checkbox checked={monday} onChange={(e) => handleChangeWeekday(setMonday, 0, e.target.checked)} />}
                    label="M"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    control={<Checkbox checked={tuesday} onChange={(e) => handleChangeWeekday(setTuesday, 1, e.target.checked)} />}
                    label="T"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    control={<Checkbox checked={wednesday} onChange={(e) => handleChangeWeekday(setWednesday, 2, e.target.checked)} />}
                    label="W"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    control={<Checkbox checked={thursday} onChange={(e) => handleChangeWeekday(setThursday, 3, e.target.checked)} />}
                    label="T"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    control={<Checkbox checked={friday} onChange={(e) => handleChangeWeekday(setFriday, 4, e.target.checked)} />}
                    label="F"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    control={<Checkbox checked={saturday} onChange={(e) => handleChangeWeekday(setSaturday, 5, e.target.checked)} />}
                    label="S"
                    labelPlacement="bottom"
                />
            </FormGroup>
            <br />

            <Typography id="input-slider" gutterBottom>
                Every
            </Typography>
            <NumberInputBasic 
                placeholder="Interval"
                value={props.repeatedRule.getInterval()}
                min={1}
                max={999}
                setValue={(newValue) => props.repeatedRule.setInterval(newValue)}
            />
            <Typography id="input-weeks" gutterBottom sx={{"padding-top": "10px", "padding-left": "200px"}}>
                week(s)
            </Typography>
        </div>
    );
}