import React from 'react';
import { Weekday } from 'rrule';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import NumberInputBasic from '../../features/number_input.tsx';


export default function TabYearly(props) {

    const [dateOrWeekday, setDateOrWeekday] = React.useState<string>(
        props.repeatedRule.getByweekday().length > 0 ? 
            props.repeatedRule.getByweekday()[0].weekday.toString() : 
            "day"
    );

    const handleChangeDateOrWeekday = (event: SelectChangeEvent) => {
        setDateOrWeekday(event.target.value);
        setRepeatedRule(nth, isFromStart, event.target.value, month);
    };

    const [month, setMonth] = React.useState<string>(
        props.repeatedRule.getBymonth().length > 0 ? 
            props.repeatedRule.getBymonthday()[0].toString() : 
            "1"
    );

    const handleChangeMonth = (event: SelectChangeEvent) => {
        setMonth(event.target.value);
        setRepeatedRule(nth, isFromStart, dateOrWeekday, event.target.value);
    };

    const [nth, setNth] = React.useState<number>(
        Math.abs(
            props.repeatedRule.getBymonthday().length > 0 ? 
                props.repeatedRule.getBymonthday()[0] : 
                props.repeatedRule.getByweekday().length > 0 ?
                    props.repeatedRule.getByweekday()[0].n :
                    1
        )
    );

    const handleChangeNth = (newValue: string) => {
        setNth(Number(newValue));
        setRepeatedRule(Number(newValue), isFromStart, dateOrWeekday, month);
    };

    const [isFromStart, setIsFromStart] = React.useState<string>(
        (
            props.repeatedRule.getBymonthday().length > 0 ? 
                props.repeatedRule.getBymonthday()[0] : 
                props.repeatedRule.getByweekday().length > 0 ?
                    props.repeatedRule.getByweekday()[0].n :
                    1
        ) > 0 ? "start" : "end"
    );

    const handleChangeIsFromStart = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
        if (newValue === null) {
            return;
        }
        setIsFromStart(newValue);
        setRepeatedRule(nth, newValue, dateOrWeekday, month);
    };

    const setRepeatedRule = (nth: number, isFromStart: string, dateOrWeekday: string, month: string) => {
        if (isFromStart === "end") {
            nth = -nth;
        }
        if (dateOrWeekday === "day") {
            props.repeatedRule.setBymonthday([nth]);
        } else {
            props.repeatedRule.setByweekday([new Weekday(Number(dateOrWeekday), nth)]);
        }
        props.repeatedRule.setBymonth([Number(month)]);
    };

    return (
        <div
            role="tabpanel"
            hidden={props.tabValue !== 3}
            id="tabpanel-yearly"
            aria-labelledby="tab-yearly"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <DatePicker 
                    label="Start date"
                    value={props.repeatedRule.getDtstart()}
                    onChange={(newValue) => props.repeatedRule.setDtstart(newValue)}
                />
            </LocalizationProvider>
            <br /><br />
            <Typography id="input-slider-nth" gutterBottom>
                The
            </Typography>
            <NumberInputBasic 
                placeholder="Nth"
                value={nth}
                min={1}
                max={999}
                setValue={handleChangeNth}
            />
            <Typography id="input-th" gutterBottom sx={{"padding-top": "10px", "padding-left": "180px"}}>
                { nth == 1 ? "st" : nth == 2 ? "nd" : nth == 3 ? "rd" : "th"}

                <FormControl variant="standard" sx={{ m: 1, width: "120px", marginTop: "0px"}}>
                    <Select
                        labelId="date_or_weekday_select-label"
                        id="date_or_weekday_select"
                        value={dateOrWeekday}
                        onChange={handleChangeDateOrWeekday}
                        label="Date or weekday"
                        sx={{"margin-left": "10px", "margin-top": "-3px"}}
                    >
                        <MenuItem value="day">
                            Day
                        </MenuItem>
                        <MenuItem value="0">
                            Monday
                        </MenuItem>
                        <MenuItem value="1">
                            Tuesday
                        </MenuItem>
                        <MenuItem value="2">
                            Wednesday
                        </MenuItem>
                        <MenuItem value="3">
                            Thursday
                        </MenuItem>
                        <MenuItem value="4">
                            Friday
                        </MenuItem>
                        <MenuItem value="5">
                            Saturday
                        </MenuItem>
                        <MenuItem value="6">
                            Sunday
                        </MenuItem>
                    </Select>
                </FormControl>
            </Typography>
            <ToggleButtonGroup
                value={isFromStart}
                exclusive
                onChange={handleChangeIsFromStart}
                aria-label="from"
            >
                <ToggleButton value="start" aria-label="start">
                    from start
                </ToggleButton>
                <ToggleButton value="end" aria-label="end">
                    from end
                </ToggleButton>
            </ToggleButtonGroup>
            <br /><br />
            <Typography id="input-slider-month" gutterBottom>
                of

                <FormControl variant="standard" sx={{ m: 1, width: "120px", marginTop: "0px"}}>
                    <Select
                        labelId="date_or_weekday_select-label"
                        id="date_or_weekday_select"
                        value={month}
                        onChange={handleChangeMonth}
                        label="Date or weekday"
                        sx={{"margin-left": "10px", "margin-top": "-3px"}}
                    >
                        <MenuItem value="1">
                            January
                        </MenuItem>
                        <MenuItem value="2">
                            February
                        </MenuItem>
                        <MenuItem value="3">
                            March
                        </MenuItem>
                        <MenuItem value="4">
                            April
                        </MenuItem>
                        <MenuItem value="5">
                            May
                        </MenuItem>
                        <MenuItem value="6">
                            June
                        </MenuItem>
                        <MenuItem value="7">
                            July
                        </MenuItem>
                        <MenuItem value="8">
                            August
                        </MenuItem>
                        <MenuItem value="9">
                            September
                        </MenuItem>
                        <MenuItem value="10">
                            October
                        </MenuItem>
                        <MenuItem value="11">
                            November
                        </MenuItem>
                        <MenuItem value="12">
                            December
                        </MenuItem>
                    </Select>
                </FormControl>
            </Typography>

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
            <Typography id="input-years" gutterBottom sx={{"padding-top": "10px", "padding-left": "200px"}}>
                year(s)
            </Typography>
        </div>
    );
}