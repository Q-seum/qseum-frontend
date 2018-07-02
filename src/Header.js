import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Navbar, NavbarItem, NavbarStart, NavbarEnd, NavbarBurger, NavbarBrand, NavbarMenu } from 'bloomer'
// import logo from './logo3.png'

class Header extends Component {
  constructor () {
    super()
    this.state = {
      isActive: false,
    }
    this.onClickNav = this.onClickNav.bind(this)
  }

  onClickNav () {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render () {
    return (
      <Navbar className='Header'>
        <NavbarBrand>
          <NavbarItem>
            <img src={require('./logo-separated.png')} />
          </NavbarItem>
        
          {/* <NavbarItem>
            <img className='logo' src={logo} />
          </NavbarItem> */}
          <NavbarItem className='navtitle'>
            <strong>Q-Seum</strong>
          </NavbarItem>
          <NavbarItem className='tagline'>Hop through the lines</NavbarItem>
        
          <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
        </NavbarBrand>
        <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
          <NavbarStart>
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
              <Link to='/Map'>
                <NavbarItem isHoverable>Museum Map</NavbarItem>
              </Link>
              <Link to='/profile'>
                <NavbarItem isHoverable>Your Profile</NavbarItem>
              </Link>
              {this.props.admin !== 'true' && (
                <Link to='/report-issue'>
                  <NavbarItem isHoverable>Report an issue</NavbarItem>
                </Link>
              )}
            </NavbarEnd>
          
          )}
        </NavbarMenu>
      </Navbar>
    )
  }
}

export default Header
