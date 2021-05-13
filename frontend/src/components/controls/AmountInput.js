import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormHelperText, TextField, InputAdornment } from '@material-ui/core'

function AmountInput({ name, helper, value, onChange, error=null, ...other }) {
    return (
        <FormControl variant="outlined">
          <FormHelperText id={`outlined-${name}-helper-text`}>{helper}</FormHelperText>
          <TextField
            name={name}
            label={error === '' ? null : error}
            variant="outlined"
            value={value}
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">USDT</InputAdornment>
            }}
            {...(error && {error: true})}
            {...other}
          />
        </FormControl>
    )
}

AmountInput.propTypes = {
    name: PropTypes.string,
    helper: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default AmountInput
