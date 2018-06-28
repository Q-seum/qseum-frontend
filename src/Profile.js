/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Content, Box, Button } from 'bloomer'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      account: '',
      membershipType: '',
      email: '',
      accommodations: '',
      joinDate: '',
      expirationDate: '',
      selfie: ''
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    localStorage.clear()
    this.props.updateState()
    this.props.history.push('/')
  }

  componentDidMount () {
    request
      .get(`https://secure-temple-21963.herokuapp.com/api/v1/users/${localStorage.id}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .then(res => {
        console.log(res)
        this.setState({
          username: res.body.data.attributes.username,
          account: res.body.data.attributes.account,
          membershipType: res.body.data.attributes.membershipType,
          email: res.body.data.attributes.email,
          accommodations: res.body.data.accommodations,
          joinData: res.body.data.joinDate,
          expirationData: res.body.data.expirationDate,
          selfie: res.body.data.attributes.selfie
        })
      })
  }

  render () {
    return (
      <div className='Profile'>
        <Box className='transparent-box'>
          <Content>
            <h1>Your Profile</h1>
            <img src={this.state.selfie} className='avi' />
            <div>Username: {this.state.username}</div>
            <div>Email: {this.state.email}</div>
            <div>Membership type: {this.state.membershipType} person pass</div>
            <Link to='/'>
              <Button isColor='danger' onClick={this.handleLogout}>Logout</Button>
            </Link>
          </Content>
        </Box>
      </div>
    )
  }
}

export default Profile
