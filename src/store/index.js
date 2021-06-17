import React, {useState} from 'react'
import {AppContext} from '../context'

const Store = ({children}) => {
    const [user, setUser] = useState({id: undefined, token: undefined, error: undefined, isAuth: undefined})
    const [showLogin, setShowLogin] = useState(false);

    const state = {
        user,
        setUser,
        showLogin,
        setShowLogin
    }

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export default Store