import React, { Component } from 'react'
import './App.css'
// import { request } from 'https';
// import { Router, Route } from 'react-router-dom'
// import QRCode from 'qrcode.react'
import request from 'superagent'

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
      })
      .catch(err => {
        console.log(err)
      })

    this.props.history.push('/')
  }

  render () {
    return (
      <div className='Register'>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='input-field'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' onChange={this.handleChange} id='username' />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={this.handleChange} id='password' />
          </div>
          <div className='input-field'>
            <label htmlFor='accountNumber'>Museum Account Number</label>
            <input type='text' name='account' id='account' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label htmlFor='accountNumber'>Email Address</label>
            <input type='email' name='email' id='email' onChange={this.handleChange} />
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    )
  }
}

export default Register
