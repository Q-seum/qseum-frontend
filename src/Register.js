import React, { Component } from 'react'
import './App.css'
// import { Link } from 'react-router-dom'
// import QRCode from 'qrcode.react'
import request from 'superagent'
import { Title, Field, Label, Control, Input } from 'bloomer'
import firebase from './firebase'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      account: '',
      email: '',
      accommodations: '',
      selfie: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const usernameError = document.querySelector('.username-taken')
    const accountError = document.querySelector('.account-taken')
    const accountInvalid = document.querySelector('.account-invalid')
    const emailTaken = document.querySelector('.email-taken')
    const username = document.querySelector('Input[name="username"]')
    const account = document.querySelector('Input[name="account"]')
    const email = document.querySelector('Input[name="email"]')
    const inputs = document.querySelectorAll('.required')
    let name
    inputs.forEach(input => {
      if (!input.value) {
        input.classList.add('danger-input')
        // console.log(input.name)
        input.nextElementSibling.classList.remove('hidden')
      } else {
        input.classList.remove('danger-input')
        input.nextElementSibling.classList.add('hidden')
      }
    })
    if (this.state.selfie && this.state.username && this.state.password && this.state.account && this.state.email) {
      const file = document.querySelector('input[type=file]').files[0]
      const ref = firebase.storage().ref()
      name = (+new Date()) + '-' + file.name
      const metadata = { contentType: file.type }
      const task = ref.child(name).put(file, metadata).catch(err => console.log(err))
      task
        .then(snapshot => console.log(snapshot))
    }
    console.log(name)
    request
      .post('https://secure-temple-21963.herokuapp.com/api/v1/users')
      // .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        username: this.state.username,
        password: this.state.password,
        account: this.state.account,
        email: this.state.email,
        accommodations: this.state.accommodations,
        selfie: `https://firebasestorage.googleapis.com/v0/b/q-seum.appspot.com/o/${name}?alt=media&token=d84cc00a-df11-4a4c-ba3d-d0f979456873`
      })
      .then(res => {
        console.log(res)
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err.response.body)
        if (err.response.body.username && err.response.body.username[0] === 'has already been taken') {
          usernameError.classList.remove('hidden')
          username.classList.add('danger-input')
        } else if (this.state.username) {
          username.classList.remove('danger-input')
          usernameError.classList.add('hidden')
        } else {
          usernameError.classList.add('hidden')
        }

        if (err.response.body.account && err.response.body.account[0] === '2 users already exist for this membership account') {
          accountError.classList.remove('hidden')
          account.classList.add('danger-input')
        } else if (this.state.account) {
          account.classList.remove('danger-input')
          accountError.classList.add('hidden')
        } else {
          accountError.classList.add('hidden')
        }

        if (err.response.body.account && err.response.body.account[0] === 'Not a valid account number' && this.state.account) {
          accountInvalid.classList.remove('hidden')
          account.classList.add('danger-input')
        } else if (this.state.account) {
          account.classList.remove('danger-input')
          accountInvalid.classList.add('hidden')
        } else {
          accountInvalid.classList.add('hidden')
        }

        if (err.response.body.email && err.response.body.email[0] === 'has already been taken' && this.state.email) {
          emailTaken.classList.remove('hidden')
          email.classList.add('danger-input')
          console.log(err.response.body.email[0])
        } else if (this.state.account) {
          email.classList.remove('danger-input')
          emailTaken.classList.add('hidden')
        } else {
          emailTaken.classList.add('hidden')
        }
      })
  }

  render () {
    // console.log(this.state.selfie)
    return (
      <div className='Register'>
        <Title className='raleway login-title'>Register</Title>
        <form onSubmit={this.handleSubmit} className='register-form'>
          <Field>
            <Label htmlFor='username'><i class='fas fa-user' /> Username</Label>
            <Control>
              <Input type='text' name='username' onChange={this.handleChange} id='username' className='required' />
              <div className='error-msg hidden danger-text'>username is required</div>
              <div className='error-msg danger-text hidden username-taken'>username already taken</div>
            </Control>
          </Field>

          <Field>
            <Label htmlFor='password'><i className='fas fa-key' /> Password</Label>
            <Control>
              <Input className='required' type='password' name='password' onChange={this.handleChange} id='password' />
              <div className='error-msg hidden danger-text'>password is required</div>
            </Control>
          </Field>

          <Field>
            <Label htmlFor='account'><i className='fas fa-address-card' /> Museum Account Number</Label>
            <Control>
              <Input className='required' type='text' name='account' onChange={this.handleChange} id='account' />
              <div className='error-msg hidden danger-text'>account number is required</div>
              <div className='error-msg danger-text hidden account-taken'>2 users already exist for this membership account</div>
              <div className='error-msg danger-text hidden account-invalid'>not a valid account number</div>
            </Control>
          </Field>

          <Field>
            <Label htmlFor='email'><i className='fas fa-envelope' /> Email Address</Label>
            <Control>
              <Input className='required' type='email' name='email' onChange={this.handleChange} id='email' />
              <div className='error-msg hidden danger-text'>email is required</div>
              <div className='error-msg hidden danger-text email-taken'>email has already been taken</div>
            </Control>
          </Field>
          <Field>
            <Label htmlFor='accommodations' className='label'><i class='fas fa-wheelchair' /> Accommodations(Optional)</Label>
            <Control>
              <Input value={this.state.accommodations} type='text' name='accommodations' onChange={this.handleChange} id='accommodations' />
            </Control>
          </Field>
          <Field>
            <Label><i class='fas fa-camera' /> Profile Picture</Label>
            <Control>
              <Input className='required' type='file' name='selfie' accept='image/*;capture=camera' onChange={this.handleChange} />
              <div className='error-msg hidden danger-text'>photo is required</div>
            </Control>
          </Field>

          <div className='button-container'>
            <button className='login-button' type='submit'>Register</button>
          </div>
          {/* <Control>
            <Link to='/'>
              <Button isColor='danger'>Cancel</Button>
            </Link>
          </Control> */}
        </form>
      </div>
    )
  }
}

export default Register
