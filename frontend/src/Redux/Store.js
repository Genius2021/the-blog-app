import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { editProfileDataReducer, photoUpdateReducer, photoUploadReducer, userRegisterReducer, userSigninReducer } from "./reducers/userReducers";
import { createNewPostReducer, deletePostReducer, editPostReducer,  getAPostReducer, getPostsReducer, postImageUploadReducer} from "./reducers/postReducers";


const initialState = {
    userSignin: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    },

    getAPost: {
        postDetails: localStorage.getItem("postDetails") ? JSON.parse(localStorage.getItem("postDetails")) : {},
    },
    // updatedDetails: {
    //     updatedDetails: localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("postDetails")) : {}
    // }



};

const reducer = combineReducers({
  
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    newPost : createNewPostReducer,
    postImageUpload : postImageUploadReducer,
    deletePost : deletePostReducer,
    getPosts : getPostsReducer,
    editPost : editPostReducer,
    editProfileData : editProfileDataReducer,
    getAPost : getAPostReducer,
    photoUpload : photoUploadReducer,
    photoUpdate : photoUpdateReducer
    // userDetails: userDetailsReducer,
    // userUpdateProfile: userUpdateProfileReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;