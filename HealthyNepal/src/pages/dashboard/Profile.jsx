import React, { useState } from 'react'
import Sidebar from '../../components/UserDashboard/Sidebar';
import NavTop from '../../components/UserDashboard/NavTop';
import "../../styles/Profile.css";


const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [dateOfBirth, setDateofBirth] = useState('');
  const [gender, setGender] = ('');
  return (
    <div>
      <NavTop />
      <div className="components">
      <Sidebar /> 
      </div>
      <div className="basic-info">
        <h2>Basic Information</h2>
        <form >
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
             />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input 
            type="phone" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Current Password:</label>
            <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateofBirth"> Date of Birth:</label>
            <input 
            type="date" 
            id='dateofBirth'
            value={dateOfBirth}
            onChange={(e) => setDateofBirth(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
             
            </select>

            <button className='btn' type='submit'>Submit</button>
          </div>

        </form>
      </div>


      </div>
  )
}

export default Profile
