import React, {useRef, useState} from 'react';
import styles from './Login.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {useAuth} from "../../providers/AuthContext"

const Login = () => {

    const {login} = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const surnameRef = useRef()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("stopwatch")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }


    return <div className={styles.wrapper}>
        <div className={styles.loginBox}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder={"Email"} name={"userEmail"} type={"email"} ref={emailRef} required/>
                <input placeholder={"Password"} name={"userPassword"} type={"password"} ref={passwordRef}/>
                <button className={styles.loginButton} type="submit" disabled={loading}>Login</button>
            </form>
            <p>Don't have an account yet? <NavLink className={styles.navLink} to={"/register"}>Register</NavLink></p>
        </div>
    </div>
}

export default Login;
