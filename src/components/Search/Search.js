import React, { useEffect } from 'react'
import BlogCard from '../Blog/BlogCard'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getBlogs } from '../../features/Blogs/blogSlice';
import { getUsers } from '../../features/Users/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();

    const blogs = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.users.userData?.user);
    const users = useSelector((state) => state.users.entities);

    const title = query.get('title')
    const genre = query.get('genre')

    useEffect(() => {
        dispatch(getBlogs());
        dispatch(getUsers());
    }, [dispatch])

    const filterBlogs = () => {
        if (!genre && !title)
            navigate('/')

        if (genre && title)
            return blogs.entities.filter((blog) => blog.genre === genre && blog.title.includes(title))

        if (genre)
            return blogs.entities.filter((blog) => blog.genre === genre)

        if (title)
            return blogs.entities.filter((blog) => blog.title.includes(title))
    }

    const showError = (message) => {
        toast.error(message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark"
        })
    }

    return (
        <main>
            <div className='container'>
                <div className='blog-cards'>
                    <p className='blog-cards-title'>Search Results</p>
                    {blogs.entities.length === 0 ? <p>No Blogs Found.</p> : filterBlogs()?.map((blog) => (
                        <BlogCard users={users} user={user} showError={showError} key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </main>
    )
}

export default Search