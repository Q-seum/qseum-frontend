import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Navbar, NavbarItem, NavbarLink, NavbarStart, NavbarEnd } from 'bloomer'

class Header extends Component {
  render () {
    return (
      <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }} className='Header'>
        <NavbarItem className='navtitle'>
          <strong>Q-Seum</strong>
        </NavbarItem>
        <NavbarItem>Hop through the lines</NavbarItem>
        {this.props.token && (
          <NavbarEnd className='header-subtitle'>
            <Link to='/'>
              <NavbarLink>Your QRCode</NavbarLink>
            </Link>
            <Link to='/profile'>
              <NavbarLink>Profile</NavbarLink>
            </Link>
          </NavbarEnd>
        )}
      </Navbar>
    )
  }
}

export default Header
