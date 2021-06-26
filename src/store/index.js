import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {AppContext} from '../context'

const Store = ({children}) => {
    const [user, setUser] = useState({name: "",
                                      username: "",
                                      email: "",  
                                      avatar: null,
                                      following: [],
                                      followers: [],
                                      token: undefined, 
                                      error: undefined, 
                                      isAuth: false})
    const [showModalDialog, setShowModalDialog] = useState(false)    

    useEffect(() => {
        if(localStorage.token){
            axios.defaults.headers.common['x-auth-token'] = localStorage.token
            axios.get('http://localhost:5000/getProfile')
            .then(data => {
                setUser({
                    name: data.data.name,
                    usename: data.data.usename,
                    email: data.data.email, 
                    avatar: data.data.avatar,
                    following: data.data.following,
                    followers: data.data.followers,
                    token: localStorage.token, 
                    error: undefined, 
                    isAuth: true
                })
            })
            .catch((err) => {
                setUser({
                    name: "", 
                    username: "", 
                    email: "", 
                    avatar: null, 
                    following: [], 
                    followers: [], 
                    token: undefined, 
                    error: err.response.data.msg, 
                    isAuth: false
                })
            })
        } else{
            delete axios.defaults.headers.common['x-auth-token']
        }
    }, [])

    const login = (loginData) => {
        axios.post('http://localhost:5000/login', loginData).then(data => {
            if(data.data.token){
                localStorage.setItem('token', data.data.token)
                setUser({email: loginData.email, token: data.data.token, error: data.data.err, isAuth: true})
                setShowModalDialog(false)
            }
        })
    }

    const state = {
        user,
        setUser,
        showModalDialog,
        setShowModalDialog,
        login
    }

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export default Store