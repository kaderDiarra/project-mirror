import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
    name: 'account',
    initialState: {},
    reducers: {
        accountLogin: (state, action) => {
            state = { ...action.payload?.user }
            return state
        },
        accountLogout: (state, action) => {
            window.localStorage.clear()
        }
    }
})

export const { accountLogin, accountLogout} = accountSlice.actions
export default accountSlice.reducer