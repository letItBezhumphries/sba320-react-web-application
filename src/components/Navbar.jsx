import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h2 className='nav-header' style={{ marginLeft: '30px' }}>
        <Link to='/'>D&D Dungeon Builder</Link>
      </h2>
      <ul>
        <li className='nav-link characters-link'>
          <Link to='/characters'>Characters</Link>
        </li>
        <li className='nav-link monsters-link'>
          <Link to='/monsters'>Monsters</Link>
        </li>
        <li className='nav-link dungeons-link'>
          <Link to='/dungeons'>Dungeons</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
