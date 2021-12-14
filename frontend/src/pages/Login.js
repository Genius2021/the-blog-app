import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { signin } from "../Redux/actions/userActions";




function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/"
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(username, password));
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
        <section className="center__section login__form">
        <div className="profile__wrapper">
                <h1 className="page__name">Login Page</h1>
                <form className="form">
                  <div className="data__container">
                  { error && <span className="error">Something went wrong!</span>}
                  <div className="data__input">
                  <label className="username" htmlFor="username">Username: </label>
                  <input type="text" placeholder="Username" id="username" onChange={e => setUsername(e.target.value)} />
                  </div>
                  <div className="data__input">
                  <label className="password" htmlFor="password">Password: </label>
                  <input type="password" placeholder="Password" id="password" onChange={e => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" disabled={loading} className="button seventyfive" onClick={submitHandler}>Log In</button>
                  <p className="loginpage__link">You Haven't Registered? <Link to={`/register?redirect=${redirect}`}>Register Here free</Link></p>
                  </div>
                </form>
                </div>
        </section>
        <section className="right__section">

        </section>
    </>
    )
}

export default Login
