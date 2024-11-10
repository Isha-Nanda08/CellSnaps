import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Styles/About.css'; // Import the CSS file for styling
import Injection from '../Components/Injection';
import Header from '../Components/Header';

// Individual card component
const Card = ({ title, imageSrc, description, linkText, linkHref }) => {
  return (
    <div className="card" data-aos="fade-up">
      <img src={imageSrc} alt={title} className="card-image" />
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={linkHref}>{linkText}</a>
    </div>
  );
};

// About component containing the cards
const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (<>
    <Header/>
    <div className="about-container">
      <Card
       
        imageSrc="https://www.allencell.org/uploads/8/1/9/9/81996008/published/icon-educationalresources.png?1558495128" // Replace with the correct path
       
      />
      <Card
        imageSrc="https://www.allencell.org/uploads/8/1/9/9/81996008/published/icon-educationalresources.png?1558495128" // Replace with the correct path
      />
      <Card
       imageSrc="https://www.allencell.org/uploads/8/1/9/9/81996008/published/icon-educationalresources.png?1558495128" // Replace with the correct path
      />
      {/* <Injection/> */}
    </div>
    </>
  );
};

export default About;
