import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

class Header extends Component {
  render () {
    return (
      <div className='Header'>
        <h1>Q-seum</h1>
        <div className='header-subtitle'>
          <div>Your QRCode</div>
          <Link to='/profile'>
            <div>Profile</div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Header
