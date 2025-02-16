import React from 'react';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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
        </div>
    );
}