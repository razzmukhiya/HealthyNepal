import axios from "axios";
import { server } from "../../../server";
import { thunk } from "redux-thunk";


//load user
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
      const { data } = await axios.get(`${server}/user/getuser`, {
        withCredentials: true,
      });
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFail",
        payload: error.response.data.message,
        
      });
    }
  };

//   import axios from "axios";

// // load user
// export const loadUser = async () => {
//   try {
//     const response = await axios.get(`${server}/user/getuser`, {
//       withCredentials: true,
//     });
//     return response.data.user;
//   } catch (error) {
//     throw error.response.data.message;
//   }
// };

// import axios from "axios";
// import { server } from "../../../server";
// import thunk from 'redux-thunk';

// // load user
// export const loadUser = async () => {
//   try {
//     const response = await axios.get(`${server}/user/getuser`, {
//       withCredentials: true,
//     });
//     return response.data.user;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw error.response.data.message;
//     } else {
//       throw error;
//     }
//   }
// };