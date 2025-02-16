import React from 'react';

export default function TabWeekly(props) {

    return (
        <div
            role="tabpanel"
            hidden={props.tabValue !== 1}
            id="tabpanel-weekly"
            aria-labelledby="tab-weekly"
        >
            weekly
        </div>
    );
}