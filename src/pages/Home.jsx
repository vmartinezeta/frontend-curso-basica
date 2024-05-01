import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
    return <div className="app">
        <Navbar />
        <div className="welcome">
            <h1 className="welcome__title">
                Home
            </h1>
        </div>
    </div>
}

export default Home