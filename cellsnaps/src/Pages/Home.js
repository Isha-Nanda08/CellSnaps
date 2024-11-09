// Home.js
import React, { useEffect } from 'react';
import '../Styles/Home.css';
import Header from '../components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from './About';
import Injection from '../components/Injection';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Header/>
      
      <div className='cellSnap'>
        <div className="container">
          <div className="balls-container">
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
          </div>
        </div>
        <div className='title typewriter'>
            <span>CellSnaps</span>
        </div>
        <Injection/>
      </div>
      <About/>
      <div className='main'>
        <form action="">
          <label htmlFor="myfile">Upload a file:</label>
          <br/>
          <input type="file" id="myfile" name="myfile" accept='image/*'/>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
      
    </>
  );
};

export default Home;
