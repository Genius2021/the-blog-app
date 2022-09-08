import { SiGmail } from "react-icons/si";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsCaretDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../Redux/actions/userActions";
// import { axiosInstance } from "../config";

function Navbar() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const editProfileData = useSelector(state => state.editProfileData);
    const { editedProfile } = editProfileData;

    const photoUpdate = useSelector(state => state.photoUpdate);
    const { successUpdate } = photoUpdate;

    const dispatch = useDispatch();
    // const publicFolder = "https://stars-blog.herokuapp.com/images"
    const publicFolder = "http://localhost:5000/images/"

    const logoutHandler = () => {
        dispatch(signout());
        window.location.replace("/login");
    }

    const loginHandler = () => {
        window.location.replace("/login")
    }

    const capitalizeWord = (string) =>{
        const lowercase = string.toLowerCase();
        const capitalize = lowercase[0].toUpperCase();
         const answer = lowercase.replace(lowercase[0], capitalize)
        return answer;
    }

    return (
        <>
            <div className="nav__left">
                <div className="nav__logo"><Link to="/">Stars fc</Link></div>
                <div className="nav__left__icons">
                    <FaFacebookF className="nav__left__icon facebook" />
                    <FaTwitter className="nav__left__icon twitter" />
                    <SiGmail className="nav__left__icon gmail" />
                </div>
            </div>
            <div className="nav__center">
                <div className="nav__center__items">
                    <BiSearch className="nav__center__icon" />
                    <input placeholder="Search for topics" className="nav__center__input" />
                </div>
                {
                    userInfo ? (<div>Hello, {capitalizeWord(userInfo?.firstname)}</div>) : (<div>Hello, Guest</div>)
                }
            </div>
            <div className="nav__right">
                <div>

                </div>
                <ul className="nav__right__links">
                    <li><Link to="/write">Write</Link></li>
                    <div className="dropdown">
                        {" "}<BsCaretDown />
                        <ul className="dropdown__content">
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/productlist">Products</Link>
                            </li>
                            <li>
                                <Link to="/orderlist">Users</Link>
                            </li>
                            <li>
                                <Link to="/about">About us</Link>
                            </li>
                        </ul>
                    </div>
                </ul>
                <div className="dp__container">
                    { 
                        successUpdate ? (<Link to="/profile"><img src={publicFolder + editedProfile?.profilePic} alt="" className="nav__right__image" /></Link>) : userInfo && ( <Link to="/profile"><img src={publicFolder + userInfo?.profilePic} alt="" className="nav__right__image" /></Link>)
                    }
                    {/* {
                        userInfo && <Link to="/profile"><img src={publicFolder + userInfo.profilePic} alt="" className="nav__right__image" /></Link>
                    } */}
                    <button className="nav__login__button" onClick={userInfo ? logoutHandler : loginHandler}>{userInfo ? "Logout" : "Login"}</button>
                </div>
                {/* {
                    userInfo && <Link to="/profile"><img src={publicFolder + userInfo._doc?.profilePic} alt="" className="nav__right__image" /></Link>
                }
                <button className="nav__login__button" onClick={userInfo ? logoutHandler : loginHandler}>{userInfo ? "Logout" : "Login"}</button> */}

            </div>
        </>
    )
}

export default Navbar
