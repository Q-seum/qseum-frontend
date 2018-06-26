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
        console.log(res)
        localStorage.token = res.body.token
        localStorage.id = res.body.id
        this.props.updateState()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div className='Login'>
        <Box>
          <Title>Login</Title>
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
              <Control>
                <Button type='submit'>Login</Button>
              </Control>
            </Field>
          </form>
          <div>
          New to Q-seum?
          </div>
          <Link to='/register'>
            <Button>Register</Button>
          </Link>
          <div>
            <a href='https://www.lifeandscience.org/purchase' target='_blank'>Sign up for a membership</a>
          </div>
        </Box>
      </div>
    )
  }
}

export default Login
