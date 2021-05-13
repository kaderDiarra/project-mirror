import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

function Input({ name, label, value, onChange, error=null, ...other }) {
    return (
        <TextField
            name={name}
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            {...(error && {error: true, helperText: error})}
            {...other}
        />
    )
}

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    //error: PropTypes.,
    onChange: PropTypes.func,
}
export default Input
