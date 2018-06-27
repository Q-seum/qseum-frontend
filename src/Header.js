import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Navbar, NavbarItem, NavbarLink, NavbarStart, NavbarEnd } from 'bloomer'
import logo from './logo3.png'

class Header extends Component {
  render () {
    return (
      <Navbar className='Header'>
        <NavbarStart>
          {/* <NavbarItem>
            <img className='logo' src={logo} />
          </NavbarItem> */}
          <NavbarItem className='navtitle'>
            <strong>Q-Seum</strong>
          </NavbarItem>
          <NavbarItem className='tagline'>Hop through the lines</NavbarItem>
        </NavbarStart>
        {this.props.token && (
          <NavbarEnd className='header-links'>
            <Link to='/'>
              {this.props.admin === 'true' ? (
                <NavbarItem isHoverable>Home</NavbarItem>
              ) : (
                <NavbarItem isHoverable>Your QR Code</NavbarItem>
              )}
            </Link>
            <Link to='/profile'>
              <NavbarItem isHoverable>Profile</NavbarItem>
            </Link>
          </NavbarEnd>
        )}
      </Navbar>
    )
  }
}

export default Header
