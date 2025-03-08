export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

export const createOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        
        const response = await axios.post(`${API_URL}/create-order`, orderData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        if (response.data.success) {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: response.data,
            });
        } else {
            dispatch({
                type: CREATE_ORDER_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.message,
        });
    }
};
