import React, { Component } from 'react'
import './App.css'
// import { Router, Route } from 'react-router-dom'
// import QRCode from 'qrcode.react'

class Login extends Component {
  render () {
    return (
      <div className='Login'>
        <h1>Login</h1>
        <form>
          <div>
            <label>Username</label>
            <input type='text' name='username' />
          </div>
          <div>
            <label>Password</label>
            <input type='password' name='password' />
          </div>
          <button type='submit'>Login</button>
        </form>
        <div>
          New to Q-seum?
        </div>
        <button>Register</button>
      </div>
    )
  }
}

export default Login
