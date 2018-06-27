/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Redirect } from 'react-router-dom'
import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button, Content } from 'bloomer'

class ScanProfile extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      username: '',
      account: '',
      membershipType: '',
      email: '',
      accommodations: '',
      joinDate: '',
      expirationDate: '',
      visitors: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // console.log(localStorage.id)
  }

  componentDidMount () {
    request
      .get(`https://secure-temple-21963.herokuapp.com/api/v1/users/${this.props.match.params.userId}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .then(res => {
        console.log(res)
        this.setState({
          id: res.body.data.id,
          username: res.body.data.attributes.username,
          account: res.body.data.attributes.accountNumber,
          membershipType: res.body.data.attributes.membershipType,
          email: res.body.data.attributes.email,
          accommodations: res.body.data.accommodations,
          joinData: res.body.data.joinDate,
          expirationDate: res.body.data.expirationDate
        })
      })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    console.log(this.state.id, this.state.account, this.state.visitors)
    e.preventDefault()
    request
      .post('https://secure-temple-21963.herokuapp.com/api/v1/visits')
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        user_id: this.state.id,
        account: this.state.account,
        visitors: Number(this.state.visitors)
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    if (this.props.admin === 'true') {
      return (
        <div className='ScanProfile'>
          <Box>
            <Title>Check In {this.state.username}</Title>
            <form onSubmit={this.handleSubmit}>
              <Field>
                <Label htmlFor='visitors'>Number of Visitors</Label>
                <Control>
                  <Input type='number' name='visitors' onChange={this.handleChange} id='visitors' />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Button type='submit'>Check In</Button>
                </Control>
              </Field>
            </form>
            <Content>
              <h1>{this.state.username}'s profile</h1>
              <div>Username: {this.state.username}</div>
              <div>Email: {this.state.email}</div>
              <div>Account: {this.state.account}</div>
              <div>MembershipType: {this.state.membershipType}</div>
              <div>Accommodations: {this.state.accommodations}</div>
              <div>Date Joined: {this.state.joinData}</div>
              <div>Membership Expiration Date: {this.state.expirationDate}</div>
            </Content>
          </Box>
        </div>
      )
    } else {
      return <Redirect to={'/'} />
    }
  }
}

export default ScanProfile
