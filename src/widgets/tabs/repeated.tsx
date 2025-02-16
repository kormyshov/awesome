import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function TabsRepeated(props) {

    return (
        <>
            <Tabs value={props.tabValue} onChange={props.handleChangeTabValue} aria-label="repeated tabs">
                <Tab label="Daily" id="tab-daily" />
                <Tab label="Weekly" id="tab-weekly" />
                <Tab label="Monthly" id="tab-monthly" />
                <Tab label="Yearly" id="tab-yearly" />
            </Tabs>

            <div
                role="tabpanel"
                hidden={props.tabValue !== 0}
                id="tabpanel-daily"
                aria-labelledby="tab-daily"
            >
                daily
            </div>
            <div
                role="tabpanel"
                hidden={props.tabValue !== 1}
                id="tabpanel-weekly"
                aria-labelledby="tab-weekly"
            >
                in progress
            </div>
            <div
                role="tabpanel"
                hidden={props.tabValue !== 2}
                id="tabpanel-monthly"
                aria-labelledby="tab-monthly"
            >
                in progress
            </div>
            <div
                role="tabpanel"
                hidden={props.tabValue !== 3}
                id="tabpanel-yearly"
                aria-labelledby="tab-yearly"
            >
                in progress
            </div>
        </>
    );
}