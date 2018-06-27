import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Navbar, NavbarItem, NavbarLink, NavbarStart, NavbarEnd } from 'bloomer'

class Header extends Component {
  render () {
    return (
      <Navbar className='Header'>
        <NavbarStart>
          <NavbarItem className='navtitle'>
            <strong>Q-Seum</strong>
          </NavbarItem>
          <NavbarItem className='tagline'>Hop through the lines</NavbarItem>
        </NavbarStart>
        {this.props.token && (
          <NavbarEnd className='header-links'>
            <Link to='/'>
              <NavbarItem isHoverable>Your QRCode</NavbarItem>
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
