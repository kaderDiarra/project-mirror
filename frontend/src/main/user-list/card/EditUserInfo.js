import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { FiEdit } from 'react-icons/fi'

import { updateUserReq } from '../../../routes/route'
import { updateUser } from '../../../redux/userSlice'
import Controls from '../../../components/controls/Controls'
import compareOldAndNewValues from '../../../utils/cmp-old-new-values'

function EditUserInfo({ user }) {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSubmit = async({ e, values, user, validate }) => {
        e.preventDefault()
        // if success send snackbar
        if (!validate('edit')) {
            console.log('invalid form')
            return
        }
        try {
            const newValue = compareOldAndNewValues(user, values, ['_id'])
            console.log("user: ", user)
            console.log("values: ", values)
            console.log("newValues: ", newValue)
            const result = await updateUserReq(newValue._id, {
                firstName: newValue.firstName,
                lastName: newValue.lastName,
                email: newValue.email,
                description: newValue.description,
                picture: newValue.picture,
                apiKey: newValue.apiKey,
                secretKey: newValue.secretKey,
            })
            if (result) {
                dispatch(updateUser({...result.data}))
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleOpen}>
                <FiEdit />
            </IconButton>
            {/*<EditUserDialog open={open} user={user} handleClose={handleClose} />*/}
            <Controls.DialogForm
                user={{...user, apiKey: "", secretKey: "",}}
                title={'Edit User Information'}
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                formId="edit-dialog-form"
            />
        </div>
    )
}

EditUserInfo.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        picture: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string,
    })
}

export default EditUserInfo
