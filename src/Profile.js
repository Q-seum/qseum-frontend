/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Content, Box, Button, Field, Control, Label, Input } from 'bloomer'

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
      selfie: '',
      updateSelfie: false
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateSelfie = this.updateSelfie.bind(this)
  }

  updateSelfie (e) {
    e.preventDefault()
    this.setState({
      updateSelfie: !this.state.updateSelfie
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log('submitting')
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
        console.log('result',res)
        console.log('expire',res.body.data.expirationDate)
        this.setState({
          username: res.body.data.attributes.username,
          account: res.body.data.attributes.account,
          membershipType: res.body.data.attributes.membershipType,
          email: res.body.data.attributes.email,
          accommodations: res.body.data.attributes.accommodations,
          joinDate: res.body.data.attributes.joinDate,
          expirationDate: res.body.data.attributes.expirationDate,
          selfie: res.body.data.attributes.selfie
        })
      })
  }

  render () {
    return (
      <div className='Profile'>
        <Box className='transparent-box'>
          <Content>
            {!this.state.updateSelfie ? (
              <div>
                <h1>Your Profile</h1>
                <img src={this.state.selfie} className='avi' />
                <div><strong>Username: </strong>{this.state.username}</div>
                <div><strong>Email: </strong>{this.state.email}</div>
                <div><strong>Membership type: </strong>{this.state.membershipType} person pass</div>
                <div><strong>Membership Join Date: </strong>{this.state.joinDate}</div>
                <div><strong>Membership Expiration Date: </strong>{this.state.expirationDate}</div>
                {this.state.accommodations ? (
                  <div><strong>Accommodations: </strong>{this.state.accomodations}</div>
                ) : (
                  <div><strong>Accommodations: </strong>None</div>
                )}
              
                <Field isGrouped hasAddons='centered'>
                  <Control>
                    <Link to='/'>
                      <Button isColor='danger' onClick={this.handleLogout}>Logout</Button>
                    </Link>
                  </Control>
                  <Control>
                    <Button isColor='primary' onClick={this.updateSelfie}>Update Selfie</Button>
                    <div id='modal' />
                  </Control>
                </Field>
              </div>
            ):(
              <div>
                <h1>Choose a new profile picture</h1>
                <form onSubmit={this.handleSubmit}>
                  <Field>
                    <Label>Profile Picture</Label>
                    <Control>
                      <Input type='file' name='photo' accept='image/*;capture=camera' onChange={this.handleChange} />
                    </Control>
                  </Field>
                  <Field isGrouped hasAddons='centered'>
                    <Control>
                      {/* <Link to='/'> */}
                      <Button isColor='primary' type='submit' onClick={this.updateSelfie}>Save</Button>
                      {/* </Link> */}
                    </Control>
                    <Control>
                      <Button isColor='danger' onClick={this.updateSelfie}>Cancel</Button>
                      <div id='modal' />
                    </Control>
                  </Field>
                </form>
              </div>
            )}
          </Content>
        </Box>
      </div>
    )
  }
}

export default Profile
