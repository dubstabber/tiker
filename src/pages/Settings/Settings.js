import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import {AppContext} from '../../context'

import './Settings.styles.css'

const Settings = () => {
    const {user} = useContext(AppContext)
    const [avatar, setAvatar] = useState('')
    const [username, setUsername] = useState(`${user.username}`)
    const [name, setName] = useState(`${user.name}`)
    const [email, setEmail] = useState(`${user.email}`)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    useEffect(() => {
        document.querySelector('body').classList.add('hide-scroll')
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const updateData = {
            username, 
            name,
            email,
            avatar,
            password,
            password2
        }
        await axios.put('/updateAccount', updateData)
        .then((data) => {
            console.log(data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='settings-page'>
            <div className='settings-container'>
                <form onSubmit={handleUpdate} className='settings-form'>
                    <div className='settings-title'>Manage your account</div>
                    <div className='settings-item'>
                        <img className="user-profile" src={user.avatar ? user.avatar : "./images/user-icon.jpg"} width={"100%"} alt="user-profile" />
                        <input onChange={e => setAvatar(e.target.value)} className='settings-input' placeholder='Enter a link to change your photo' value={avatar} />
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>User name:</div>
                        <input onChange={e => setUsername(e.target.value)} className='settings-input' value={username} required/>
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>Name:</div>
                        <input onChange={e => setName(e.target.value)} className='settings-input' value={name} />
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>Email:</div>
                        <input onChange={e => setEmail(e.target.value)} type='email' className='settings-input' value={email} required/>
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>Password:</div>
                        <input type='password' onChange={e => setPassword(e.target.value)} className='settings-input' placeholder='Change password' value={password} />
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>Repeat password:</div>
                        <input type='password' onChange={e => setPassword2(e.target.value)} className='settings-input' placeholder='Change password' value={password2} />
                    </div>
                    <button className='settings-submit'>Update account</button>
                </form>
            </div>
        </div>
    )
}

export default Settings
