import React from 'react';

import { FormControl, MenuItem, Select } from '@mui/material';
import { CustomSelectItemType, CustomSelectType } from '../../types/ui';

export const CustomSelectItem: CustomSelectItemType = ({theme, children, ...props}) => {
    return (
        <MenuItem sx={{
            backgroundColor: theme.secondaryBackground,
            color: theme.main,
            ':hover': {
                backgroundColor: theme.background
            },
            

        }} {...props}>{children}</MenuItem>
    );
};

export const CustomSelect: CustomSelectType = ({theme, children, ...props}) => {
    
    return (
        <FormControl size='small' variant='outlined'>
        <Select
            labelId="pages-select"
            {...props}
            MenuProps={{
                style: {
                    maxHeight: 300,
                },
                sx: {
                    "&& .Mui-selected": {
                        backgroundColor: theme.selected,
                    },
                    maxWidth: 100,
                   
                }
            }}
            sx={{backgroundColor: theme.secondaryBackground, color: theme.main, border: theme.border}}
        >
            {children}
        </Select>
    </FormControl>
    );
};


