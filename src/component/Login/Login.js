import React, {useRef, useState} from 'react';
import styles from './Login.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {useAuth} from "../../providers/AuthContext"

const Login = () => {

    const {login, signInWithGoogle, signInWithFacebook} = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(event) {
        debugger
        event.preventDefault();
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("chart")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    async function handleSubmitGoogle(event) {
        event.preventDefault();
        try {
            setError("")
            setLoading(true)
            await signInWithGoogle();
            history.push("chart")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    async function handleSubmitFaceBook(event) {
        event.preventDefault();
        try {
            setError("")
            setLoading(true)
            await signInWithFacebook();
            history.push("chart")
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
                <div className={styles.loginButtonContainer}>
                    <button className={styles.loginButton} type="submit" name={"loginWithEmail"} disabled={loading}>Login</button>
                    <button className={styles.loginButton} type="submit" name={"loginWithGoogle"} disabled={loading}
                            onClick={handleSubmitGoogle}>Google</button>
                    <button className={styles.loginButton} type="submit" name={"loginWithFaceBook"} disabled={loading}
                            onClick={handleSubmitFaceBook}>Facebook</button>
                </div>

            </form>
            <p>Don't have an account yet? <NavLink className={styles.navLink} to={"/register"}>Register</NavLink></p>
        </div>
    </div>
}

export default Login;
