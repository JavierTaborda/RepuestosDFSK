// components/CustomSelect.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomSelect = ({ label, value, onChange, options, displayField, keyField, valueField, labelId, ...rest }) => {
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
                <MenuItem key="all" value="">
                    <em>Todos</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option[keyField]} value={option[valueField]}>
                        {option[displayField]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;
