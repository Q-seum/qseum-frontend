/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title, Field, Control, Input, Label, Button } from 'bloomer'
import { Link } from 'react-router-dom'

class ResetPassword extends Component {
  render () {
    return (
      <div className='ResetPassword'>
        <Box className='transparent-box'>
          <Content>
            <form onSubmit={this.handleSubmit}>
              <Field>
                <Label htmlFor='password'>New Password</Label>
                <Control>
                  <Input type='text' name='password' onChange={this.handleChange} id='password' />
                </Control>
              </Field>

              <Field>
                <Control>
                  <Button>Submit</Button>
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
