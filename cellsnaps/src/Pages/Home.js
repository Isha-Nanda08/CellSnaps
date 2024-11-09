import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from '../api/axios';
import Header from '../Components/Header';
import Injection from '../Components/Injection';
import Report from '../Components/Report';
import About from './About';
const Home = () => {
  const [files, setFiles] = useState([]);
  const [gemini_res, setGeminiRes] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [input_ai, setInputAi] = useState("");

  // Initialize AOS (Animation on Scroll)
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle file input change
  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  // Handle form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(files);

    if (selectedFiles.length < 3) {
      alert("Please upload at least three files.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('http://127.0.0.1:5000/detect', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Processed Images:', data);
        let text = `RBC (Red Blood Cells) count: ${data.density_data.RBC.average_cell_density_uL} cells/µL\n- WBC (White Blood Cells) count: ${data.density_data.WBC.average_cell_density_uL} cells/µL\n- Platelet count: ${data.density_data.Platelet.average_cell_density_uL} cells/µL\n- Age: 29 years\n- Gender: Male`;

        setInputAi(text);

        axios.post('/gemini_response', {text: input_ai},{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function(response){
          setGeminiRes(response.data.message);
        });

      } else {
        console.error("Failed to process the images");
      }
    } catch (error) {
      console.error("Error:", error);
    }

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
        {gemini_res?<Report gemini_res={gemini_res} setGeminiRes={setGeminiRes}/>:<form onSubmit={handleSubmit}>
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
          <br/>
          <input type="submit" value="Submit" />
        </form>}

      </div>
    </>
  );
};

export default Home;
