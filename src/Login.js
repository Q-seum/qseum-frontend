import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

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
    this.props.history.push('/')
  }

  render () {
    return (
      <div className='Login'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='input-field'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' onChange={this.handleChange} id='username' />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={this.handleChange} id='password' />
          </div>
          <button type='submit'>Login</button>
        </form>
        <div>
          New to Q-seum?
        </div>
        <Link to='/register'>
          <button>Register</button>
        </Link>
        <div>
          <a href='https://www.lifeandscience.org/purchase' target='_blank'>Sign up for a membership</a>
        </div>
      </div>
    )
  }
}

export default Login
