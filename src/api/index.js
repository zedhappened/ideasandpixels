import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    } else {
        req.headers.Authorization = ``;
    }

    return req;
})

export const getBlogs = () => API.get(`/blogs`);
export const getBlog = (id) => API.get(`/blogs/${id}`);
export const createBlog = (formData) => API.post(`/blogs`, formData);
export const likeBlog = (id) => API.patch(`/blogs/${id}`)

export const getUsers = () => API.get(`/users`);
export const signup = (formData) => API.post(`/users/signup`, formData);
export const signin = (formData) => API.post(`/users/signin`, formData);