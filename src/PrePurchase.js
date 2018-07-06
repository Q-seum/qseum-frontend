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
      total: 0,
      gift: false,
      recipientName:'',
      recipientEmail: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gift = this.gift.bind(this)
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

  gift () {
    this.setState({
      gift: !this.state.gift
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
          <Title className='raleway'>Pre-Purchase Tickets</Title>
          <form>
            <Field>
              <Label htmlFor='generalAdmission'>General Admission: $20</Label>
              <Control>
                <Input className='numberInput' pattern='[0-9]*' name='generalAdmission' id='generalAdmission' onChange={this.handleChange} />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='seniors'>Senior Ticket: $18</Label>
              <Control>
                <Input className='numberInput' pattern='[0-9]*' name='seniors' id='seniors' onChange={this.handleChange} />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='kids'>Kids Ticket: $15</Label>
              <Control>
                <Input className='numberInput' pattern='[0-9]*' name='kids' id='kids' onChange={this.handleChange} />
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
              <Label className='raleway totalCost'>Total: ${(Number(this.state.generalAdmission) * 20) + (Number(this.state.kids) * 15) + (Number(this.state.seniors) * 18)}</Label>
            </Field>
            <Checkbox className='checkbox' onChange={this.gift}> Is this a gift?</Checkbox>
            {this.state.gift && (
              <div className='emailGift'>
                <Label>Recipient Name</Label>
                <Input type='text' name='recipientName' id='recipientName' onChange={this.handleChange} />
                <Label>Recipient Email</Label>
                <Input type='email' name='recipientEmail' id='recipientEmail' onChange={this.handleChange} />
              </div>
            )}
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
