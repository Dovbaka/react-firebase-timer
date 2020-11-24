import React, {useState} from "react";
import styles from "./Navbar.module.css"
import {useAuth} from "../../providers/AuthContext";
import {useHistory, useLocation} from "react-router";


export default function Navbar() {

    const [error, setError] = useState("")
    const { logout } = useAuth()
    const history = useHistory()
    let location = useLocation();

    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }


    return <div className={styles.navbarContainer}>
        {location.pathname === "/chart"?<button className={styles.getStartedButton} onClick={()=>{history.push("/getStarted")}}>Get Started</button>:
            <button className={styles.goBackButton} onClick={()=>{history.push("/chart")}}>Go Back</button>}
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
    </div>
}
