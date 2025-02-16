import React from 'react';

export default function TabYearly(props) {

    return (
        <div
            role="tabpanel"
            hidden={props.tabValue !== 3}
            id="tabpanel-yearly"
            aria-labelledby="tab-yearly"
        >
            yearly
        </div>
    );
}