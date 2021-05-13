import React from 'react'
import PropTypes from 'prop-types'
import {Select as MuiSelect} from '@material-ui/core'
import { makeStyles, FormControl, MenuItem, InputLabel } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }))


function Select({ items, selectTitle=null, onChange, value, ...other}) {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{selectTitle}</InputLabel>
        <MuiSelect
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={onChange}
          label={selectTitle}
          {...other}
        >
            {
                items.map((item, index) => {
                    return <MenuItem key={`key-${item}-${index}`} id={`select-${item}`} value={item}>{item}</MenuItem>
                })
            }
        </MuiSelect>
      </FormControl>
    )
}

Select.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectTitle: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default Select
