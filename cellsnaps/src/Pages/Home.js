// Home.js
import React from 'react';
import '../Styles/Home.css';
const Home = () => {
  return (
    <div className='main'>

    <form action="">
    <label for="myfile">Upload a file:</label>
    <br/>
    <input type="file" id="myfile" name="myfile" accept='image/*'/>
    <br/>
    <input type="submit" value="Submit"/>
    </form>

    </div>
  );
};

export default Home;
