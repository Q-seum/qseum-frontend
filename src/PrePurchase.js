/* global localStorage */

import React, { Component } from 'react'
import './App.css'
// import { Link } from 'react-router-dom'
// import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button, Container, Checkbox, Select } from 'bloomer'
import { injectStripe, CardElement } from 'react-stripe-elements'
import request from 'superagent'

class PrePurchase extends Component {
  constructor () {
    super()
    this.state = {
      general: 0,
      seniors: 0,
      child: 0,
      military: 0,
      total: 0,
      name: '',
      email: '',
      new_token: '',
      gift: false,
      recip_name: '',
      recip_email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gift = this.gift.bind(this)
    // this.updateTotal = this.updateTotal.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.props)
    this.props.stripe.createToken().then(({token}) => {
      console.log(token)
      this.setState({
        new_token: token.id
      })
      console.log('token', this.state.new_token)
      console.log(((Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.seniors) * 18) + (Number(this.state.military) * 18)) * 100)
    })
    request
      .post('https://secure-temple-21963.herokuapp.com/api/v1/charges')
      // .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        name: this.state.name,
        email: this.state.email,
        amount: (((Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.seniors) * 18) + (Number(this.state.military) * 18)) * 100),
        source: this.state.new_token,
        general: Number(this.state.general),
        senior: Number(this.state.senior),
        military: Number(this.state.military),
        child: Number(this.state.child),
        recip_email: this.state.recip_email
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
      // total: (Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.seniors) * 18)

    })
  }

  gift () {
    this.setState({
      gift: !this.state.gift
    })
  }

  // updateTotal () {
  //   this.setState({
  //     total: (Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.seniors) * 18)
  //   })
  // }

  render () {
    return (
      <div>
        <div className='ticketForm'>
          <Title className='raleway'>Pre-Purchase Tickets</Title>
          <form>
            <Field>
              <Label htmlFor='general'>General Admission ($20)</Label>
              <Control>
                <Input className='numberInput' pattern='[0-9]*' name='general' id='general' onChange={this.handleChange} />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='child'>Children ages 3-12 ($15)</Label>
              <Control>
                <Input className='numberInput' pattern='[0-9]*' name='child' id='child' onChange={this.handleChange} />
              </Control>
            </Field>


            <Field>
              <Label htmlFor='seniors'>Senior Ticket ($18)</Label>
              <Control>
                <Input className='numberInput' pattern='[0-9]*' name='seniors' id='seniors' onChange={this.handleChange} />
              </Control>
            </Field>

            <Field>
              <Label htmlFor='military'>Military Ticket: ($18)</Label>
              <Control>
                <Input className='numberInput' pattern='[0-9]*' name='military' id='military' onChange={this.handleChange} />
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
              <Label className='raleway totalCost'>Total: ${(Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.seniors) * 18) + (Number(this.state.military) * 18)}</Label>
            </Field>
            <Checkbox className='checkbox' onChange={this.gift}> Is this a gift?</Checkbox>
            {this.state.gift && (
              <div className='emailGift'>
                <Field>
                  <Label>Recipient Name</Label>
                  <Input type='text' name='recipientName' id='recipientName' onChange={this.handleChange} />
                  <Label>Recipient Email</Label>
                  <Input type='email' name='recip_email' id='recip_email' onChange={this.handleChange} />
                </Field>
              </div>
            )}
            <Field>
              <Label>Your Name</Label>
              <Input type='text' name='name' id='name' onChange={this.handleChange} />
              <Label>Your email</Label>
              <Input type='email' name='email' id='email' onChange={this.handleChange} />
            </Field>
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
