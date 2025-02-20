import React from 'react';

import 'dayjs/locale/de';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';

import NumberInputBasic from '../../features/number_input.tsx';


export default function TabDaily(props) {

    return (
        <div
            role="tabpanel"
            hidden={props.tabValue !== 0}
            id="tabpanel-daily"
            aria-labelledby="tab-daily"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <DatePicker 
                    label="Start date"
                    value={props.rrule_dtstart}
                    onChange={(newValue) => props.setRRuleDtStart(newValue)}
                />
            </LocalizationProvider>
            <br /><br />

            <Typography id="input-every" gutterBottom>
                Every
            </Typography>
            <NumberInputBasic 
                placeholder="Interval"
                value={props.rrule_interval}
                min={1}
                max={999}
                setValue={props.setRRuleInterval}
            />
            <Typography id="input-days" gutterBottom sx={{"padding-top": "10px", "padding-left": "120px"}}>
                day(s)
            </Typography>
        </div>
    );
}