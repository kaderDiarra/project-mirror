import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import historyReducer from './history'
import accountSlice from './account'
import selectedUsersReducer from './selectedUsersSlice'

export default configureStore({
    reducer: {
        users: userReducer,
        selectedUsers: selectedUsersReducer,
        history: historyReducer,
        account: accountSlice,
    },
})