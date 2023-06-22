import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getBlogs } from '../../features/Blogs/blogSlice';
import { getUsers } from '../../features/Users/userSlice';
import BlogCard from '../Blog/BlogCard';
import BlogCardSm from '../Blog/BlogCardSm';

const Home = () => {

  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users.userData?.user);
  const users = useSelector((state) => state.users.entities);

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getUsers());
  }, [dispatch])

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
        <div className='col-8'>

          <div className='blog-cards'>
            <p className='blog-cards-title'>Latest Blogs</p>
            {blogs.entities.length === 0 ? <p>No Blogs Found.</p> : [...blogs.entities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((blog) => (
              <BlogCard users={users} user={user} showError={showError} key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
        <div className='col-2'>
          <div className='blog-cards-sm'>
            <p className='blog-cards-sm-title'>Featured Blogs</p>
            {[...blogs.entities].sort((a, b) => b.likes.length - a.likes.length).map((blog) => (
              <BlogCardSm key={blog._id} blog={blog} />
            ))}

          </div>
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

export default Home