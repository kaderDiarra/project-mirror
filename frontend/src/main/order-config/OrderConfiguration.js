import React from 'react'
import { makeStyles } from '@material-ui/core'
import { AiOutlineSetting } from 'react-icons/ai'

import Controls from '../../components/controls/Controls'
import OrderConfigContainer from './OrderConfigContainer'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        //height: 500,
        //maxHeight: 800,
        height: 600,
        maxHeight: 800,
    }
})

function OrderConfiguration() {
    const classes = useStyles()

    return (
        <div className={classes.root} >
            <Controls.ComponentHeader
                title="Configuration"
                icon={<AiOutlineSetting  />}
                compoStyles={{
                    height: 60,
                    iconSize: 30,
                    textSize: 17,
                }}
            />
            <OrderConfigContainer />
        </div>
    )
}

export default OrderConfiguration
