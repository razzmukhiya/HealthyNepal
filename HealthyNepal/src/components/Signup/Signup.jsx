import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import "../../styles/signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisibal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the actual file
      setAvatar(file);
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const previewElement = document.querySelector('.avatar-preview img');
          if (previewElement) {
            previewElement.src = reader.result;
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    axios
      .post(`${server}/user/create-user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        navigate("/"); // Navigate to the home page after successful signup
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>Register as a new user</h2>
      </div>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={visible ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {visible ? (
                <AiOutlineEye onClick={() => setVisibal(false)} />
              ) : (
                <AiOutlineEyeInvisible onClick={() => setVisibal(true)} />
              )}
            </div>
          </div>

          <div>
            <label htmlFor="avatar"></label>
            <div className="avatar-upload">
              <span className="avatar-preview">
                {avatar ? <img src={avatar} alt="Avatar" /> : <RxAvatar />}
              </span>
              <label htmlFor="file-input" className="upload-button">
                <span>Upload a file</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </div>

          <div>
            <p>
              By clicking Sign Up, you agree to our Terms, Privacy
              Policy and Cookies Policy. You may receive SMS Notifications from
              us and can opt out any time
            </p>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>

          <div className="signup-footer">
            <h4>Already have and account?</h4>
            <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import "../../styles/signup.css";
// import { set } from "mongoose";
// import {server} from "../../../server.js";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Navbar from "../../components/Navbar.jsx";

// // import { copyFile } from "fs";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [number, setNumber] = useState("");
//   // const [avatar, setAvatar] = useState("");
//   const navigate = useNavigate();

//   // const handleFileInputChange = (e) => {
//   //   const reader = new FileReader();
//   // }

//   // const handleInputChange = async (e) => {
//   //   const file = e.target.files[0];
//   //   setAvatar(file);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const config = { headers: { "Content-Type": "multipart/form-data" } };
//     const newForm = new FormData();

//     newForm.append("name", name);
//     newForm.append("email", email);
//     newForm.append("password", password);
//     // newForm.append("number", number);
//     // newForm.append("file", avatar);

//     axios
//       .post(`${server}/user/create-user`, newForm, config)
//       .then((res) => {
//         if(res.data.success === true){
//           navigate("/");
//         }
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   axios
//   //     .post(`${server}/user/create-user`, { name, email, password })
//   //     .then((res) => {
//   //       toast.success(res.data.message);
//   //       setName("");
//   //       setEmail("");
//   //       // setNumber("");
//   //       setPassword("");
//   //       // setAvatar(null);
//   //     })
//   //     .catch((error) => {
//   //       toast.error(error.response.data.message);
//   //     });
//   // }

//   return (
//     <>
//     <Navbar />
//     <div className="SignUp">
//       <h2>CREATE A NEW ACCOUNT</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           placeholder="Full Name"
//           autoComplete="name"
//           required
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <br />
//         <input
//           type="email"
//           name="email"
//           id="email"
//           placeholder="Email"
//           required
//           value={email}
//           autoComplete="email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />

//         {/* <input
//           type="number"
//           name="number"
//           id="number"
//           placeholder="Number"
//           required
//           value={number}
//           onChange={(e) => setNumber(e.target.valueAsNumber)}
//           autoComplete="tel"
//           pattern="[0-9]*"
//           maxLength="10"
//         /> */}
//         <br />
//         <input
//           type="password"
//           name="password"
//           id="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           autoComplete="password"
//           // minLength="8"
//           // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
//           title="Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
//         />
//         <br />
//         {/* <span>Upload a file</span>
//         <input
//           type="file"
//           name="avatar"
//           id="file-input"
//           accept=".jpg,.jpeg,.png"
//           onChange={handleFileInputChange}
//         /> */}
//         <p>
//           By clicking Sign Up, you agree to our Terms, Privacy
//           Policy and Cookies Policy. You may receive SMS Notifications from us
//           and can opt out any time
//         </p>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default Signup;
