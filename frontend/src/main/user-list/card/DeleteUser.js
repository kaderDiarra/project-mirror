import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core'
import { HiOutlineTrash } from 'react-icons/hi'

import { deleteUserAsync } from '../../../redux/userSlice'

function DeleteUserDialog({ open, userId, handleClose }) {
    const dispatch = useDispatch()

    const ConfirmDeleteUser = async() => {
        dispatch(deleteUserAsync({ id: userId }))
        // if success send snackbar
        // close dialog
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">Are you sure ?</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    User will be removed from the app forever.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ConfirmDeleteUser} >Confirm</Button>
                <Button onClick={handleClose} >Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}


function DeleteUser({ userId }) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleOpen}>
                <HiOutlineTrash />
            </IconButton>
            <DeleteUserDialog open={open} userId={userId} handleClose={handleClose} />
        </div>
    )
}

DeleteUser.propTypes = {
    userId: PropTypes.string,
}

export default DeleteUser
