import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'

import { createUserReq } from '../../routes/route'
import { addOneUser } from '../../redux/userSlice'
import Controls from '../../components/controls/Controls'

function CreateUser() {
    const user = {
        firstName: "",
        lastName: "",
        description: "",
        email: "",
        picture: "",
        apiKey: "",
        secretKey: "",
    }

    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSubmit = async ({ e, values, validate }) => {
        e.preventDefault()
        // if success send snackbar
        if (!validate('create'))
            return
        try {
            const result = await createUserReq({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                description: values.description,
                picture: values.picture,
                apiKey: values.apiKey,
                secretKey: values.secretKey,
            })
            if (result) {
                dispatch(addOneUser(result.data))
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                Create New User
            </Button>
            <Controls.DialogForm
                user={user}
                title={'Create New Client'}
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                formId="create-user-dialog-form"
            />
        </div>
    )
}

export default CreateUser
