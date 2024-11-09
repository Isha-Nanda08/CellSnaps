// Home.js
import React from 'react';
import '../Styles/Home.css';
import { Input } from '../components/ui/input.tsx';
import { Label } from '../components/ui/label.tsx';
const Home = () => {
  return (
    <div  className='main'>

    <form action="" >
    <label for="myfile">Upload a file:</label>
    <br/>
    <input type="file" id="myfile" name="myfile" accept='image/*'/>
    <br/>
    <input type="submit" value="Submit"/>
    </form>

    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="File" className='text-blue-600'>File</Label>
      <Input id="file" type="file" />
    </div>

    </div>
  );
};

export default Home;
