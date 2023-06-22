import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../features/Users/userSlice';


const Navbar = () => {

    const user = useSelector((state) => state.users.userData)
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    return (
        <>
            <div className="cover">
                <p className="title">
                    Ideas & Pixels
                </p>
                <p className="slogan">
                    Where Inspiration Meets Imagination, Ideas & Pixels Illuminate!
                </p>

            </div>
            <nav className="navbar">

                <span className='link dropdown-btn' ><FontAwesomeIcon icon={faBars} />&nbsp; Menu</span>

                <Link to={'/'} className="link">Home</Link >
                <Link to={'/genre'} className="link">Genre</Link >
                <Link to={'/create-blog'} className="link">Create a Post</Link>
                {user ? <span onClick={() => { dispatch(signout()) }} className='link'>Logout/{user.user.username}</span> : <Link to={'/login'} className="link">Login/Signup</Link>}

                <div className="search">

                    <input type="text" placeholder=" Search.." name="search" value={search} onChange={(e) => { setSearch(e.target.value) }} />

                    <Link onClick={()=>{setSearch('')}} to={`/search?title=${search}&genre=`}>
                        <FontAwesomeIcon icon={faSearch} className='search-button' />
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar;