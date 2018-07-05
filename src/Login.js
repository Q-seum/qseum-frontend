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
        this.props.history.push('/')
      })
      .catch(err => {
        const inputs = document.querySelectorAll('Input')
        const error = document.querySelector('.error-msg')
        error.innerHTML = `<p class='danger-text'>${err.response.body.error}</p>`
        inputs.forEach(input => {
          input.classList.add('danger-input')
        })
      })
  }

  render () {
    return (
      <div className='Login'>
        <Title className='raleway login-title'>Login</Title>
        <form onSubmit={this.handleSubmit} className='login-form'>
          <Field>
            <Label htmlFor='username' className='raleway'><i className='fas fa-user' /> Username</Label>
            <Control>
              <Input type='text' name='username' className='input' onChange={this.handleChange} id='username' />
            </Control>
          </Field>

          <Field className='password-field'>
            <Label htmlFor='password' className='label'><i className='fas fa-key' /> Password</Label>
            <Control>
              <Input type='password' name='password' onChange={this.handleChange} id='password' />
            </Control>
          </Field>

          <div className='error-msg' />

          <div className='button-container'>
            <button isColor='primary' type='submit' className='login-button'>Login</button>
          </div>

          <div className='link-container'>
            <Link to='/password-reset'><a className='login-links'>Forgot Password?</a></Link> | <Link to='/register'><a className='login-links'>Sign up for Q-seum</a></Link>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
