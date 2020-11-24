import React, {useState} from 'react';
import StopWatch from "./StopWatch";
import {useAuth} from "../../providers/AuthContext";
import styles from "./StopWatch.module.css"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Navbar from "../Navbar/Navbar";

const StopWatchContainer = () => {

    const { currentUser } = useAuth();


    return <div>
        <Navbar/>
        <div className={styles.stopWatchesContainer}>
            <StopWatch name={"Desktop"} userKey={currentUser? currentUser.uid + "Desktop": "unknownIdDesktop"}/>
            <StopWatch name={"Mobile"} userKey={currentUser? currentUser.uid + "Mobile": "unknownIdMobile"}/>
        </div>
    </div>
}

export default withAuthRedirect(StopWatchContainer);
