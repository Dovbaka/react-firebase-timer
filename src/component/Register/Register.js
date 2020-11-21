import React, {useRef, useState} from 'react'
import styles from "./Register.module.css";
import {useAuth} from "../../providers/AuthContext"
import {Link, NavLink, useHistory} from "react-router-dom"

const Register = () => {

    const { signup } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const surnameRef = useRef()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit (event) {
        event.preventDefault();
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("stopwatch")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return <div className={styles.wrapper}>
        <div className={styles.registerBox}>
            {error}
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input placeholder={"Name"} name={"firstName"} type={"text"} ref={nameRef}/>
                <input placeholder={"Surname"} name={"lastName"} type={"text"} ref={surnameRef}/>
                <input placeholder={"Email"} name={"userEmail"} type={"email"} ref={emailRef} required/>
                <input placeholder={"Password"} name={"userPassword"} type={"password"} ref={passwordRef} />
                <button className={styles.registerButton} type="submit" disabled={loading}>Register</button>
            </form>
            <p>Already registered? <NavLink className={styles.navLink} to={"/"}>Log in</NavLink></p>
        </div>
    </div>
}

export default Register;
