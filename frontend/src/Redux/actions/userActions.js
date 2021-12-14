import { axiosInstance } from "../../config.js";
import { EDIT_PROFILE_DATA_FAIL, EDIT_PROFILE_DATA_REQUEST, EDIT_PROFILE_DATA_SUCCESS, USER_PHOTO_UPDATE_FAIL, USER_PHOTO_UPDATE_REQUEST, USER_PHOTO_UPDATE_SUCCESS, USER_PHOTO_UPLOAD_FAIL, USER_PHOTO_UPLOAD_REQUEST, USER_PHOTO_UPLOAD_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"

export const signin = (username, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
    try {
        const { data } = await axiosInstance.post("/auth/login", { username, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const signout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("postDetails");
    dispatch({ type: USER_SIGNOUT });
}




export const register = (firstname, lastname, username, email, password, profilePic) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { firstname, lastname, username, email, password, profilePic} });
    try {
        const { data } = await axiosInstance.post("/auth/register", { firstname, lastname, username, email, password, profilePic});
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const editProfileData = ( id, email, password, profilePic) => async (dispatch) => {
    dispatch({ type: EDIT_PROFILE_DATA_REQUEST, payload: { email, password, profilePic } });
    try {
        const { data } = await axiosInstance.put(`/user/${id}`, { email, password, profilePic});
        dispatch({ type: EDIT_PROFILE_DATA_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: EDIT_PROFILE_DATA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};



export const photoUpload = (file) => async (dispatch) => {
    dispatch({ type: USER_PHOTO_UPLOAD_REQUEST, payload: { file } });
    try {
        const { data } = await axiosInstance.post("/upload", file);
        dispatch({ type: USER_PHOTO_UPLOAD_SUCCESS, payload: data });
        console.log("success in uploading image file")
    } catch (error) {
        dispatch({
            type: USER_PHOTO_UPLOAD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const photoUpdate = (file) => async (dispatch) => {
    dispatch({ type: USER_PHOTO_UPDATE_REQUEST, payload: { file } });
    try {
        const { data } = await axiosInstance.post("/upload", file);
        dispatch({ type: USER_PHOTO_UPDATE_SUCCESS, payload: data });
        console.log("success in updating image file")
    } catch (error) {
        dispatch({
            type: USER_PHOTO_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};




