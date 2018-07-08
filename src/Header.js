/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Navbar, NavbarItem, NavbarStart, NavbarEnd, NavbarBurger, NavbarBrand, NavbarMenu } from 'bloomer'
// import logo from './logo3.png'

class Header extends Component {
  constructor () {
    super()
    this.state = {
      isActive: false
    }
    this.onClickNav = this.onClickNav.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    localStorage.clear()
    this.props.updateState()
    // this.props.history.push('/')
  }

  onClickNav () {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  handleClick (e) {
    console.log(e.target)
    // e.target.classList.add('active')
  }

  render () {
    return (
      <Navbar className='Header'>
        <NavbarBrand>
          {/* <NavbarItem className='navicon'>
            <img src={require('./logo-separated.png')} />
          </NavbarItem> */}

          {/* <NavbarItem>
            <img className='logo' src={logo} />
          </NavbarItem> */}
          <Link to='/'>
            <NavbarItem className='navtitle raleway'>
              <img className='icon'src={require('./logo-separated.png')} alt='' />
              <strong>Q-seum</strong>
            </NavbarItem>
          </Link>
          <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
        </NavbarBrand>
        <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
          <NavbarStart>
            <NavbarItem className='tagline'>Hop through the lines</NavbarItem>
          </NavbarStart>
          {this.props.token && (
            <NavbarEnd className='header-links'>
              <Link to='/'>
                {this.props.admin === 'true' ? (
                  <NavbarItem isHoverable><i className='fas fa-home' /> Home</NavbarItem>
                ) : (
                  <NavbarItem isHoverable onClick={this.handleClick}><i className='fas fa-home' /> Home</NavbarItem>
                )}
              </Link>
              <Link to='/Map'>
                <NavbarItem isHoverable onClick={this.handleClick}><i className='fas fa-map' /> Museum Map</NavbarItem>
              </Link>
              {this.props.admin !== 'true' && (
                <Link to='/report-issue'>
                  <NavbarItem isHoverable><i class='far fa-comment' /> Report an issue</NavbarItem>
                </Link>
              )}
              <Link to='/profile'>
                <NavbarItem isHoverable><i class='far fa-address-card' /> Your Profile</NavbarItem>
              </Link>
              <Link to='/'>
                <NavbarItem isHoverable onClick={this.handleLogout}><i className='fas fa-sign-out-alt' /> Logout</NavbarItem>
              </Link>
            </NavbarEnd>
          )}
        </NavbarMenu>
      </Navbar>
    )
  }
}

export default Header
