import React from 'react';

import {
	FormControl,
	FormLabel,
	ToggleButton,
    ToggleButtonGroup
} from '@mui/material';

export default function AlgoSelection({ formLabel, values, currentValue, labels, onChange }) {
	return (
		<div className='container-small' style={{backgroundColor: '#bebebe', justifyContent: 'center'}}>
			<FormControl>
				<FormLabel>{formLabel}</FormLabel>
				<ToggleButtonGroup 
                    value={currentValue} 
                    onChange={onChange}
                    exclusive
                    aria-label="Algorithm"
					size="small"
                >
                    <ToggleButton value="Bubble Sort">Bubble Sort</ToggleButton>
                    <ToggleButton value="Insertion Sort">Insertion Sort</ToggleButton>
                    <ToggleButton value="Selection Sort">Selection Sort</ToggleButton>
				</ToggleButtonGroup>
			</FormControl>
		</div>
	);
}