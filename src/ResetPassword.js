/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Box, Content, Title, Field, Control, Input, Label, Button } from 'bloomer'
import { Link } from 'react-router-dom'
import request from 'superagent'

class ResetPassword extends Component {
  constructor () {
    super()
    this.state = {
      password: '',
      new_token: '',
      used: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    request
      .patch(`https://secure-temple-21963.herokuapp.com/api/v1/password_resets/${this.props.match.params.id}`)
      .send({
        new_token: this.props.match.params.new_token,
        used: true,
        password: this.state.password
      })
      .then(res => {
        console.log(res)
        this.props.history.push('/')
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
    console.log(this.props)
    console.log(this.props.match.params.id)
    return (
      <div className='ResetPassword'>
        <Box className='transparent-box'>
          <Content>
            <form onSubmit={this.handleSubmit}>
              <Field>
                <Label htmlFor='password'>New Password</Label>
                <Control>
                  <Input type='password' name='password' onChange={this.handleChange} id='password' />
                </Control>
              </Field>

              <Field isGrouped>
                <Control>
                  <Button isColor='primary' type='submit'>Submit</Button>
                </Control>
                <Control>
                  <Link to='/'>
                    <Button isColor='danger'>Cancel</Button>
                  </Link>
                </Control>
              </Field>
            </form>
          </Content>
        </Box>
      </div>
    )
  }
}

export default ResetPassword
