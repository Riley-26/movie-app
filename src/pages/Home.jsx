import React from 'react'
import Landing from '../components/Landing'
import Nav from '../components/Nav'
import "../Home.css"

function Home() {
  return (
    <div className="container">
        <div className="row">
            <Nav />
            <Landing />
        </div>
    </div>
  )
}

export default Home