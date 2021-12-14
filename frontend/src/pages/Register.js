import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { photoUpload, register } from "../Redux/actions/userActions"


function Register(props) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setFile] = useState(null);
    
    
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/"
    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    
        const dispatch = useDispatch();
    
        const submitHandler = (e) => {
            e.preventDefault();
            if(password !== confirmPassword){
                alert("Passwords do not match");
            }

            
            const filename = Date.now() + file.name;
            if (file) {
                const data = new FormData();
                data.append("name", filename);
                data.append("file", file);
                dispatch(photoUpload(data));
          }
            dispatch(register(firstname, lastname, username, email, password, filename));
        
        }
    
        useEffect(() => {
            if (userInfo) {
                props.history.push(redirect);
            }
        }, [props.history,redirect,userInfo,])

    return (
        <>
            <section className="left__section">
            
            </section>
            <section className="center__section register__form">
            <div className="profile__wrapper">
                    <h1 className="page__name">Register For Free</h1>
                    <form className="form register">
                      <div className="data__container">
                      { error && <span className="error">Something went wrong!</span>}
                        {

                        file && <img src={URL.createObjectURL(file)}  className="profile__image" alt="write__image" />

                        }
                        
                        <label htmlFor="file__add">
                          <FaRegUserCircle className="pic__icon" />
                        </label>
                        <input type="file" id="file__add" onChange={e => setFile(e.target.files[0])} style={{display: "none"}} />
                      <div className="data__input">
                      <label className="firstname" htmlFor="firstname"> Firstname: </label>
                      <input type="text" placeholder="First Name" id="firstname" onChange={e => setFirstname(e.target.value)}/>
                      </div>
                      <div className="data__input">
                      <label className="lastname" htmlFor="lastname">Lastname: </label>
                      <input type="text" placeholder="Lastname" id="lastname" onChange={e => setLastname(e.target.value)}/>
                      </div>
                      <div className="data__input">
                      <label className="username" htmlFor="username">Username: </label>
                      <input type="text" placeholder="Username" id="username" onChange={e => setUsername(e.target.value)}/>
                      </div>
                      <div className="data__input">
                      <label className="email"  htmlFor="email">Email: </label>
                      <input type="email" placeholder="Email" id="email" onChange={e => setEmail(e.target.value)}/>
                      </div>
                      <div className="data__input">
                      <label className="password" htmlFor="password">Password: </label>
                      <input type="password" placeholder="Password" id="password" onChange={e => setPassword(e.target.value)}/>
                      </div>
                      <div className="data__input">
                      <label className="confirmpassword" htmlFor="confirmpassword">Confirm password: </label>
                      <input type="password" placeholder="Confirm your password" id="confirmpassword" onChange={e => setConfirmPassword(e.target.value)}/>
                      </div>
                      <button type="submit" disabled={loading} className="button seventyfive" onClick={submitHandler}>Sign Up</button>

                     <p className="registerpage__link">Already Registered? Quickly Proceed to <Link to={`/login?redirect=${redirect}`}>Log in Here</Link></p>
                      </div>
                    </form>
                    </div>
            </section>
            <section className="right__section">
            
            </section>
        </>
    )
}

export default Register
