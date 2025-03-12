import React from 'react';

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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <DatePicker 
                    label="Start date"
                    value={props.repeatedRule.getDtstart()}
                    onChange={(newValue) => props.repeatedRule.setDtstart(newValue)}
                />
            </LocalizationProvider>
            <br /><br />

            <Typography id="input-every" gutterBottom>
                Every
            </Typography>
            <NumberInputBasic 
                placeholder="Interval"
                value={props.repeatedRule.getInterval()}
                min={1}
                max={999}
                setValue={(newValue) => props.repeatedRule.setInterval(newValue)}
            />
            <Typography id="input-days" gutterBottom sx={{"padding-top": "10px", "padding-left": "200px"}}>
                day(s)
            </Typography>
        </div>
    );
}