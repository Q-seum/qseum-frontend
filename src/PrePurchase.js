/* global localStorage */

import React, { Component } from 'react'
import './App.css'
// import { Link } from 'react-router-dom'
// import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button, Container, Checkbox, Select } from 'bloomer'
import { injectStripe, CardElement } from 'react-stripe-elements'

class PrePurchase extends Component {
  constructor () {
    super()
    this.state = {
      generalAdmission: 0,
      seniors: 0,
      kids: 0,
      total: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.updateTotal = this.updateTotal.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.props)
    this.props.stripe.createToken().then(({token}) => console.log(token))
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
      total: (this.state.generalAdmission * 20) + (this.state.seniors * 18) + (this.state.kids * 15)
    })
  }

  // updateTotal () {
  //   this.setState({
  //     total: (Number(this.state.generalAdmission) * 20) + (Number(this.state.kids) * 15) + (Number(this.state.seniors) * 18)
  //   })
  // }

  render () {
    return (
      <div>
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
        <div className='ticketForm'>
          <form>
            <Field>
              <Label htmlFor='generalAdmission'><i class='fas fa-user' />General Admission: $20</Label>
              <Control>
                <Input type='number' name='generalAdmission' id='generalAdmission' onInput={this.handleChange} />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='seniors'><i class='fas fa-user' />Senior Ticket: $18</Label>
              <Control>
                <Input type='number' pattern='[0-9]*' name='seniors' id='seniors' onInput={this.handleChange} />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='kids'><i class='fas fa-user' />Kids Ticket: $15</Label>
              <Control>
                <Input type='number' step='0.01' name='kids' id='kids' onInput={this.handleChange} />
              </Control>
            </Field>

            {/* <Field>
              <Label htmlFor='password'><i className='fas fa-key' /> Password</Label>
              <Control>
                <Input type='password' name='password' onChange={this.handleChange} id='password' />
                <div className='error-msg hidden danger-text'>password is required</div>
              </Control>
            </Field> */}
            <Field>
              <Label><i className='fas fa-key' /> Total Cost</Label>
              <div>${this.state.total}</div>
            </Field>

            <Checkbox> Is this a gift?</Checkbox>
          </form>
        </div>
      </div>
    )
  }
}

export default injectStripe(PrePurchase)
