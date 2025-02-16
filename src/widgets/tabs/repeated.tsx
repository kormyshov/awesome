import React from 'react';

import { Divider } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabDaily from './tab_daily.tsx';
import TabWeekly from './tab_weekly.tsx';
import TabMonthly from './tab_monthly.tsx';
import TabYearly from './tab_yearly.tsx';


export default function TabsRepeated(props) {

    return (
        <>
            <Tabs value={props.tabValue} onChange={props.handleChangeTabValue} aria-label="repeated tabs">
                <Tab label="Daily" id="tab-daily" />
                <Tab label="Weekly" id="tab-weekly" />
                <Tab label="Monthly" id="tab-monthly" />
                <Tab label="Yearly" id="tab-yearly" />
            </Tabs>
            <br />

            <TabDaily 
                tabValue={props.tabValue}
                rrule_dtstart={props.rrule_dtstart}
                setRRuleDtStart={props.setRRuleDtStart}
            />
            <TabWeekly 
                tabValue={props.tabValue}
            />
            <TabMonthly 
                tabValue={props.tabValue}
            />
            <TabYearly 
                tabValue={props.tabValue}
            />

            <br />
            <Divider />
        </>
    );
}