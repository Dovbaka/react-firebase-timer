import firebase from "firebase"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCcZLGxwgwL1CA0kXIPOjkCpawY4lcPnps",
    authDomain: "react-timer-demo.firebaseapp.com",
    databaseURL: "https://react-timer-demo.firebaseio.com",
    projectId: "react-timer-demo",
    storageBucket: "react-timer-demo.appspot.com",
    messagingSenderId: "841376319708",
    appId: "1:841376319708:web:44ac236ab7215494850c19"
})

export const auth = app.auth()
export const database = app.database()
export default app
