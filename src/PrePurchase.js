/* global localStorage */

import React, { Component } from 'react'
import './App.css'
// import { Link } from 'react-router-dom'
// import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button, Container } from 'bloomer'
import { injectStripe, CardElement } from 'react-stripe-elements'

class PrePurchase extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.props)
    this.props.stripe.createToken().then(({token}) => console.log(token))
  }

  render () {
    return (
      <div className='PrePurchase'>
        <Container hasTextAlign='centered'>
          <Box className='transparent-box'>
            <form onSubmit={this.handleSubmit}>
              Card details
              <CardElement style={{base: {fontSize: '18px'}}} />
              <button type='submit'>Submit payment</button>
            </form>
          </Box>
        </Container>
      </div>
    )
  }
}

export default injectStripe(PrePurchase)
