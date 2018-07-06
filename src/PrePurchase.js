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
      [e.target.name]: e.target.value
      // total: (Number(this.state.generalAdmission) * 20) + (Number(this.state.kids) * 15) + (Number(this.state.seniors) * 18)

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
        <div className='ticketForm'>
          <Title>Pre-Purchase Tickets</Title>
          <form>
            <Field>
              <Label htmlFor='generalAdmission'>General Admission: $20</Label>
              <Control>
                <Input pattern='[0-9]*' name='generalAdmission' id='generalAdmission' onChange={this.handleChange} />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='seniors'>Senior Ticket: $18</Label>
              <Control>
                <Input pattern='[0-9]*' name='seniors' id='seniors' onChange={this.handleChange} />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='kids'>Kids Ticket: $15</Label>
              <Control>
                <Input pattern='[0-9]*' name='kids' id='kids' onChange={this.handleChange} />
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
              <Title className='totalCost'>${(Number(this.state.generalAdmission) * 20) + (Number(this.state.kids) * 15) + (Number(this.state.seniors) * 18)}</Title>
            </Field>
            <Checkbox> <strong>Is this a gift?</strong></Checkbox>
          </form>
        </div>
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
      </div>
    )
  }
}

export default injectStripe(PrePurchase)
