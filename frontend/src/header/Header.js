import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { verifyTokenReq } from '../routes/route'

function Header() {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation

    useEffect(() => {
        const asyncFunc = async () => {
            try {
                await verifyTokenReq()
            } catch (error) {
                console.log(error)
                //dispatch(accountLogout())
                history.push('/login')
            }}
        asyncFunc()
    }, [location, history])

    const handleClick = async () => {

    }

    return (
        <div>
            <button onClick={handleClick}>
                Header
            </button>
        </div>
    )
}

export default Header
