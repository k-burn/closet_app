import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/manageGarments">
            Manage Garments
          </Link>
        </li>
        <li>
          <Link to="/mixNMatch">
            Mix 'n Match'
          </Link>
        </li>
        <li>
          <Link to="/dressMe">
            Dress Me
          </Link>
        </li>
        <li>
          <Link to="/outfitGallery">
            Outfit Gallery
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
