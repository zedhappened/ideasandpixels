import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import * as api from '../../api/index';

const initialState = {
    entities: [],
    err: '',
}

export const getBlogs = createAsyncThunk('blogs/getBlogs', async () => {
    try {
        const { data } = await api.getBlogs();
        return data;
    } catch (error) {
        console.log(error);
    }
})
export const getBlog = createAsyncThunk('blogs/getBlog', async (id, thunkAPI) => {
    try {
        const { data } = await api.getBlog(id);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const createBlog = createAsyncThunk('blogs/createBlog', async (formData, thunkAPI) => {
    try {
        const { data } = await api.createBlog(formData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const likeBlog = createAsyncThunk('blogs/likeBlog', async (id, thunkAPI) => {
    try {
        const { data } = await api.likeBlog(id);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.fulfilled, (blogs, action) => {
                blogs.entities = action.payload;
                blogs.err = '';
            })
            .addCase(getBlog.fulfilled, (blogs, action) => {
                const blog = action.payload;
                const index = blogs.entities.findIndex((b) => b._id === blog._id);
                if (index === -1) {
                    blogs.entities = [...blogs.entities, blog]
                }
                blogs.err = '';
            })
            .addCase(likeBlog.fulfilled, (blogs, action) => {
                const { id, userId } = action.payload;

                const blog = blogs.entities.find((blog) => (blog._id === id))

                const index = blog.likes.findIndex((id) => id === userId);

                if (index === -1) {
                    blog.likes.push(userId);
                } else {
                    blog.likes = blog.likes.filter((id) => id !== userId);
                }

                blogs.entities = blogs.entities.map((b) => b._id === id ? blog : b)
            })
            .addCase(createBlog.fulfilled, (blogs, action) => {
                blogs.entities = [...blogs.entities, action.payload]
                blogs.err = '';
            })
            .addCase(createBlog.rejected, (blogs, action) => {
                blogs.err = action?.payload;
            })
    },
})

export default blogSlice.reducer;