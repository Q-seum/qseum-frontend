import React, { Component } from 'react'
import './App.css'
// import { Router, Route } from 'react-router-dom'
// import QRCode from 'qrcode.react'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      accountNumber: ''
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
    this.props.history.push('/')
  }

  render () {
    return (
      <div className='Register'>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='input-field'>
            <label for='username'>Username</label>
            <input type='text' name='username' onChange={this.handleChange} id='username' />
          </div>
          <div className='input-field'>
            <label for='password'>Password</label>
            <input type='password' name='password' onChange={this.handleChange} id='password' />
          </div>
          <div className='input-field'>
            <label for='accountNumber'>Museum Account Number</label>
            <input type='text' name='accountNumber' id='accountNumber' onChange={this.handleChange} />
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    )
  }
}

export default Register
