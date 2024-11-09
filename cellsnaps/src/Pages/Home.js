import React, { useState } from 'react';
import '../Styles/Home.css';

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        console.log('Processed Images:', data); // Log the base64 images in the console
      } else {
        console.error("Failed to process the images");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="myfile">Upload at least three files:</label>
        <br/>
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
      </form>
    </div>
  );
};

export default Home;
