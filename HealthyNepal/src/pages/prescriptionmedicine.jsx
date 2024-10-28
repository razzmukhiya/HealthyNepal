import React from 'react'
import '../styles/premed.css'

const prescriptionmedicine = () => {
  return (
    <div className='preMed'>
      <h2>ORDER PRESCRIPTION MEDICINE</h2>

      <div className="pre-container">
        <input type="text" placeholder='Full Name' name='fname' id='fname'/><br />
        <input type="text" placeholder='Address' name='address' id='address' /><br />
        <input type="text" placeholder='Phone Number' name='phone' id='phone'/> <br />
        <input type="text" placeholder='Doctor Name' name='dname' id='dname'/><br />
        <input type="file" placeholder='upload image ' />
        <p>Upload Prescrition Medicine List Given By Doctor </p>
        <button>Buy Now</button>
      </div>
    </div>
  )
}

export default prescriptionmedicine
