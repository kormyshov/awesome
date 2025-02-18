import React from 'react';
import { useState } from 'react';

import 'dayjs/locale/de';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import NumberInputBasic from '../../features/number_input.tsx';


export default function TabWeekly(props) {

    const [monday, setMonday] = useState(props.rrule_byweekday.includes(0));
    const [tuesday, setTuesday] = useState(props.rrule_byweekday.includes(1));
    const [wednesday, setWednesday] = useState(props.rrule_byweekday.includes(2));
    const [thursday, setThursday] = useState(props.rrule_byweekday.includes(3));
    const [friday, setFriday] = useState(props.rrule_byweekday.includes(4));
    const [saturday, setSaturday] = useState(props.rrule_byweekday.includes(5));
    const [sunday, setSunday] = useState(props.rrule_byweekday.includes(6));

    const handleChangeWeekday = (foo, day, value) => {
        foo(value);
        if (value) {
            props.setRRuleByWeekday(props.rrule_byweekday.concat(day));
        } else {
            props.setRRuleByWeekday(props.rrule_byweekday.filter(d => d !== day));
        }
    };

    return (
        <div
            role="tabpanel"
            hidden={props.tabValue !== 1}
            id="tabpanel-weekly"
            aria-labelledby="tab-weekly"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <DatePicker 
                    label="Start date"
                    value={props.rrule_dtstart}
                    onChange={(newValue) => props.setRRuleDtStart(newValue)}
                />
            </LocalizationProvider>
            <br /><br />

            <FormGroup aria-label="position" row>
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
                <FormControlLabel
                    control={<Checkbox checked={sunday} onChange={(e) => handleChangeWeekday(setSunday, 6, e.target.checked)} />}
                    label="S"
                    labelPlacement="bottom"
                />
            </FormGroup>
            <br />

            <Typography id="input-slider" gutterBottom>
                Interval
            </Typography>
            <NumberInputBasic 
                placeholder="Interval"
                value={props.rrule_interval}
                min={1}
                max={999}
                setValue={props.setRRuleInterval}
            />
        </div>
    );
}