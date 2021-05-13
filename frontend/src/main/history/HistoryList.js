import React from 'react'
import PropTypes from 'prop-types'
import { Paper, List, ListItem, makeStyles } from '@material-ui/core'

import HistoryCard from './HistoryCard'

const useStyles = makeStyles({
    root: {
        //width: '100%',
        //position: 'relative',
        maxHeight: 600,
        overflow: 'auto',
        backgroundColor: '#F0F0F0',
    }
})

function HistoryList({ histories }) {
    const classes = useStyles()

    return (
        <Paper>
            <List className={classes.root}>
                { histories.length > 0 ?
                    histories.map(history => {
                    return (
                        <ListItem key={`list-item-${history._id}-key`} >
                            <HistoryCard history={history}/>
                        </ListItem>
                    )
                }) : null
                }
            </List>
        </Paper>
    )
}

HistoryList.propTypes = {
    histories: PropTypes.arrayOf(PropTypes.object)
}

export default HistoryList
