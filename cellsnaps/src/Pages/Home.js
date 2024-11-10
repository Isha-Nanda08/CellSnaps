import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Header from '../Components/Header';
import Injection from '../Components/Injection';
import Report from '../Components/Report';
import '../Styles/Home.css';
const Home = () => {
  const [files, setFiles] = useState([]);
  const [gemini_res, setGeminiRes] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [input_ai, setInputAi] = useState("");
  const [res_data, setResData] = useState({});
   // State variables for Age and Gender

   const [age, setAge] = useState('');
   const [gender, setGender] = useState('');

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

        setResData(data);

        let text = `RBC (Red Blood Cells) count: ${data.density_data.RBC.average_cell_density_uL} cells/µL\n- WBC (White Blood Cells) count: ${data.density_data.WBC.average_cell_density_uL/100} cells/µL\n- Platelet count: ${data.density_data.Platelet.average_cell_density_uL} cells/µL\n- Age: ${age} years\n- Gender: ${gender}`;

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

    // let text = `RBC (Red Blood Cells) count: 5543483 cells/µL\n- WBC (White Blood Cells) count: 2917.62 cells/µL\n- Platelet count: 182351 cells/µL\n- Age: 29 years\n- Gender: Male`;

    //     setInputAi(text);

    //     axios.post('/gemini_response', {text: input_ai},{
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }).then(function(response){
    //       setGeminiRes(response.data.message);
    //     });
  };



    // Handle Age change
    const handleAgeChange = (event) => {
      setAge(event.target.value); // Update the state with the input value
    };

    // Handle Gender change
    const handleGenderChange = (event) => {
      setGender(event.target.value); // Update the state with the input value
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
        <div>
        <Injection />
        </div>
      </div>

      <div className='main'>
        {gemini_res?<Report gemini_res={gemini_res} setGeminiRes={setGeminiRes} data ={res_data}/>:<form onSubmit={handleSubmit}>
          <label htmlFor="myfile"  id='myfileLabel'>Upload at least three files:</label>
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

          <input
        type="number"
        placeholder="Age"
        id="age_input"
        value={age}
        onChange={handleAgeChange}
        min="0" max="120" step="1"
      />

          <br/>
          <input
        type="text"
        placeholder="Gender"
        id="gender_input"
        value={gender}
        onChange={handleGenderChange}
      />

          <br/>
          <input type="submit" value="Analyse" />
        </form>}
      </div>
    </>
  );
};

export default Home;
