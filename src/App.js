import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import EmailList from "./components/EmailList/EmailList";
import Mail from "./components/Mail/Mail";
import SendMail from "./components/SendMail/SendMail";
import {useDispatch, useSelector} from "react-redux";
import {selectSendMessageIsOpen} from "./features/mailSlice";
import {selectUser} from "./features/userSlice";
import Login from "./components/Login/Login";
import {auth} from "./firebase";
import {login} from "./features/userSlice";

function App() {
    const sendMessageIsOpen = useSelector(selectSendMessageIsOpen)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(login({
                    displayName: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL
                }))
            } else {
                throw new Error("There is no user")
            }
        })
    }, [])

    return (
        <Router>
            {!user ? <Login />:   <div className="app">
                <Header/>

                <div className="app__body">
                    <Sidebar/>

                    <Switch>
                        <Route component={Mail} path={"/mail"}/>
                        <Route component={EmailList} path={"/"} />
                    </Switch>
                </div>
                {sendMessageIsOpen && <SendMail />}
            </div>}

        </Router>
    );
}

export default App;
