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
        error.innerHTML = `<p class='help is-danger'>${err.response.body.error}</p>`
        inputs.forEach(input => {
          input.classList.add('is-danger')
        })
      })
  }

  render () {
    return (
      <div className='Login'>
        <Title className='raleway' >Login</Title>
        <form onSubmit={this.handleSubmit}>
          <Field>
            <Label htmlFor='username' className='raleway'><i className="fas fa-user"></i> Username</Label>
            <Control>
              <Input type='text' name='username' onChange={this.handleChange} id='username' />
            </Control>
          </Field>

          <Field className='password-field'>
            <Label htmlFor='password' className='raleway'><i className='fas fa-key' /> Password</Label>
            <Control>
              <Input type='password' name='password' onChange={this.handleChange} id='password' />
            </Control>
            <Link to='/password-reset'>
              Forgot Password?
            </Link>
          </Field>

          <div className='error-msg' />

          <Field isGrouped>
            <Control>
              <Button isColor='primary' type='submit'>Login</Button>
            </Control>
            <Control>
              <Link to='/register'>
                <Button>New Account</Button>
              </Link>
            </Control>
          </Field>
        </form>
        {/* <p className='recover'>
          <Link to='/recover-password'>
            <a>Forgot Password?</a>
          </Link>
        </p> */}
        <p>
          <a href='https://www.lifeandscience.org/purchase' target='_blank'>Sign up for a museum membership!</a>
        </p>
      </div>
    )
  }
}

export default Login
