/* global localStorage */

import React, { Component } from 'react'
import './App.css'
// import { Link } from 'react-router-dom'
import request from 'superagent'
import { Content, Box, Button, Field, Control, Label, Input, Title } from 'bloomer'
import firebase from './firebase'

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
      editProfile: false,
      primaryUser: '',
      secondaryUser: ''
      // newSelfie: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.editProfile = this.editProfile.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeSelfie = this.changeSelfie.bind(this)
  }

  editProfile (e) {
    e.preventDefault()
    this.setState({
      editProfile: !this.state.editProfile
    })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeSelfie (e) {
    e.preventDefault()
    // if (this.state.newSelfie) {
    const file = document.querySelector('input[type=file]').files[0]
    const ref = firebase.storage().ref()
    const name = (+new Date()) + '-' + file.name
    const metadata = { contentType: file.type }
    const task = ref.child(name).put(file, metadata).catch(err => console.log(err))
    task
      .then(snapshot => console.log(snapshot))
    request
      .patch(`https://secure-temple-21963.herokuapp.com/api/v1/users/${localStorage.id}`)
      // .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        selfie: `https://firebasestorage.googleapis.com/v0/b/q-seum.appspot.com/o/${name}?alt=media&token=d84cc00a-df11-4a4c-ba3d-d0f979456873`
      })
      .then(res => {
        console.log(res)
        this.setState({
          editProfile: false
        })
      })
      .catch((err) => {
        console.log(err.response)
      })
  // }
  }

  handleSubmit (e) {
    e.preventDefault()
    request
      .patch(`https://secure-temple-21963.herokuapp.com/api/v1/users/${localStorage.id}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        // new_token: this.props.match.params.new_token,
        // password: this.state.password
        username: this.state.username,
        accommodations: this.state.accommodations
      })
      .then(res => {
        console.log(res)
        // this.props.history.push('/')
        this.setState({
          editProfile: false
        })
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  componentDidMount () {
    console.log(localStorage.id)
    request
      .get(`https://secure-temple-21963.herokuapp.com/api/v1/users/${localStorage.id}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .then(res => {
        // console.log('result',res)
        // console.log('expire',res.body.data.expirationDate)
        this.setState({
          username: res.body.data.attributes.username,
          email: res.body.data.attributes.email,
          accommodations: res.body.data.attributes.accommodations,
          selfie: res.body.data.attributes.selfie,
          expirationDate: res.body.data.attributes.expirationDate,
          joinDate: res.body.data.attributes.joinDate,
          membershipType: res.body.data.attributes.membershipType,
          primaryUser: res.body.data.attributes.primaryUser,
          secondaryUser: res.body.data.attributes.secondaryUser

        })
      })
  }

  render () {
    return (
      <div className='Profile contain'>
        <Box className='transparent-box'>
          <Content>
            <div>
              <Title className='Raleway'>Your Account</Title>
              <img src={this.state.selfie} className='avi' alt='' />
              <div className='profile-details'>
                {this.state.secondaryUser ? (
                  <Field>
                    <Label><i class='far fa-address-card' /> Membership Holders:</Label>
                    <div>{this.state.primaryUser} & {this.state.secondaryUser}</div>
                  </Field>
                ) : (
                  <Field>
                    <Label><i class='far fa-address-card' /> Membership Holder:</Label>
                    <div>{this.state.primaryUser}</div>
                  </Field>
                )}
                <Field>
                  <Label htmlFor='username'><i className='fas fa-user' /> Username</Label>
                  <div>{this.state.username}</div>
                </Field>

                <Field>
                  <Label className='label'><i className='fas fa-envelope' /> Email</Label>
                  <div>{this.state.email}</div>
                </Field>

                <Field className='accommodations-field'>
                  <Label htmlFor='accommodations' className='label'><i className='fas fa-wheelchair' /> Accommodations</Label>
                  {this.state.accommodations ? (
                    <div>{this.state.accommodations}</div>
                  ) : (
                    <div>None</div>
                  )
                  }
                </Field>

                <Field>
                  <Label><i className='fas fa-users' /> Membership Type</Label>
                  <div>{this.state.membershipType} person admission</div>
                </Field>

                <Field>
                  <Label><i className='far fa-calendar-alt' /> Join Date</Label>
                  <div>{this.state.joinDate}</div>
                </Field>

                <Field>
                  <Label><i className='far fa-calendar-times' /> Expiration Date</Label>
                  <div>{this.state.expirationDate}</div>
                </Field>
              </div>
            </div>
          </Content>
        </Box>
      </div>
    )
  }
}

export default Profile
