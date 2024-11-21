
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomSelect = ({ label, value, onChange, options, displayField, displayExtra, keyField, valueField, labelId, textinicial, ...rest }) => {
    const inputProps = { 'aria-label': `${label} select` };

    return (
        <FormControl {...rest}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                value={value}
                onChange={onChange}
                label={label}
                inputProps={inputProps}
            >
                {(textinicial ? <MenuItem value="">{textinicial}</MenuItem> :
                <MenuItem key="all" value="">
                    <em>Todos</em>
                </MenuItem>)}
                {options.map((option) => (
                    <MenuItem key={option[keyField]} value={option[valueField]}>
                        {option[displayField]} {displayExtra && <em style={{ paddingLeft: '10px',color: '#a8a8a8' }}> { option[displayExtra]}</em>}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    );
};

export default CustomSelect;
