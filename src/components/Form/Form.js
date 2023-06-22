import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createBlog } from '../../features/Blogs/blogSlice';

const Form = () => {

  const initialState = {
    title: '',
    img: '',
    description: '',
    genre: '',
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    if (formData.title !== '' && formData.img !== '' && formData.description !== '' && formData.genre !== '') {
      dispatch(createBlog(formData)).unwrap().then(() => {
        navigate('/')
      }).catch((err) => {
        showError(err.message);
      });
    } else {
      setErrorMessage('Field(s) Empty');
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <main>
      <div className='container'>
        <div className='create-blog-form'>
          <h1>Create a Blog</h1>

          <div className='input-group'>
            <span className='input-label'>Title: <br /></span>
            <input
              value={formData.title}
              onChange={(e) => { setFormData({ ...formData, title: e.target.value }); setErrorMessage('') }}
              className='input' type='text'
              placeholder='An Awesome Title' />
          </div>

          <div className='input-group'>
            <span className='input-label'>Thumbnail: <br /></span>
            <input
              type='file'
              onChange={async (e) => {
                const compressedFile = await imageCompression(e.target.files[0], {
                  maxSizeMB: 1,
                  maxWidthOrHeight: 1920
                });
                const base64 = await convertToBase64(compressedFile);
                setFormData({ ...formData, img: base64 });
                setErrorMessage('')
              }}
            />
          </div>

          <div className='input-group'>
            <span className='input-label'>Genre: <br /></span>
            <select value={formData.genre} className='input' onChange={(e) => { setFormData({ ...formData, genre: e.currentTarget.value }); setErrorMessage('') }}>
              <option value={''}>Select a Genre</option>
              <option value={'Sports'}>Sports</option>
              <option value={'Motorsports'}>Motorsports</option>
              <option value={'Travelling'}>Travelling</option>
              <option value={'Nature'}>Nature</option>
              <option value={'Food'}>Food</option>
              <option value={'Tech'}>Tech</option>
              <option value={'Music'}>Music</option>
              <option value={'Movies'}>Movies</option>
              <option value={'Literature'}>Literature</option>
            </select>
          </div>

          <div className='input-group'>
            <span className='input-label'>Content: <br /></span>
            <ReactQuill
              className='editor'
              placeholder='Enter your content here'
              value={formData.description}
              onChange={(data) => {
                setFormData({ ...formData, description: data });
                setErrorMessage('')
              }}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image'],
                ],
              }} />
          </div>

          <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
          <span className='error' >{errorMessage}</span>
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
    </main >
  )
}

export default Form