import React from 'react'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { likeBlog } from '../../features/Blogs/blogSlice';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, showError, user, users }) => {

  const dispatch = useDispatch();

  return (
    <div className='blog-card'>
      <div className='img-box'>
        <img className='blog-img' alt={blog.title} src={blog.img} />
      </div>
      <div className='text-box'>
        <p className='blog-title' ><Link to={`/blogs/${blog._id}`} >{blog.title}</Link></p>
        <p className='blog-genre'><Link to={`search?title=&genre=${blog.genre}`}><b>Genre: </b>{blog.genre}</Link> </p>
        <p className='blog-author'>{users.find((user) => (user._id === blog.author)).name} | {blog.createdAt.substring(0, 10)}</p>
        <p className='blog-like' onClick={() => { dispatch(likeBlog(blog._id)).unwrap().catch((err) => { showError(err.message) }) }} >
          {blog.likes.findIndex((userId) => userId === user?._id) === -1 ? 'Like' : 'Unlike'} • <FontAwesomeIcon icon={blog.likes.findIndex((userId) => userId === user?._id) !== -1 ? faHeartSolid : faHeart} style={blog.likes.findIndex((userId) => userId === user?._id) !== -1 && { color: '#AC3B61' }} /> {blog.likes.length}
        </p>
      </div>
    </div>
  )
}

export default BlogCard