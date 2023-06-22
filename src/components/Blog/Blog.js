import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { getBlog, likeBlog } from '../../features/Blogs/blogSlice';
import { getUsers } from '../../features/Users/userSlice';


const Blog = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getBlog(id)).unwrap().catch((err) => {
      showError(err.message);
    })
  }, [dispatch, id])

  const blog = useSelector((state) => state.blogs.entities.find((blog) => (blog._id === id)))
  const user = useSelector((state) => state.users.userData?.user);
  const users = useSelector((state) => state.users.entities);

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

        {blog ? (
          <div className='blog'>
            <h1>{blog.title}</h1>
            <span className='blog-author'>{users.find((user) => (user._id === blog.author)).name} | {blog.createdAt.substring(0, 10)} </span>

            <div className='img'>
              <img src={blog.img} alt={blog.title} />
            </div>

            <div className='blog-info'>
              <span className='blog-genre'><b>Genre: </b>{blog.genre}</span>
              <span className='blog-like' onClick={() => { dispatch(likeBlog(blog._id)).unwrap().catch((err) => { showError(err.message) }) }} >
                &nbsp;|&nbsp;{blog.likes.findIndex((userId) => userId === user?._id) === -1 ? 'Like' : 'Unlike'} • <FontAwesomeIcon icon={blog.likes.findIndex((userId) => userId === user?._id) !== -1 ? faHeartSolid : faHeart} style={blog.likes.findIndex((userId) => userId === user?._id) !== -1 && { color: '#AC3B61' }} /> {blog.likes.length}
              </span>

              <div className='blog-content'>
                {parse(blog.description)}
              </div>
            </div>


          </div>
        ) : ''}



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

export default Blog