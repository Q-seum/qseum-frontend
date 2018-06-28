import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
// import QRCode from 'qrcode.react'
import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button } from 'bloomer'
import firebase from './firebase'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      account: '',
      email: '',
      photo: ''
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
    var file = document.querySelector('input[type=file]').files[0]
    console.log(file.name)
    const ref = firebase.storage().ref()
    console.log(firebase.storage().ref())
    const name = file.name
    const metadata = { contentType: file.type }
    const task = ref.child(name).put(file, metadata)
    task
      .then(snapshot => console.log(snapshot))
    request
      .post('https://secure-temple-21963.herokuapp.com/api/v1/users')
      // .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        username: this.state.username,
        password: this.state.password,
        account: this.state.account,
        email: this.state.email
      })
      .then(res => {
        console.log(res)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div className='Register'>
        <Box className='transparent-box'>
          <Title>Register!</Title>
          <form onSubmit={this.handleSubmit}>
            <Field>
              <Label htmlFor='username'>Username</Label>
              <Control>
                <Input type='text' name='username' onChange={this.handleChange} id='username' />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='password'>Password</Label>
              <Control>
                <Input type='password' name='password' onChange={this.handleChange} id='password' />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='account'>Museum Account Number</Label>
              <Control>
                <Input type='text' name='account' onChange={this.handleChange} id='account' />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='email'>Email Address</Label>
              <Control>
                <Input type='email' name='email' onChange={this.handleChange} id='email' />
              </Control>
            </Field>

            <input type='file' name='photo' accept='image/*;capture=camera' onChange={this.handleChange} />

            <Field isGrouped>
              <Control>
                <Button type='submit'>Register</Button>
              </Control>
              <Control>
                <Link to='/'>
                  <Button>Cancel</Button>
                </Link>
              </Control>
            </Field>
          </form>
        </Box>
      </div>
    )
  }
}

export default Register
