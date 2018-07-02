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
    if (this.state.photo) {
      var file = document.querySelector('input[type=file]').files[0]
      // console.log(file.name)
      const ref = firebase.storage().ref()
      // console.log(firebase.storage().ref())
      const name = (+new Date()) + '-' + file.name
      // const downloadTokens= file.downloadTokens
      const metadata = { contentType: file.type }
      const task = ref.child(name).put(file, metadata).catch(err => console.log(err))
      console.log(`https://firebasestorage.googleapis.com/v0/b/q-seum.appspot.com/o/${name}?alt=media&token=d84cc00a-df11-4a4c-ba3d-d0f979456873`)
      task
        .then(snapshot => console.log(snapshot))
      request
        .post('https://secure-temple-21963.herokuapp.com/api/v1/users')
        // .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          username: this.state.username,
          password: this.state.password,
          account: this.state.account,
          email: this.state.email,
          selfie: `https://firebasestorage.googleapis.com/v0/b/q-seum.appspot.com/o/${name}?alt=media&token=d84cc00a-df11-4a4c-ba3d-d0f979456873`
        })
        .then(res => {
          console.log(res)
          this.props.history.push('/')
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }

  render () {
    console.log(this.state.photo)
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
            <Field>
              <Label>Profile Picture</Label>
              <Control>
                <Input type='file' name='photo' accept='image/*;capture=camera' onChange={this.handleChange} />
              </Control>
            </Field>

            <Field isGrouped>
              <Control>
                <Button isColor='primary' type='submit'>Register</Button>
              </Control>
              <Control>
                <Link to='/'>
                  <Button isColor='danger'>Cancel</Button>
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
