import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import OrderConfigContent from './OrderConfigContent'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#F0F0F0',
        borderRadius: '0px 0px 4px 4px',
        height: '100%',
        width: '100%',
    },
})

function OrderConfigContainer() {
    const classes = useStyles()

    return (
        <Paper className={classes.root} >
            <OrderConfigContent />
        </Paper>
    )
}

export default OrderConfigContainer
