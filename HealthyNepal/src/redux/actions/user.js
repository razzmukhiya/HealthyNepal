
import axios from "axios";
import { server } from "../../../server";



//load user
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LOAD_USER_REQUEST",
      });
      // Get access token from localStorage
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const { data } = await axios.get(`${server}/user/getuser`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true,
      });
      dispatch({
        type: "LOAD_USER_SUCCESS",
        payload: data.user,
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Network Error";

      dispatch({
        type: "LOAD_USER_FAIL",
        payload: errorMessage,
        
      });
    }
  };

  //load seller

  export const loadSeller = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadSellerRequest",
      });
      const { data } = await axios.get(`${server}/shop/getSeller`, {
        withCredentials: true,
      });
      dispatch({
        type: "LoadSellerSuccess",
        payload: data.seller,
      });
    } catch (error) {
      dispatch({
        type: "LoadSellerFail",
        payload: error.response.data.message,
      });
    }
  };