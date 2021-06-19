import React, {useState} from 'react'
import {AppContext} from '../context'

const Store = ({children}) => {
    const [user, setUser] = useState({id: undefined, token: undefined, error: undefined, isAuth: undefined})
    const [showModalDialog, setShowModalDialog] = useState(false);

    const state = {
        user,
        setUser,
        showModalDialog,
        setShowModalDialog
    }

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export default Store