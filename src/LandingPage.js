/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button, Container } from 'bloomer'

class LandingPage extends Component {
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
      <div className='LandingPage'>
        <Container hasTextAlign='centered'>
          <div>
            <div className='logo-title'>
              <img width='150px' src={require('./logo-separated.png')} />
              <h1 className='landingpage-title'>Q-seum</h1>
              <div>Hop through the lines</div>
            </div>            
            <div className='button-container'>
              <Link to='/login'>
                <Button className='rounded-button' isColor='primary'>Login</Button>
              </Link>
              <Link to='/register'>
                <Button className='rounded-button'>Register</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default LandingPage
