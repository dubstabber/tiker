import React, {useState, useEffect, useContext} from 'react'
import {AppContext} from '../../context'

import './Settings.styles.css'

const Settings = () => {
    const {user} = useContext(AppContext)
    const [username, setUsername] = useState(`${user.username}`)
    const [name, setName] = useState(`${user.name}`)
    const [email, setEmail] = useState(`${user.email}`)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    useEffect(() => {
        document.querySelector('body').classList.add('hide-scroll')
    }, [])

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handlePassword2 = (e) => {
        setPassword2(e.target.value)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log('handle update')
    }

    return (
        <div className='settings-page'>
            <div className='settings-container'>
                <form onSubmit={handleUpdate} className='settings-form'>
                    <div className='settings-title'>Manage your account</div>
                    <div className='settings-item'>
                        <img className="user-profile" src={user.avatar ? user.avatar : "./images/user-icon.jpg"} width={"100%"} alt="user-profile" />
                        <input className='settings-input' placeholder='Enter a link to change your photo' />
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>User name:</div>
                        <input onChange={handleUsername} className='settings-input' value={username} />
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>Name:</div>
                        <input onChange={handleName} className='settings-input' value={name} />
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>Email:</div>
                        <input onChange={handleEmail} type='email' className='settings-input' value={email} />
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>Password:</div>
                        <input onChange={handlePassword} className='settings-input' placeholder='Change password' value={password} />
                    </div>
                    <div className='settings-item'>
                        <div className='settings-label'>Repeat password:</div>
                        <input onChange={handlePassword2} className='settings-input' placeholder='Change password' value={password2} />
                    </div>
                    <button className='settings-submit'>Update account</button>
                </form>
            </div>
        </div>
    )
}

export default Settings
