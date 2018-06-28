/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button } from 'bloomer'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
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
      .post('https://secure-temple-21963.herokuapp.com/api/v1/logins')
      .send({
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        // console.log(res)
        localStorage.token = res.body.token
        localStorage.id = res.body.id
        localStorage.admin = res.body.admin
        this.props.updateState()
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  render () {
    return (
      <div className='Login'>
        <Box className='transparent-box'>
          <Title>Login</Title>
          <form onSubmit={this.handleSubmit}>
            <Field>
              <Label htmlFor='username'>Username</Label>
              <Control>
                <Input type='text' name='username' onChange={this.handleChange} id='username' />
              </Control>
            </Field>

            <Field className='password-field'>
              <Label htmlFor='password'>Password</Label>
              <Control>
                <Input type='password' name='password' onChange={this.handleChange} id='password' />
              </Control>
            </Field>

            <Field isGrouped>
              <Control>
                <Button type='submit'>Login</Button>
              </Control>
              <Control>
                <Link to='/register'>
                  <Button>New Account</Button>
                </Link>
              </Control>
            </Field>
          </form>
          <p>
            <a href='https://www.lifeandscience.org/purchase' target='_blank'>Sign up for a membership</a>
          </p>
        </Box>
      </div>
    )
  }
}

export default Login
