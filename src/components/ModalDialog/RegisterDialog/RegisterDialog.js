import React from 'react'

import './RegisterDialog.styles.css'

const RegisterDialog = ({switchPage}) => {
    return (
        <>
            <div className="register-container">
                <form className="register-form">
                    <div className='register-title'>Sign up for Tiker</div>
                    <div className='email-field'>
                        <input placeholder="Email" type='email' className='email-input'/>
                    </div>
                    <div className='password-field'>
                        <input placeholder="Password" type='password' className='password-input'/>
                    </div>
                    <div className='password-field'>
                        <input placeholder="Repeat password" type='password' className='password-input'/>
                    </div>
                    <button className="submit-register">Sign up</button>
                </form>
            </div>
            <hr />
            <div className='login-proposal'>
                <span>Already have an account?</span><span onClick={switchPage} className="login-link">Sign in</span>
            </div>    
        </>
    )
}

export default RegisterDialog
