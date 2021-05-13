import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Card, IconButton, Chip, makeStyles } from '@material-ui/core'
import { HiOutlineTrash } from 'react-icons/hi'
import { MONTHS } from '../../constant/constants'

import HistoryCardDialog from './HistoryCardDialog'
import { deleteHistory } from '../../redux/history'
import { deleteHistoryReq } from '../../routes/route'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
        width: '100%',
        justifyContent: 'space-between',
        padding: '2px 7px 2px 7px',
    },
    chipContainer: {
        display: 'grid',
        position: 'relative',
        height: 'auto',
        gridTemplateColumns: 'repeat(2, auto)',
        cursor: 'pointer',
    },
    chip: {
        backgroundColor: '#F8F8FB',
        margin: 5
    }
})

const formatDate = (time) => {
    const newTime = new Date(time)
    const month = MONTHS[newTime.getMonth()]
    const day = newTime.getDate()
    const hours = newTime.getHours()
    const minutes = newTime.getMinutes()
    return (`${month} ${day} - ${hours}:${minutes}`)
}

function HistoryCard({ history }) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { successQuantity, side, symbol } = history.info
    const time = formatDate(history?.info?.time)

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveHistory = async (_id) => {
        console.log('history id: ', _id)
        try {
            const result = await axios.delete(`history/delete/${_id}`)//deleteHistoryReq(_id)
            if (result.data)
                dispatch(deleteHistory({_id}))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.chipContainer} onClick={handleOpen}>
                    <Chip className={classes.chip} size="small" label={time}/>
                    <Chip className={classes.chip} size="small" label={`${successQuantity?.successful} / ${successQuantity?.total}`}/>
                    <Chip className={classes.chip} size="small" label={symbol}/>
                    <Chip className={classes.chip} size="small" label={side}/>
                </div>
                <div>
                    <IconButton aria-label="delete-history-button" onClick={() => handleRemoveHistory(history._id)}>
                        <HiOutlineTrash />
                    </IconButton>
                </div>
            </Card>
            <HistoryCardDialog
                open={open}
                handleClose={handleClose}
                history={history}
            />
        </div>
    )
}

HistoryCard.propTypes = {
    history: PropTypes.object.isRequired
}

export default HistoryCard

/**
 * <CardContent>
                Card
            </CardContent>
            <CardActions>
                <IconButton aria-label="profil-detail">
                    <HiOutlineTrash />
                </IconButton>
            </CardActions>
 */