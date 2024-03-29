import axios from 'axios';
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL

} from "../constants/productConstants"


export const getProduct = (keyword = "", currentPage = 1,) => async (dispatch) => {
    try {
        console.log(currentPage)
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })

        let link
        // if (keyword  currentPage) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
            // console.log(link)
        // }
        // else {
        //     link = `/api/v1/products`;
        //     console.log(link)

        // }


        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {

    dispatch({
        type: CLEAR_ERRORS
    })
}

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};