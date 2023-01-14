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
		<div className='container-small' style={{padding: '0 1em'}}>
			<FormControl>
				<FormLabel>{formLabel}</FormLabel>
				<RadioGroup 
					row
					value={currentValue}
					onChange={onChange}
					size="small"
					padding="0px"
				>
					<FormControlLabel value="500" label="0.25x" control={<Radio/>}/>
					<FormControlLabel value="450" label="0.5x" control={<Radio/>}/>
					<FormControlLabel value="300" label="1x" control={<Radio/>}/>
					<FormControlLabel value="150" label="1.5x" control={<Radio/>}/>
					<FormControlLabel value="100" label="0.25x" control={<Radio/>}/>
				</RadioGroup>
			</FormControl>
		</div>
	);
}