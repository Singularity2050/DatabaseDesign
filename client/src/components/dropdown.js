import React from 'react';

import CustomDropdown from '../utils/CustomDropdown';
import Badge from '../utils/Badge';

export default function Dropdown(){
    return (
        <div>
            <CustomDropdown
                buttonText="COURSE"
                dropdownList={[
                    "CSE",
                    "MEC",
                    "TSM",
                    {divider: true},
                    "AMS",
                    {divider: true},
                    "BUS",
                    "FIT",
                    "FDM"
                ]}
            />
        </div>
    );
}