import Rightsection from "../components/Rightsection";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editProfileData, photoUpdate } from "../Redux/actions/userActions";


function Profile() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const editedProfileInfo = useSelector(state => state.editProfileData);
    const { successUpdate } = editedProfileInfo;


    const email = userInfo.email;
    const userId = userInfo._id;
    const profilePic = userInfo.profilePic;

    const publicFolder = "https://stars-blog.herokuapp.com/images/"

    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [file, setFile] = useState(null);

    const dispatch = useDispatch();
    // const [passwordToggle, setPasswordToggle] = useState(false);



    const profileUpdateHandler = (e) => {
        e.preventDefault();
        newPassword !== confirmNewPassword && alert("passwords do not match");
        ((newPassword === "") || (confirmNewPassword === "")) && alert("The password fields cannot be empty");

        const filename = Date.now() + file?.name
        if (file) {
            const data = new FormData();
            data.append("name", filename);
            data.append("file", file);
            dispatch(photoUpdate(data));
        }
        dispatch(editProfileData(userId, newEmail, newPassword, filename));
        setNewEmail("");
        setNewPassword("");
        setConfirmNewPassword("");

    };

    return (
        <>
            <section className="left__section">
                This is the left section
            </section>
            <section className="center__section profile">
                <div className="profile__wrapper">
                    <h1 className="page__name">Profile Page</h1>
                    <form className="form">
                        {successUpdate && <div className="success__message">You have Successfully Updated your Profile!</div>}
                        <div className="pic__container">
                            <img src={file ? URL.createObjectURL(file) : publicFolder + profilePic} className="profile__image" alt="write__image" />
                            <label htmlFor="file__add">
                                <FaRegUserCircle className="pic__icon" />
                            </label>
                            <input type="file" id="file__add" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                            <button className="profile__delete">Delete Account</button>
                        </div>
                        <div className="data__container">
                            {/* <div className="data__input">
                                <label className="username" htmlFor="username">Username: </label>
                                <input type="text" placeholder="Username" id="username" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
                            </div> */}
                            <div className="data__input">
                                <label className="email" htmlFor="email">Email: </label>
                                <input type="email" placeholder="Email" id="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                            </div>
                            <div className="data__input">
                                <label className="password" htmlFor="newpassword">Password: </label>
                                <input type="password" placeholder="New Password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                            </div>
                            <div className="data__input">
                                <label className="password" htmlFor="confirmNewPassword">Confirm Password: </label>
                                <input type="password" placeholder="Confirm New Password" id="confirmNewPassword" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                            </div>
                            <button type="submit" onClick={profileUpdateHandler} className="button update">Update</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="right__section">
                <Rightsection />
            </section>
        </>
    )
}

export default Profile
