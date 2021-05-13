import React from 'react'
import { Paper, makeStyles } from '@material-ui/core'

import SearchBar from './SearchBar'
import ListContainer from './ListContainer'

const useStyles = makeStyles({
    paperContainer: {
        width: '600px',
        height: 800,
        backgroundColor: '#F0F0F0'
    },
    searchBar: {
        width: 'auto',
        height: 50,
        backgroundColor: 'red'
    }
})

function UserList() {
    const classes = useStyles()

    return (
        <Paper className={classes.paperContainer}>
            <SearchBar />
            <ListContainer/>
        </Paper>
    )
}

export default UserList
