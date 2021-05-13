import React, { useState, useEffect } from 'react'
import PropTyes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Switch from '@material-ui/core/Switch'

import { selectUser, unselectUser, setCheckAllUsers } from '../../../redux/selectedUsersSlice'

function SelectUser({ userId, checkAllUsers , }) {
    const dispatch = useDispatch()
    const selectedUsers = useSelector((state) => state.selectedUsers)
    const [state, setState] = useState(false)

    useEffect(() => {
        if (checkAllUsers)
            setState(true)
        else
            setState(false)
    }, [checkAllUsers])

    const handleSwitchChange = (e) => {
        const value = e.target.checked

        console.log('value:', value)
        if (checkAllUsers) {
            setState(true)
            return
        }
        if (value) {
            dispatch(selectUser({ id: userId }))
        } else {
            dispatch(unselectUser({id: userId }))
        }

        setState(prev => !prev)
    }

    return (
        <Switch
            edge="end"
            onChange={handleSwitchChange}
            checked={state}
        />
    )
}

SelectUser.propTypes = {
    userId: PropTyes.string.isRequired,
    checkAllUsers: PropTyes.bool.isRequired,
    setCheckAllUsers: PropTyes.func.isRequired,
}

export default SelectUser
