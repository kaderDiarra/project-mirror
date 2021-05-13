import React, { useState } from 'react'

export function useForm(initialFilledValues) {
    const [values, setValues] = useState(initialFilledValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({...values, [name]: value })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    }
}

export function Form({ children, ...other }) {

    return (
        <form autoComplete="off" {...other}>
            {children}
        </form>
    )
}
