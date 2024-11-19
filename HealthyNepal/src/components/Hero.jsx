import React from 'react'
import {Link} from "react-router-dom"
import '../styles/hero.css'


const Hero = () => {
  return (
    <div className='hero-container'>
      <div className="hero-content">
        <h1 className='hero-title'>
          Best Collection for <br /> Health Medicines
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, ab! Vel velit libero ratione autem voluptat<br />um aperiam, sequi expedita dolorem facilis pariatur at corrupti in quis minus placeat ullam culpa!
          Neque labore aliquam earum, laborum impedit animi nostrum quisquam veniam quo sit molestias nemo atque quaerat <br /> blanditiis suscipit ducimus modi adipisci placeat. Perspiciatis, nesciunt voluptatum velit laboriosam aliquam illum sequi.
        </p>
        <Link to="/products" className="shop=link">
        <div className="shop-button">
          <span className="shop-text">Shop Now</span>
        </div>
        </Link>
      </div>
     
      
    </div>
  )
}

export default Hero
