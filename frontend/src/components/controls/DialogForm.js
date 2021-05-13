import React from 'react'
import PropTypes from 'prop-types'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextareaAutosize,
} from '@material-ui/core'
import {useForm, Form } from '../useForm'
import Controls from '../controls/Controls'
import { valideNames, valideEmail, valideKeys, valideDescription, } from '../../utils/validateForm'


function EditForm({ values, formId, user, handleInputChange, errors, setErrors, handleSubmit }) {

    // Customize components
    // error verfication
    // input length
    // check keys
    const validate = (dialogType=null) => {
        let temp = {}
        temp.firstName = valideNames(values.firstName, 'first')
        temp.lastName = valideNames(values.lastName, 'last')
        temp.email = valideEmail(values.email)
        temp.description = valideDescription(values.description)
        temp.picture = values.picture ? "" : values.picture
        temp.apiKey = valideKeys(values.apiKey, 'api', dialogType)
        temp.secretKey = valideKeys(values.secretKey, 'secret', dialogType)
        setErrors({...temp})

        return (Object.values(temp).every(elem => elem === ""))
    }

    return (
        <Form onSubmit={(e) => handleSubmit({e, values, user, validate})} id={formId} >
            <Grid container>
                <Grid item xs={6} >
                    <Controls.Input
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                    <Controls.Input
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        name="picture"
                        label="picture"
                        value={values.picture}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6} >
                    <TextareaAutosize
                        aria-label="description"
                        name="description"
                        rowsMin={3}
                        placeholder="Description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="apiKey"
                        label="Api Key"
                        value={values.apiKey}
                        onChange={handleInputChange}
                        placeholder="***"
                        error={errors.apiKey}
                    />
                    <Controls.Input
                        name="secretKey"
                        label="Secret Key"
                        value={values.secretKey}
                        onChange={handleInputChange}
                        placeholder="***"
                        error={errors.secretKey}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}

function UserInfoFormDialog({ open, user, handleClose, handleSubmit, title, formId }) {

    const {values, errors, setErrors, handleInputChange} = useForm({
        ...user,
        apiKey: "",
        secretKey: "",
    })


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-dialog-title"
            aria-describedby="edit-dialog-description"
        >
            <DialogTitle id="edit-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <EditForm
                    user={user}
                    values={values}
                    formId={formId}
                    handleInputChange={handleInputChange}
                    errors={errors}
                    setErrors={setErrors}
                    handleSubmit={handleSubmit}
                />
            </DialogContent>
            <DialogActions>
                <Controls.Button
                    text="Save"
                    type="submit"
                    size="medium"
                    form={formId}
                    //onClick={() => handleSubmit(values)}
                />
                <Controls.Button
                    text="Cancel"
                    size="medium"
                    color="default"
                    onClick={handleClose}
                />
            </DialogActions>
        </Dialog>
    )
}


function DialogForm({ user, open, handleClose, handleSubmit, title, formId }) {
    return (
        <UserInfoFormDialog
            open={open}
            user={user}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            title={title}
            formId={formId}
        />
    )
}

DialogForm.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        picture: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string,
        apiKey: PropTypes.string,
        secretKey: PropTypes.string,
    }),
    title: PropTypes.string,
    formId: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
}

export default DialogForm
