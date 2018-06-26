import React, { Component } from 'react'
import './App.css'

class Header extends Component {
  render () {
    return (
      <div className='Header'>
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
