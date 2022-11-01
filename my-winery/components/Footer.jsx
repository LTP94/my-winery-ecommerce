import React from 'react';

// Import Twtter and Instagram icons
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {

    // Get the current year

    const date = new Date();
    let year = date.getFullYear();
    
  return (
    <div className="footer-container">
      <p>{year} Luis Trueba Winery All rights reserverd</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer