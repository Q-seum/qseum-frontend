/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Title, Box, Field, Label, Control, Input, Button, Container, Checkbox, Content } from 'bloomer'
import { injectStripe, CardElement } from 'react-stripe-elements'
import request from 'superagent'

class PrePurchase extends Component {
  constructor () {
    super()
    this.state = {
      general: null,
      senior: null,
      child: null,
      military: null,
      total: 0,
      name: null,
      email: null,
      new_token: null,
      gift: false,
      recip_email: null,
      purchaseSubmitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.gift = this.gift.bind(this)
    this.addGeneralTicket = this.addGeneralTicket.bind(this)
    this.subtractGeneralTicket = this.subtractGeneralTicket.bind(this)
    this.addChildTicket = this.addChildTicket.bind(this)
    this.subtractChildTicket = this.subtractChildTicket.bind(this)
    this.addSeniorTicket = this.addSeniorTicket.bind(this)
    this.subtractSeniorTicket = this.subtractSeniorTicket.bind(this)
    this.addMilitaryTicket = this.addMilitaryTicket.bind(this)
    this.subtractMilitaryTicket = this.subtractMilitaryTicket.bind(this)
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
      console.log(((Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18) + (Number(this.state.military) * 18)) * 100)
    })
      .catch(err => {
        console.log(err)
      })
      .then(() => {
        request
          .post('https://secure-temple-21963.herokuapp.com/api/v1/charges')
          .send({
            name: this.state.name,
            email: this.state.email,
            amount: (((Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18) + (Number(this.state.military) * 18)) * 100),
            source: this.state.new_token,
            general: Number(this.state.general),
            senior: Number(this.state.senior),
            military: Number(this.state.military),
            child: Number(this.state.child),
            recip_email: this.state.recip_email
          })
          .then(res => {
            console.log(res)
            this.setState({
              purchaseSubmitted: true
            })
          })
          .catch(err => {
            console.log(err.response)
            const inputs = document.querySelectorAll('.required')
            const gift = document.querySelector('.gift')
            inputs.forEach(input => {
              if (!input.value) {
                input.classList.add('danger-input')
                // console.log(input.name)
                input.nextElementSibling.classList.remove('hidden')
              } else {
                input.classList.remove('danger-input')
                input.nextElementSibling.classList.add('hidden')
              }
            })
            if (this.state.gift && !gift.value) {
              gift.classList.add('danger-input')
              gift.nextElementSibling.classList.remove('hidden')
            } else if (this.state.gift) {
              gift.classList.remove('danger-input')
              gift.nextElementSibling.classList.add('hidden')
            }
          })
      })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
      // total: (Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18)

    })
  }

  gift () {
    this.setState({
      gift: !this.state.gift
    })
  }

  addGeneralTicket () {
    this.setState({
      general: this.state.general + 1
    })
  }

  subtractGeneralTicket () {
    if (this.state.general > 0) {
      this.setState({
        general: this.state.general - 1
      })
    }
  }

  addSeniorTicket () {
    this.setState({
      senior: this.state.senior + 1
    })
  }

  subtractSeniorTicket () {
    if (this.state.senior > 0) {
      this.setState({
        senior: this.state.senior - 1
      })
    }
  }

  addChildTicket () {
    this.setState({
      child: this.state.child + 1
    })
  }

  subtractChildTicket () {
    if (this.state.child > 0) {
      this.setState({
        child: this.state.child - 1
      })
    }
  }

  addMilitaryTicket () {
    this.setState({
      military: this.state.military + 1
    })
  }

  subtractMilitaryTicket () {
    if (this.state.military > 0) {
      this.setState({
        military: this.state.military - 1
      })
    }
  }

  render () {
    return (
      <div>
        {!this.state.purchaseSubmitted ? (
          <div className='PrePurchase'>
            <div className='ticketForm'>
              <Title className='raleway'>Purchase Admission</Title>
              <form>
                <Box className='transparent-box'>
                  <Field>
                    <Label className='ticket-label' htmlFor='general'>General Admission ($20)</Label>
                    <Control>
                      <div className='ticketNumber'>
                        <button type='button' onClick={this.subtractGeneralTicket}><i class='fas fa-minus' /></button>
                        {this.state.general ? (
                          this.state.general
                        ) : (
                          0
                        )}
                        <button type='button' onClick={this.addGeneralTicket}><i class='fas fa-plus' /></button>
                      </div>
                    </Control>
                  </Field>

                  <Field>
                    <Label className='ticket-label' htmlFor='child'>Children Ages 3-12 ($15)</Label>
                    <Control>
                      <div className='ticketNumber'>
                        <button type='button' onClick={this.subtractChildTicket}><i class='fas fa-minus' /></button>
                        {this.state.child ? (
                          this.state.child
                        ) : (
                          0
                        )}
                        <button type='button' onClick={this.addChildTicket}><i class='fas fa-plus' /></button>
                      </div>
                    </Control>
                  </Field>

                  <Field>
                    <Label className='ticket-label' htmlFor='senior'>Senior Admission ($18)</Label>
                    <Control>
                      <div className='ticketNumber'>
                        <button type='button' onClick={this.subtractSeniorTicket}><i class='fas fa-minus' /></button>
                        {this.state.senior ? (
                          this.state.senior
                        ) : (
                          0
                        )}
                        <button type='button' onClick={this.addSeniorTicket}><i class='fas fa-plus' /></button>
                      </div>
                    </Control>
                  </Field>

                  <Field>
                    <Label className='ticket-label' htmlFor='military'>Military Admission ($18)</Label>
                    <Control>
                      <div className='ticketNumber'>
                        <button type='button' onClick={this.subtractMilitaryTicket}><i class='fas fa-minus' /></button>
                        {this.state.military ? (
                          this.state.military
                        ) : (
                          0
                        )}
                        <button type='button' onClick={this.addMilitaryTicket}><i class='fas fa-plus' /></button>
                      </div>
                    </Control>
                  </Field>
                  <Field>
                    <Label className='ticket-label total-cost'>Total: ${(Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18) + (Number(this.state.military) * 18)}</Label>
                  </Field>
                </Box>
                <Field>
                  <Label>Your Name</Label>
                  <Input className='required' type='text' name='name' id='name' onChange={this.handleChange} />
                  <div className='error-msg hidden danger-text'>name is required</div>
                  <Label>Your Email</Label>
                  <Input className='required' type='email' name='email' id='email' onChange={this.handleChange} />
                  <div className='error-msg hidden danger-text'>email is required</div>
                </Field>
                <Checkbox className='checkbox' onChange={this.gift}> Send tickets as a gift</Checkbox>
                {this.state.gift && (
                  <div className='emailGift'>
                    <Field>
                      <Label>Recipient Email</Label>
                      <Input className='gift' type='email' name='recip_email' id='recip_email' onChange={this.handleChange} />
                      <div className='error-msg hidden danger-text'>recipient email is required if you wish to send as a gift</div>
                    </Field>
                  </div>
                )}
              </form>
            </div>
            <div className='PrePurchase-card'>
              <Container hasTextAlign='centered'>
                <Box className='transparent-box'>
                  <form onSubmit={this.handleSubmit}>
                    <Label>Please enter your payment information</Label>
                    <CardElement style={{base: {fontSize: '18px'}}} className='card' />
                    <Label className='ticket-label totalCost-summary'>Your card will be charged ${(Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18) + (Number(this.state.military) * 18)}.00</Label>
                    {(Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18) + (Number(this.state.military) * 18) === 0 ? (
                      <Button type='submit' disabled>Submit payment</Button>
                    ) : (
                      <Button type='submit'>Submit payment</Button>
                    )}
                  </form>
                </Box>
              </Container>
            </div>
          </div>

        ) : (
          <Content className='purchase-success'>
            <div className='success-div'>
              <Box className='transparent-box success-box'>
                {this.state.recip_email ? (
                  <p>Thank you for your purchase! Your recipient will receive an email containing the QR-Code ticket.</p>
                ) : (
                  <p>Thank you for your purchase! You will receive an email containing a unique ticket QR-Code. When you arrive at the museum, show your QR-Code to a museum staff member to check-in.</p>
                )}
                <Link to='/'>
                  <Button>Home</Button>
                </Link>
              </Box>
            </div>
          </Content>
        )}
      </div>
    )
  }
}

export default injectStripe(PrePurchase)
