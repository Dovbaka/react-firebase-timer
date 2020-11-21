import React, {useEffect, useRef, useState} from "react";
import styles from "./StopWatch.module.css";
import watchIcon from "../../assets/images/stopwatch.png"
import {useAuth} from "../../providers/AuthContext";

const StopWatch = (props) => {

    const {getData, setData} = useAuth()
    const [width, setWidth] = useState(window.innerWidth); // For Screen size detection
    const [timer, setTimer] = useState(0) // For timer value
    const [isActive, setIsActive] = useState(false) //For count active status
    const [isPaused, setIsPaused] = useState(false) //For pause status
    const countRef = useRef(null)

    useEffect(()=>{
        getData(props.userKey).on('value', e => {
            setTimer(e.val()); // Get stored time
        })
        if(width >= 768 && props.name === "Desktop") handleStart(); //Check window size
        if(width <= 768 && props.name === "Mobile") handleStart();
    },[]);

    useEffect(()=>{
        if(timer > 0) setData(props.userKey, timer);// Send to Realtime DB
    },[timer]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(false);
    }

    const handleResume = () => {
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000);
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }


    return <div className={styles.wrapper}>
        <h3>{props.name}</h3>
        <div className={styles.stopWatchBox}>
            <img
                src={watchIcon}
                alt={"img"} onClick={isPaused ? handlePause : handleResume}/>
        </div>
        <h3>{formatTime()}</h3>
    </div>
}

export default StopWatch;
