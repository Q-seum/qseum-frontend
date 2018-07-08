/* global localStorage */

import React, { Component } from 'react'
import './App.css'
// import { Link } from 'react-router-dom'
// import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button, Container, Checkbox } from 'bloomer'
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
      recip_name: null,
      recip_email: null
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
      console.log(((Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18) + (Number(this.state.military) * 18)) * 100)
    })
      .catch(err => {
        console.log(err)
      })
      .then(() => {
        request
          .post('https://secure-temple-21963.herokuapp.com/api/v1/charges')
          // .set('Authorization', `Bearer ${localStorage.token}`)
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
          })
          .catch(err => {
            console.log(err)
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


  // updateTotal () {
  //   this.setState({
  //     total: (Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18)
  //   })
  // }

  render () {
    return (
      <div className='PrePurchase'>
        <div className='ticketForm'>
          <Title className='raleway'>Pre-Purchase Tickets</Title>
          <form>
            <Field>
              <Label htmlFor='general'>General Admission ($20)</Label>
              <Control>
                {/* <Input className='numberInput' pattern='[0-9]*' name='general' id='general' onChange={this.handleChange} /> */}
                <div className='ticketNumber'>
                  {this.state.general ? (
                    <div>{this.state.general}</div>
                  ) : (
                    <div>0</div>
                  )}
                  <Button onClick={this.addGeneralTicket}><i class='fas fa-plus'/></Button>
                  <Button onClick={this.subtractGeneralTicket}><i class='fas fa-minus' /></Button>
                </div>
              </Control>
            </Field>

            <Field>
              <Label htmlFor='child'>Children ages 3-12 ($15)</Label>
              <Control>
                {this.state.child ? (
                  <div>{this.state.child}</div>
                ) : (
                  <div>0</div>
                )}
                <Button onClick={this.addChildTicket}><i class='fas fa-plus' /></Button>
                <Button onClick={this.subtractChildTicket}><i class='fas fa-minus' /></Button>
                {/* <Input className='numberInput' pattern='[0-9]*' name='child' id='child' onChange={this.handleChange} /> */}
              </Control>
            </Field>


            <Field>
              <Label htmlFor='senior'>Senior Ticket ($18)</Label>
              <Control>
                {this.state.senior ? (
                  <div>{this.state.senior}</div>
                ) : (
                  <div>0</div>
                )}
                <Button className='button' onClick={this.addSeniorTicket}><i class='fas fa-plus' /></Button>
                <Button onClick={this.subtractSeniorTicket}><i class='fas fa-minus' /></Button>
                {/* <Input className='numberInput' pattern='[0-9]*' name='senior' id='senior' onChange={this.handleChange} /> */}
              </Control>
            </Field>

            <Field>
              <Label htmlFor='military'>Military Ticket ($18)</Label>
              <Control>
                {this.state.military ? (
                  <div>{this.state.military}</div>
                ) : (
                  <div>0</div>
                )}
                <Button onClick={this.addMilitaryTicket} isColor='success'><i class='fas fa-plus' /></Button>
                <Button onClick={this.subtractMilitaryTicket} isColor='warning'><i class='fas fa-minus' /></Button>
                {/* <Input className='numberInput' pattern='[0-9]*' name='military' id='military' onChange={this.handleChange} /> */}
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
              <Label className='raleway totalCost'>Total: ${(Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18) + (Number(this.state.military) * 18)}</Label>
            </Field>
            <Field>
              <Label>Your Name</Label>
              <Input type='text' name='name' id='name' onChange={this.handleChange} />
              <Label>Your Email</Label>
              <Input type='email' name='email' id='email' onChange={this.handleChange} />
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
          </form>
        </div>
        <div className='PrePurchase'>
          <Container hasTextAlign='centered'>
            <Box className='transparent-box'>
              <form onSubmit={this.handleSubmit}>
                <Title>Card details</Title>
                <CardElement style={{base: {fontSize: '18px'}}} />
                <Label className='raleway totalCost-summary'>Your card will be charged ${(Number(this.state.general) * 20) + (Number(this.state.child) * 15) + (Number(this.state.senior) * 18) + (Number(this.state.military) * 18)}.00</Label>
                <Button type='submit'>Submit payment</Button>
              </form>
            </Box>
          </Container>
        </div>
      </div>
    )
  }
}

export default injectStripe(PrePurchase)
