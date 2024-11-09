import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';


import Header from '../Components/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from './About';
import Injection from '../Components/Injection';

const Home = () => {
  const [files, setFiles] = useState([]);

  // Initialize AOS (Animation on Scroll)
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle file input change
  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., uploading the files)
    console.log(files);
  };

  return (
    <>
      <Header />
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
        <Injection />
      </div>
      <About />

      <div className='main'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="myfile">Upload at least three files:</label>
          <br />
          <input
            type="file"
            id="myfile"
            name="myfile"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Home;
