import React from 'react';
import "./Home.css";
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <div className='home-container'>
      <div className="home-sidebar">
        <Sidebar />
      </div>
      <div className="home-navbar">
        <Navbar />
      </div>
    </div>
  )
}

export default Home;
