/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title, Field, Control, Input, Label, Button } from 'bloomer'
import { Link } from 'react-router-dom'
import request from 'superagent'

class RecoverPassword extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      recoverPassword: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    request
      .post('https://secure-temple-21963.herokuapp.com/api/v1/password_resets')
      // .set('X-Requested-With', 'XMLHttpRequest')
      .send({
        email: this.state.email
      })
      .then(res => {
        console.log(res)
        // this.props.history.push('/')
        this.setState({
          recoverPassword: true
        })
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render () {
    return (
      <div className='RecoverPassword'>
        <Box className='transparent-box'>
          {!this.state.recoverPassword ? (
            <Content>
              <form onSubmit={this.handleSubmit}>
                <Field>
                  <Label htmlFor='email'>Enter your email to reset password</Label>
                  <Control>
                    <Input type='email' name='email' onChange={this.handleChange} id='email' />
                  </Control>
                </Field>

                <Field isGrouped>
                  <Control>
                    <Button type='submit'>Submit</Button>
                  </Control>
                  <Control>
                    <Link to='/'>
                      <Button isColor='danger'>Cancel</Button>
                    </Link>
                  </Control>
                </Field>
              </form>
            </Content>
          ) : (
            <Content>
              <div>
                <p>
                  You should recieve an email from the Q-seum team within a few minutes.
                  Click the link in the email to reset your password!
                </p>
                <Link to='/'>
                  <Button isColor='primary'>Back</Button>
                </Link>
              </div>
            </Content>
          )}
        </Box>
      </div>
    )
  }
}

export default RecoverPassword
