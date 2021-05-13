import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHistoryReq } from '../routes/route'

export const getHistoryAsync = createAsyncThunk(
    'history/getHistory',
    async () => {
        try {
            const result = await getHistoryReq()
            return ({history: result.data})
        } catch (error) {
            console.log(error)
        }
    }
)

export const historySlice = createSlice({
    name: 'history',
    initialState: [{data: [], info: {}}],
    reducers: {
        addNewHistory: (state, action) => {
            state.push(action.payload)
        },
        deleteHistory: (state, action) => {
            const index = state.findIndex(user => user._id === action.payload._id)
            if (index >= 0)
                state.splice(index, 1)
            //return state.filter(user => user._id !== action.payload.id)
        },
    },
    extraReducers: {
        [getHistoryAsync.fulfilled]: (state, action) => action.payload?.history,
    }
})

export const { addNewHistory, deleteHistory } = historySlice.actions

export default historySlice.reducer
