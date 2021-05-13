import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

import Controls from '../../components/controls/Controls'
import HistoryRecapTable from './HistoryRecapTable'

/*const useStyles = makeStyles({
    root: {
    }
})*/

function HistoryCardDialog({ open, handleClose, history }) {
    //const classes = useStyles()

    return (
        <Dialog
                //className={classes.root}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="edit-dialog-title">History Details</DialogTitle>
                <DialogContent>
                    <HistoryRecapTable rows={history.data ?? []} />
                </DialogContent>
                <DialogActions>
                    <Controls.Button
                        text="Close"
                        size="small"
                        onClick={handleClose}
                    />
                </DialogActions>
        </Dialog>
    )
}

HistoryCardDialog.propTypes = {
    history: PropTypes.object.isRequired
}

export default HistoryCardDialog
