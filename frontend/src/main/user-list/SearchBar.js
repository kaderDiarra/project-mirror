import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Paper, IconButton, InputBase, makeStyles } from '@material-ui/core'
import { BsSearch } from 'react-icons/bs'
import { CgCloseO } from 'react-icons/cg'
import { BiFilterAlt } from 'react-icons/bi'

import { valideSearchInput } from '../../utils'
import { searchClientReq } from '../../routes/route'
import { addUsers } from '../../redux/userSlice'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    errorTextColor: {
        color: 'red',
    },
    defaultTextColor: {
        color: 'currentColor'
    }
})

async function searchUsers (value, dispatch) {
    try {
        console.log('query og:', value)
        const result = await searchClientReq(value)
        console.log('result: ', result.data)
        dispatch(addUsers(result.data))
    } catch (error) {
        console.log(error)
    }
}

function SearchBar() {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleClickErase = () => {
        setValue('')
        searchUsers('', dispatch)
    }

    const handleChange = (e) => {
        const tmp = e.target.value

        setValue(tmp)
        setError('')
        if (tmp === '')
            searchUsers('', dispatch)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isSearchInputCorrect = valideSearchInput(value)

        setError(isSearchInputCorrect)
        if (isSearchInputCorrect !== '') {
            setValue('')
            return
        }

        searchUsers(value, dispatch)
    }

    return (
        <Paper component="form" className={classes.root} onSubmit={handleSubmit} id="search-bar-input-id">
            <div>
                <IconButton aria-label="search" type="submit" form="search-bar-input-id">
                    <BsSearch />
                </IconButton>
                <InputBase
                    className={ error !== '' ? classes.errorTextColor : classes.defaultTextColor}
                    name="searchBarInput"
                    onChange={handleChange}
                    value={value}
                    inputProps={{'aria-label': 'search user'}}
                    {...(error !== '' ? {placeholder: 'Invalid input'} : {placeholder: 'Search...'})}
                />
            </div>
            {

            }
            <div /*className={classes.searchBarRightIcons}*/>
                <IconButton aria-label="erase" onClick={handleClickErase}>
                    <CgCloseO />
                </IconButton>
                <IconButton aria-label="filter">
                    <BiFilterAlt />
                </IconButton>
            </div>
        </Paper>
    )
}

export default SearchBar