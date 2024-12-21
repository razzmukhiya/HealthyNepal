import axios from "axios";
import { setProducts, setLoading, setError } from '../reducers/productSlice';
import { server } from "../../utils/api";

// Create a separate axios instance for public routes
const publicAxios = axios.create({
  baseURL: server,
  headers: {
    'Content-Type': 'application/json'
  }
});

// get all products (public route)
export const getAllProducts = () => async (dispatch) => {
  try {
    console.log('Fetching products...');
    dispatch(setLoading(true));

    // Use publicAxios for public routes
    const response = await publicAxios.get('/product/get-all-products');
    
    console.log('Received products response:', response);
    dispatch(setProducts(response.data.products || []));
  } catch (error) {
    console.error('Error fetching products:', error);
    console.error('Error response:', error.response?.data);
    dispatch(setProducts([]));
    dispatch(setError(error.response?.data?.message || "Failed to fetch products"));
  } finally {
    dispatch(setLoading(false));
  }
};

// get single product (public route)
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Use publicAxios for public routes
    const response = await publicAxios.get(`/product/get-product/${id}`);

    dispatch(setProducts([response.data.product]));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to fetch product"));
  } finally {
    dispatch(setLoading(false));
  }
};

// create product (auth required)
export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.post(
      `${server}/product/create-product`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch(setProducts([response.data.product]));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to create product"));
  } finally {
    dispatch(setLoading(false));
  }
};

// get All Products of a shop (auth required)
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.get(
      `${server}/product/get-all-products-shop/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    dispatch(setProducts(response.data.products || []));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to fetch shop products"));
  } finally {
    dispatch(setLoading(false));
  }
};

// delete product of a shop (auth required)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // After successful deletion, fetch updated products list
    dispatch(getAllProducts());
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to delete product"));
  } finally {
    dispatch(setLoading(false));
  }
};
