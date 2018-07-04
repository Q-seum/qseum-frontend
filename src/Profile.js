/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Content, Box, Button, Field, Control, Label, Input, Text } from 'bloomer'

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
      editProfile: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.editProfile = this.editProfile.bind(this)
  }

  editProfile (e) {
    e.preventDefault()
    this.setState({
      editProfile: !this.state.editProfile
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    
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
            {!this.state.editProfile ? (
              <div>
                <h1 className='title'>Your Profile</h1>
                <img src={this.state.selfie} className='avi' />
                <div className='profile-details'>
                  <Field>
                    <Label htmlFor='username'><i class='fas fa-user' /> Username</Label>
                    <div>{this.state.username}</div>
                  </Field>

                  <Field>
                    <Label className='label'><i className='fas fa-envelope' /> Email</Label>
                    <div>{this.state.email}</div>
                  </Field>

                  <Field className='accomodations-field'>
                    <Label htmlFor='accomodations' className='label'><i class="fas fa-wheelchair" /> Accomodations</Label>
                    {this.state.accommodations ? (
                      <div>{this.state.accomodations}</div>
                    ) : (
                      <div>None</div>
                    )
                    }
                  </Field>

                  <Field>
                    <Label><i className='fas fa-camera' /> Membership Type</Label>
                    <div>{this.state.membershipType} person admission</div>
                  </Field>

                  <Field>
                    <Label><i className='fas fa-camera' /> Join Date</Label>
                    <div>{this.state.joinDate}</div>
                  </Field>

                  <Field>
                    <Label><i className='fas fa-camera' /> Expiration Date</Label>
                    <div>{this.state.joinDate}</div>
                  </Field>
                </div>

                <Field isGrouped hasAddons='centered'>
                  <Control>
                    <Button isColor='primary' onClick={this.editProfile}>Edit Profile</Button>
                    <div id='modal' />
                  </Control>
                </Field>
              </div>
            ) : (
              <div>
                <form>
                  <h1 className='title'>Edit Profile</h1>
                  <img src={this.state.selfie} className='avi' />
                  <div className='profile-details'>
                    <Field>
                      <Label htmlFor='username'><i class='fas fa-user' /> Username</Label>
                      <Control>
                        <Input value={this.state.username} type='text' name='username' onChange={this.handleChange} id='username' />
                      </Control>
                    </Field>

                    <Field className='password-field'>
                      <Label htmlFor='password' className='label'><i className='fas fa-key' /> Password</Label>
                      <Control>
                        <Input type='password' name='password' onChange={this.handleChange} id='password' />
                      </Control>
                    </Field>

                    <Field className='email-field'>
                      <Label htmlFor='email' className='label'><i className='fas fa-envelope' /> Email</Label>
                      <Control>
                        <Input value={this.state.email} type='email' name='email' onChange={this.handleChange} id='email' />
                      </Control>
                    </Field>

                    <Field className='accomodations-field'>
                      <Label htmlFor='accomodations' className='label'><i class="fas fa-wheelchair" /> Accomodations</Label>
                      <Control>
                        <Input value={this.state.accomodations} type='text' name='accomodations' onChange={this.handleChange} id='accomodations' />
                      </Control>
                    </Field>

                    <Field>
                      <Label><i class='fas fa-camera' /> Profile Picture</Label>
                      <Control>
                        <Input  type='file' name='selfie' accept='image/*;capture=camera' onChange={this.handleChange} />
                      </Control>
                    </Field>
                  </div>

                  <Field isGrouped hasAddons='centered'>
                    <Control>
                      {/* <Link to='/'> */}
                      <Button isColor='primary' type='submit' onClick={this.updateSelfie}>Update</Button>
                      {/* </Link> */}
                    </Control>
                    <Control>
                      <Button isColor='danger' onClick={this.editProfile}>Cancel</Button>
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
