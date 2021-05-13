import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    root: (props) => ({
        backgroundColor: '#383A47',
        height: props.height,
        borderRadius: '4px 4px 0px 0px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px 0px 20px'
    }),
    icon: props => ({
        fontSize: props.iconSize,
        color: '#C9CAD4',
    }),
    text: props => ({
        color: '#C9CAD4',
        fontSize: props.textSize,
        fontWeight: 600
    })
})

function ComponentHeader({ children, compoStyles, title, icon }) {
    const classes = useStyles(compoStyles)

    return (
        <Paper className={classes.root} elevation={0} >
            <Typography className={classes.text}>{title}</Typography>
            <div className={classes.icon}>
                {icon}
            </div>
        </Paper>
    )
}

export default ComponentHeader
