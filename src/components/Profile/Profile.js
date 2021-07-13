import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AppContext } from '../../context'

import './Profile.styles.css'

const Profile = () => {
    const [userData, setUserData] = useState({})
    const {showProfile} = useContext(AppContext)

    useEffect(() => {
        axios.get('/getUser/'+ showProfile)
        .then((data) => {
            setUserData(data.data)
        })
        .catch(err => {
            console.error('User could not be fetched')
        })
    }, [showProfile])

    return (
        <div>
            {userData.username}
        </div>
    )
}

export default Profile
