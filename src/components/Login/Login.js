import React, {useContext} from 'react'
import {AppContext} from '../../context'
import './Login.styles.css'

const Login = () => {
    const {showLogin, setShowLogin} = useContext(AppContext)

    const disableLogin = () => {
        setShowLogin(false)
    }

    return (
        <>
            {showLogin &&<>
                <div onClick={disableLogin} className='modal-box'></div>
                <div className='box'>
                    <div className="login-container">
                        <form className="login-form">
                            <div className='login-title'>Log in to Tiker</div>
                            <div className='email-field'>
                                <input placeholder="Email" type='email' className='email-input'/>
                            </div>
                            <div className='email-field'>
                                <input placeholder="Password" type='password' className='password-input'/>
                            </div>
                            <button className="submit-login">Log in</button>
                        </form>
                    </div>
                    <hr />
                    <div className='register-proposal'>
                        <span>Don't have an account?</span><span className="register-link">Sign up</span>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Login
