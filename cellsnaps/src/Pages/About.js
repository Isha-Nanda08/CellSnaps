import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Styles/About.css'; // Import the CSS file for styling
import Injection from '../Components/Injection';

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

  return (
    <div className="about-container">
      <Card
        title="Educational Resources"
        imageSrc="https://www.allencell.org/uploads/8/1/9/9/81996008/published/icon-educationalresources.png?1558495128" // Replace with the correct path
        description="Learn how teachers use allencell.org data & tools in educational settings"
        linkText="Learn more"
        linkHref="#"
      />
      <Card
        title="Visual Guide to Human Cells"
        imageSrc="/path_to_image2.png" // Replace with the correct path
        description="An interactive overview of hiPS cell 3D structure & function"
        linkText="Explore"
        linkHref="#"
      />
      <Card
        title="AC Research Projects"
        imageSrc="/path_to_image3.png" // Replace with the correct path
        description="How can we make sense of all this data?"
        linkText="Pathtrace rendering"
        linkHref="#"
      />
      {/* <Injection/> */}
    </div>
  );
};

export default About;
