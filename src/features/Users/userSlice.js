import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import * as api from '../../api/index';

const initialState = {
    entities: [],
    userData: JSON.parse(localStorage.getItem('profile')),
    err: '',
}

export const getUsers = createAsyncThunk('users/getUsers', async (id, thunkAPI) => {
    try {
        const { data } = await api.getUsers();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const signup = createAsyncThunk('users/signup', async (formData, thunkAPI) => {
    try {
        const { data } = await api.signup(formData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const signin = createAsyncThunk('users/signin', async (formData, thunkAPI) => {
    try {
        const { data } = await api.signin(formData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        signout(state, action) {
            state.userData = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.entities = action?.payload;
                state.err = '';
            })
            .addCase(signin.fulfilled, (state, action) => {
                localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
                state.userData = action?.payload;
                state.err = '';
            })
            .addCase(signin.rejected, (state, action) => {
                state.err = action?.payload.message;
            })
            .addCase(signup.fulfilled, (state, action) => {
                localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
                state.userData = action?.payload;
                state.err = '';
            })
            .addCase(signup.rejected, (state, action) => {
                state.err = action?.payload.message;
            })
    },
})

export const { signout } = userSlice.actions;
export default userSlice.reducer;