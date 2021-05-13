import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getUsersReq, deleteUserReq } from '../routes/route'

export const getUsersAsync = createAsyncThunk(
    'users/getUsers',
    async () => {
        try {
            const response = await getUsersReq()
            console.log('users test: ', response)
            return { users: response.data } // payload
        } catch (error) {
            console.log(error)
            return { users: [] }
        }
    }
)

export const deleteUserAsync = createAsyncThunk(
    'users/deleteUser',
    async (payload) => {
        try {
            await deleteUserReq(payload.id)
            return { isDeleted: true, id: payload.id }
        } catch (error) {
            console.log(error)
            return { isDeleted: false, id: payload.id }
        }
    }
)

export const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addOneUser: (state, action) => {
            state.push(action.payload)
        },
        addUsers: (state, action) => {
            state = [...action.payload]
            return state
        },
        deleteUser: (state, action) => {
            const index = state.findIndex(user => user._id === action.payload)

            if (index >= 0)
                state.splice(index, 1)

            //return state.filter(user => user._id !== action.payload.id)
        },
        updateUser: (state, action) => {
            //const index = state.findIndex(user => user._id === action.payload._id)
            //if (index > -1)
            //    state[index] = {...action.payload}
            if (!action.payload)
                return state
            return (state.map(user => (user._id === action.payload._id) ? {...action.payload} : user))
        }
    },
    extraReducers: {
        [getUsersAsync.fulfilled]: (state, action) => {
            console.log('fetched data successfully !')
            return action.payload.users
        },
        [deleteUserAsync.fulfilled]: (state, action) => {
            if (action.payload.isDeleted) {
                return state.filter(user => user._id !== action.payload.id)
            }
            return state
        },
    }
})

export const { addOneUser, addUsers, deleteUser, updateUser } = userSlice.actions

export default userSlice.reducer
