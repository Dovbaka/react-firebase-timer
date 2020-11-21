import React, {useState} from 'react';
import StopWatch from "./StopWatch";
import {useAuth} from "../../providers/AuthContext";
import {useHistory} from "react-router";
import styles from "./StopWatch.module.css"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const StopWatchPage = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

    return <div>
        <button onClick={handleLogout} className={styles.logoutButton}>
            Log Out
        </button>
        <div className={styles.stopWatchesContainer}>
            <StopWatch name={"Desktop"} userKey={currentUser? currentUser.uid + "Desktop": "unknownIdDesktop"}/>
            <StopWatch name={"Mobile"} userKey={currentUser? currentUser.uid + "Mobile": "unknownIdMobile"}/>
        </div>
    </div>
}

export default withAuthRedirect(StopWatchPage);
