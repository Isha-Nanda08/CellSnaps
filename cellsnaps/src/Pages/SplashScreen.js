import React, { useEffect, useState } from 'react';
import '../Styles/SplashScreen.css';

export default function SplashScreen() {
  const [text, setText] = useState('');
  const fullText = 'CellSnaps';

  useEffect(() => {
    let index = 0;
    const typingEffect = setInterval(() => {
      setText(fullText.substring(0, index + 1)); // Use substring to set text up to the current index
      index++;

      if (index === fullText.length) {
        clearInterval(typingEffect);
      }
    }, 200); // Adjust typing speed

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <div className="splash-screen">
      <span>{text}</span>
    </div>
  );
}
