import { createSlice } from '@reduxjs/toolkit'

const selectedUsersSlice = createSlice({
    name: 'selectedUsers',
    initialState: [],
    reducers: {
        selectUser: (state, action) => {
            if (!state.includes(action.payload.id))
                state.push(action.payload.id)
        },
        unselectUser: (state, action) => {
            return state.filter(id => action.payload.id !== id)
        },
        selectAllUser: (state, action) => {
            return [...action.payload]
        },
    }
})

export const { selectUser, unselectUser, selectAllUser } = selectedUsersSlice.actions
export default selectedUsersSlice.reducer