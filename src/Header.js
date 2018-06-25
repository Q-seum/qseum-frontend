import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
// import QRCode from 'qrcode.react'

class Header extends Component {
  render () {
    return (
      <div className='header'>
        <h1>Q-seum</h1>
        <div className='header-subtitle'>
          <div>Your QRCode</div>
          <div>Profile</div>
        </div>
      </div>
    )
  }
}

export default Header
