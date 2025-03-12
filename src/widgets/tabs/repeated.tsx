import React from 'react';

import { Divider } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabDaily from './tab_daily.tsx';
import TabWeekly from './tab_weekly.tsx';
import TabMonthly from './tab_monthly.tsx';
import TabYearly from './tab_yearly.tsx';


export function TabsRepeated(props) {

    // const repeatedRule = new RepeatedRule(props.repeatedRule, props.setRepeatedRule);
    console.log("Page repeated:", props.repeatedRule);

    const [tabValue, setTabValue] = React.useState(props.repeatedRule.getTabValue());

    const handleChangeTabValue = (event: React.SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
        props.repeatedRule.setFreq(3 - newTabValue);
    };

    return (
        <>
            <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="repeated tabs">
                <Tab label="Daily" id="tab-daily" />
                <Tab label="Weekly" id="tab-weekly" />
                <Tab label="Monthly" id="tab-monthly" />
                <Tab label="Yearly" id="tab-yearly" />
            </Tabs>
            <br />

            <TabDaily 
                tabValue={tabValue}
                repeatedRule={props.repeatedRule}
            />
            <TabWeekly 
                tabValue={tabValue}
                repeatedRule={props.repeatedRule}
            />
            <TabMonthly 
                tabValue={tabValue}
                repeatedRule={props.repeatedRule}
            />
            <TabYearly 
                tabValue={tabValue}
                repeatedRule={props.repeatedRule}
            />

            <br />
            <Divider />
        </>
    );
}