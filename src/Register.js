import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
// import QRCode from 'qrcode.react'
import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button } from 'bloomer'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      account: '',
      email: ''
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
          <Title>Register</Title>
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
