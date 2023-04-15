import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'

const Header = () => {
  return (
    <div className='header'>
      <Link to='/'>home</Link>
      <Link to='/login'> Login</Link>
      <Link to='/regiester'>Regiester </Link>
    </div>
  );
};

export default Header;