import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { signin, signup } from '../../features/Users/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

	const initialState = {
		name: '',
		username: '',
		password: '',
	}

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialState);
	const [containerActive, setContainerActive] = useState(false)

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

	const handleSubmit = (e) => {

		if (formData.username.length < 4 || formData.username.length > 12)
			return showError('The length of Username should be between 4-12')

		if (formData.password.length < 6 || formData.password.length > 12)
			return showError('The length of Password should be between 6-12')

		containerActive
			? (
				(formData.name !== '' && formData.username !== '' && formData.password !== '')
					? dispatch(signup(formData)).unwrap().then(() => {
						navigate('/');
					}).catch((err) => {
						showError(err.message);
					})
					: showError('Field(s) Empty!')
			) : (
				(formData.username !== '' && formData.password !== '')
					? dispatch(signin(formData)).unwrap().then(() => {
						navigate('/');
					}).catch((err) => {
						showError(err.message);
					})
					: showError('Field(s) Empty!')
			);
	}

	return (
		<main>
			<div className='container '>
				<div className={`login-container ${containerActive && 'right-panel-active'}`}>
					<div className='form-container signin-container'>

						<h3>Sign In</h3>
						<input
							value={formData.username}
							onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }}
							type="text" placeholder="Username"
						/>
						<input
							onChange={async (e) => { setFormData({ ...formData, password: e.target.value }) }}
							type="password" placeholder="Password" />
						<button className='form-btn' onClick={handleSubmit}>Sign In</button>

						<div className='change-form'>
							<h3>Don't have an account?</h3>
							<button className='btn btn-primary' onClick={() => { setContainerActive(true) }}>Sign Up</button>
						</div>
					</div>
					<div className='form-container signup-container'>

						<h3>Sign Up</h3>
						<input
							value={formData.name}
							onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
							type="text" placeholder="Name" />

						<input
							value={formData.username}
							onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }}
							type="text" placeholder="Username" />

						<input
							value={formData.password}
							onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
							type="password" placeholder="Password" />

						<button className='form-btn' onClick={handleSubmit}>Sign Up</button>

						<div className='change-form'>
							<h3>Already have an account?</h3>
							<button className='btn btn-primary' onClick={() => { setContainerActive(false) }}>Sign In</button>
						</div>
					</div>

					<div className="overlay-container">
						<div className="overlay">
							<div className="overlay-panel overlay-left">
								<h3>Already have an account?</h3>
								<button className='btn btn-primary' onClick={() => { setContainerActive(false) }} >Sign In</button>
							</div>
							<div className="overlay-panel overlay-right">
								<h3>Don't have an account?</h3>
								<button className='btn btn-primary' onClick={() => { setContainerActive(true) }}>Sign Up</button>
							</div>
						</div>
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

export default Login