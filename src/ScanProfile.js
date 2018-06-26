/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import request from 'superagent'

class ScanProfile extends Component {
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
      <div className='ScanProfile'>
        <h1>{this.state.username}'s profile</h1>
        <div>Username: {this.state.username}</div>
        <div>Email: {this.state.email}</div>
      </div>
    )
  }
}

export default ScanProfile
