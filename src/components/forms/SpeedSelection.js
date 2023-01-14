import React from 'react';

import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';

export default function SpeedSelection({ formLabel, values, currentValue, labels, onChange }) {
	return (
		<div className='container-small' style={{backgroundColor: '#bebebe', padding: '1em 1em'}}>
			<FormControl>
				<FormLabel>{formLabel}</FormLabel>
				<RadioGroup row value={currentValue} onChange={onChange}>
					{values.map((value, index) => (
						<FormControlLabel
							key={`${value}_${index}`}
							value={value}
							control={<Radio />}
                            label={labels[index]}
                            aria-label="Platform"
                            labelPlacement="top"
							size="small"
						/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	);
}