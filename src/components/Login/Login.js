import React, {useContext} from 'react'
import {AppContext} from '../../context'
import './Login.styles.css'

const Login = () => {
    const {showLogin, setShowLogin} = useContext(AppContext);

    const disableLogin = () => {
        setShowLogin(false)
    }

    return (
        <>
            {showLogin && <>
                <div onClick={disableLogin} className='modal-box'></div>
                <div className='box'>
                    <form className="login-form">
                        <div className='login-title'>Log in to Tiker</div>
                        <input type='email' className='email-input'/>
                        <input type='password' className='password-input'/>
                    </form>
                </div>
            </>}
        </>
    )
}

export default Login
