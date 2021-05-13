import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHistoryAsync } from '../../redux/history'
import { makeStyles } from '@material-ui/core'
import { AiOutlineHistory } from 'react-icons/ai'

import ComponentHeader from '../../components/controls/ComponentHeader'
import HistoryList from './HistoryList'

const useStyles = makeStyles({
    root: {},
})

function History() {
    const classes = useStyles()
    const histories = useSelector((state) => state.history)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHistoryAsync())
    }, [dispatch])

    console.log("history: ", histories)

    return (
        <div className={classes.root}>
            <ComponentHeader
                title="History"
                icon={<AiOutlineHistory  />}
                compoStyles={{
                    height: 50,
                    iconSize: 30,
                    textSize: 17,
                }}
            />
            <HistoryList histories={histories} />
        </div>
    )
}

export default History
