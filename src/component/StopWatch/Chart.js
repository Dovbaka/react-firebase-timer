import React, {useEffect, useRef, useState} from 'react';
import {useAuth} from "../../providers/AuthContext";
import styles from "./Chart.module.css"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Navbar from "../Navbar/Navbar";
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import youtube from "./../../assets/images/YouTube.png"
import instagram from "./../../assets/images/instagram.png"
import twitter from "./../../assets/images/twitter.png"

const Chart = (props) => {

    const {getData, setData, currentUser} = useAuth();
    const [logData, setLogData] = useState([]);
    const [isSave, setIsSave] = useState(false); //For checking is it save to push data

    const loggedGoogle = true; //Is person signed in with Google
    const [width, setWidth] = useState(window.innerWidth); // For Screen size detection
    const userKey = currentUser ? currentUser.uid : "unknownUser";

    //const userKey = currentUser? currentUser.email.replace('@gmail.com','') : "unknownUser";

    function isPassed(date) { //Check if 1 min passed
        let past = new Date(date).getTime();
        let fiveMin = 1000 * 60;
        return (new Date().getTime() - past < fiveMin) ? false : true;
    }

    useEffect(() => { //Getting log data
        console.log(currentUser)
        setIsSave(false);
        getData(userKey).on('value', e => {
            if (e.val() && e.val().length > 0) {
                setLogData(e.val());
                setIsSave(true);
            }
            if (!e.val()) {
                setIsSave(true);
            }
        })
    }, []);

    useEffect(() => {
        setIsSave(false);
        if (logData.length === 0) { //create first log
            setLogData(logData.concat([{
                time: new Date(),
                logsGoogle: 0,
                logsFacebook: 0,
                formatedTime: new Date().getHours() + ":" + new Date().getMinutes()
            }]))
        }
        logData.map((el, index) => {
            if (!isPassed(el.time) && index === logData.length - 1 && loggedGoogle) { //if passed < 1 min - add count
                el.logsGoogle += 1;
            } else if (!isPassed(el.time) && index === logData.length - 1 && !loggedGoogle) {
                el.logsFacebook += 1;
            } else if ((isPassed(el.time) && index === logData.length - 1)) { //if 1 min passed - create new log
                setLogData(logData.concat([{
                    time: new Date(),
                    logsGoogle: 0,
                    logsFacebook: 0,
                    formatedTime: new Date().getHours() + ":" + new Date().getMinutes()
                }]))
            }
            return el;
        })
    }, [logData])

    useEffect(() => {
        if (isSave) setData(userKey, logData); // Push to DB if it's save
    }, [isSave])

    return <div>
        <Navbar/>
        <div className={styles.chartContainer}>
            <div className={styles.titleBox}>
                <h1>Logs info</h1>
                <h2>See below the time and logs info</h2>
            </div>
            <div>
                <LineChart width={width >= 768 ? 600 : 300} height={width >= 768 ? 300 : 150} data={logData}
                           margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                    <Line type="monotone" dataKey="logsGoogle" stroke="#FF2424"/>
                    <Line type="monotone" dataKey="logsFacebook" stroke="#3F91FF"/>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey="formatedTime"/>
                    <YAxis/>
                </LineChart>
                <div className={styles.logsKeyNames}>
                    <h3 style={{color: "#FF2424"}}>Google</h3>
                    <h3 style={{color: "#3F91FF"}}>Facebook</h3>
                </div>
            </div>
        </div>
        <div className={styles.links}>
            <a href="https://www.youtube.com/watch?v=G1IbRujko-A">
                <img src={instagram} alt={"link"}/>
            </a>
            <a href="https://www.youtube.com/watch?v=G1IbRujko-A">
                <img src={youtube} alt={"link"}/>
            </a>
            <a href="https://www.youtube.com/watch?v=G1IbRujko-A">
                <img src={twitter} alt={"link"}/>
            </a>
        </div>
    </div>
}

export default withAuthRedirect(Chart);
