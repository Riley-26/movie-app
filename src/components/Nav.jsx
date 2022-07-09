import React from 'react'
import { Link } from 'react-router-dom';
import "../Nav.css"
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

function Nav() {
  return (
    <nav>
        <figure className="nav__logo--wrapper">
            <MovieCreationIcon fontSize='large' className='nav__logo'/>
            <span className="nav__logo--name">FilmFinder</span>
        </figure>
        <ul className="nav__links">
            <li className="nav__link">
                <Link to="/" className="black">Home</Link>
            </li>
            <li className="nav__link">
                <Link to="/Search" className="black">Search</Link>
            </li>
            <li className="nav__link">
                <button className="btn-nav__link">Contact</button>
            </li>
        </ul>
    </nav>
  )
}

export default Nav