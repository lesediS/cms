import { TextField } from '@mui/material';
import React from 'react';

const InlineEdit = ({ value, setValue }) => {
    const [editingValue, setEditingValue] = React.useState(value);
    const onChange = (event) => setEditingValue(event.target.value);

    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur();
        }
    };

    const onBlur = (event) => {
        if (event.target.value.trim() === "") {
            setEditingValue(value);
        } else {
            setValue(event.target.value);
        }
    };

    return (
        <TextField
            type='text'
            aria-label='Field name'
            title='Name'
            placeholder='Name'
            value={editingValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            sx={{ width: 'auto' }}
        />
    );
};

export default InlineEdit;