import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const BlogCardSm = ({ blog }) => {
    return (
        <Link to={`/blogs/${blog._id}`}>
            <div className='blog-card-sm'>
                <img className='blog-sm-img' alt={blog.title} src={blog.img} />
                <p className='blog-sm-title' >{blog.title}</p>
                <p className='blog-sm-genre'>{blog.genre} &nbsp;| &nbsp; <FontAwesomeIcon icon={faHeart} /> {blog.likes.length}</p>
            </div>
        </Link>
    )
}

export default BlogCardSm