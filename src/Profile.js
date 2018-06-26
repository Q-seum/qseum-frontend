/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import request from 'superagent'

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
      expirationDate: ''
    }
    // console.log(localStorage.id)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  logout () {
    localStorage.clear()
    // update token?
  }

  componentDidMount () {
    request
      .get(`https://secure-temple-21963.herokuapp.com/api/v1/users/${localStorage.id}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .then(res => {
        this.setState({
          username: res.body.data.attributes.username,
          account: res.body.data.attributes.account,
          membershipType: res.body.data.attributes.membershipType,
          email: res.body.data.attributes.email,
          accommodations: res.body.data.accommodations,
          joinData: res.body.data.joinDate,
          expirationData: res.body.data.expirationDate
        })
      })
  }

  render () {
    return (
      <div className='Profile'>
        <h1>Your Profile</h1>
        <div>Username: {this.state.username}</div>
        <div>Email: {this.state.email}</div>
        <Link to='/'>
          <button onClick={this.logout}>Logout</button>
        </Link>
      </div>
    )
  }
}

export default Profile
