import React, {useEffect, useRef, useState} from "react";
import styles from "./StopWatch.module.css";
import watchIcon from "../../assets/images/stopwatch.png"
import {useAuth} from "../../providers/AuthContext";

const StopWatch = (props) => {

    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    const [timer, setTimer] = useState(0)
    const {getData, setData} = useAuth()
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const countRef = useRef(null)

    useEffect(()=>{
        getData(props.userKey).on('value', e => {
            setTimer(e.val());
        })
        if(width >= 768 && props.name === "Desktop") handleStart();
        if(width <= 768 && props.name === "Mobile") handleStart();
    },[]);

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(false);
        setData(props.userKey, timer);
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
                alt={"img"} onClick={!isActive && !isPaused ? handleStart : isPaused ? handlePause : handleResume}/>
        </div>
        <h3>{formatTime()}</h3>
    </div>
}

export default StopWatch;
