import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../Landing.css"
import SearchIcon from '@mui/icons-material/Search';

function Landing() {
    const [searchRes, setSearchRes] = useState([])
    sessionStorage.setItem("searchId", searchRes)

    return (
        <section id="landing">
            <h1 className="landing__title">The UK's most popular Movie and TV Show Look-Up service</h1>
            <h2 className="landing__sub-title">Guaranteed to find the best-suited movie/show for you</h2>
            <form className="search" method="get" action="">
                <input type="text" placeholder='Search "Name or Keyword"' className="searchbar" 
                onChange={(event) => setSearchRes(event.target.value)}/>
                <Link to="/Search"><SearchIcon className='search__img' /></Link>
            </form>
            <img src="undraw_home_cinema_l7yl (1).svg" alt="" className="landing__img" />
        </section>
    )
}

export default Landing