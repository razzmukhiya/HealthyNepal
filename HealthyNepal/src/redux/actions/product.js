import { setProducts, setLoading, setError, appendProducts, setHasMore, setCurrentPage } from '../reducers/productSlice';
import api from '../../utils/api';

// get all products (public route)
export const getAllProducts = (page = 1, isFirstLoad = true) => async (dispatch) => {
  try {
    console.log('Fetching products - Page:', page, 'IsFirstLoad:', isFirstLoad);
    dispatch(setLoading(true));
    dispatch(setError(null)); // Clear any previous errors
    
    console.log('Making API request to:', `/product/get-all-products?page=${page}&limit=12`);
    const response = await api.get(`/product/get-all-products?page=${page}&limit=12`);
    console.log('API Response:', response);
    
    if (!response.data || !response.data.success) {
      console.error('API Error:', response.data);
      throw new Error(response.data?.message || "Failed to fetch products");
    }

    const { products, currentPage, totalPages } = response.data;
    console.log('Received products:', products?.length, 'Current Page:', currentPage, 'Total Pages:', totalPages);
    
    if (isFirstLoad) {
      console.log('Setting initial products');
      dispatch(setProducts(products || []));
    } else {
      console.log('Appending products');
      dispatch(appendProducts(products || []));
    }
    
    dispatch(setCurrentPage(currentPage));
    dispatch(setHasMore(currentPage < totalPages));
    
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setProducts([])); // Clear products on error
    dispatch(setError(
      error.response?.data?.message || 
      error.message || 
      "Failed to fetch products"
    ));
  } finally {
    dispatch(setLoading(false));
  }
};

// get single product (public route)
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await api.get(`/product/get-product/${id}`);
    
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || "Failed to fetch product");
    }

    dispatch(setProducts([response.data.product]));
  } catch (error) {
    dispatch(setError(
      error.response?.data?.message || 
      error.message || 
      "Failed to fetch product"
    ));
  } finally {
    dispatch(setLoading(false));
  }
};

// create product (auth required)
export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await api.post('/product/create-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || "Failed to create product");
    }

    // After successful creation, fetch updated products list for the shop
    const shopId = response.data.product.shop;
    dispatch(getAllProductsShop(shopId));
  } catch (error) {
    dispatch(setError(
      error.response?.data?.message || 
      error.message || 
      "Failed to create product"
    ));
  } finally {
    dispatch(setLoading(false));
  }
};

// get All Products of a shop (auth required)
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await api.get(`/product/get-all-products-shop/${id}`);

    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || "Failed to fetch shop products");
    }
    
    dispatch(setProducts(response.data.products || []));
  } catch (error) {
    console.error('Error fetching shop products:', error);
    dispatch(setProducts([]));
    dispatch(setError(
      error.response?.data?.message || 
      error.message || 
      "Failed to fetch shop products"
    ));
  } finally {
    dispatch(setLoading(false));
  }
};

// delete product of a shop (auth required)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await api.delete(`/product/delete-shop-product/${id}`);

    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || "Failed to delete product");
    }

    // After successful deletion, fetch updated products list for the shop
    const shopId = response.data.product.shop;
    dispatch(getAllProductsShop(shopId));
  } catch (error) {
    dispatch(setError(
      error.response?.data?.message || 
      error.message || 
      "Failed to delete product"
    ));
  } finally {
    dispatch(setLoading(false));
  }
};
