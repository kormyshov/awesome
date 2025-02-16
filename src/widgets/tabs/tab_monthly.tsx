import React from 'react';

export default function TabMonthly(props) {

    return (
        <div
            role="tabpanel"
            hidden={props.tabValue !== 2}
            id="tabpanel-monthly"
            aria-labelledby="tab-monthly"
        >
            monthly
        </div>
    );
}