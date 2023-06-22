import { configureStore } from '@reduxjs/toolkit'
import blogReducers from '../features/Blogs/blogSlice'
import userReducers from '../features/Users/userSlice'

export default configureStore({
    reducer: {
        blogs: blogReducers,
        users: userReducers,
    },
})