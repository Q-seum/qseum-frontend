/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title, Field, Control, Input, Label, Button } from 'bloomer'

class RecoverPassword extends Component {
  render () {
    return (
      <div className='RecoverPassword'>
        <Box className='transparent-box'>
          <Content>
            <form onSubmit={this.handleSubmit}>
              <Field>
                <Label htmlFor='email'>Enter your email to reset password</Label>
                <Control>
                  <Input type='email' name='email' onChange={this.handleChange} id='email' />
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

export default RecoverPassword
