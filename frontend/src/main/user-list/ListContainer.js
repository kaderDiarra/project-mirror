import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List, ListItem, makeStyles, Typography, Checkbox, FormControlLabel } from '@material-ui/core'

import { selectAllUser } from '../../redux/selectedUsersSlice'
import { getUsersAsync } from '../../redux/userSlice'
import UserCard from './card/UserCard'

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: '600px',
        position: 'relative',
        overflow: 'auto',
        maxHeight:  '700px',
    }
})

function ListContainer() {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const users = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getUsersAsync())
    }, [dispatch])

    const handleChange = (e) => {
        const value = e.target.checked
        setChecked(prev => !prev)
        if (value) {
            const usersId = users.map(user => user._id)
            dispatch(selectAllUser(usersId))
        } else {
            dispatch(selectAllUser([]))
        }
    }

    const classes = useStyles()
    return (
        <List className={classes.root}>
            <FormControlLabel
                checked={checked}
                onChange={handleChange}
                control={
                    <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }}/>
                }
                label="Select all"
                //labelPlacement="right"
            />
            {
                users?.length > 0 ?
                users.map(user => {
                return (
                    <ListItem key={user._id} >
                        <UserCard user={user} checkAllUsers={checked} setCheckAllUsers={setChecked}/>
                    </ListItem>
                )
            }) :
                <Typography>User not found</Typography>
            }
        </List>
    )
}

export default ListContainer
