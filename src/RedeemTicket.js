/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Redirect } from 'react-router-dom'
import { Box, Title, Button } from 'bloomer'
import request from 'superagent'
// import logo from './logo3.png'

class RedeemTicket extends Component {
  constructor () {
    super()
    this.state = {
      childTickets: '',
      genTickets: '',
      milTickets: '',
      senTickets: '',
      recipEmail: '',
      redeemed: false
    }

    this.confirmVisit = this.confirmVisit.bind(this)
  }
  componentDidMount () {
    request
      .get(`https://secure-temple-21963.herokuapp.com/api/v1/tickets/${this.props.match.params.id}`)
      .then(res => {
        console.log(res)
        this.setState({
          childTickets: res.body.data.childTickets,
          genTickets: res.body.data.genTickets,
          milTickets: res.body.data.milTickets,
          senTickets: res.body.data.senTickets,
          recipEmail: res.body.data.recip_email
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  confirmVisit (e) {
    request
      .patch(`https://secure-temple-21963.herokuapp.com/api/v1/tickets/${this.props.match.params.id}`)
      .send({
        redeemed: true
      })
      .then(res => {
        console.log(res)
      })
  }

  render () {
    console.log(this.props.match)
    if (this.props.admin === 'true') {
      return (
        <div className='RedeemTicket'>
          <Box className='transparent-box'>
            <Title>Guest Ticket</Title>
            <div><strong>General Tickets: </strong>{this.state.genTickets ? (this.state.genTickets) : (0)}</div>
            <div><strong>Children Tickets: </strong>{this.state.childTickets ? (this.state.childTickets) : (0)}</div>
            <div><strong>Military Tickets: </strong>{this.state.milTickets ? (this.state.milTickets) : (0)}</div>
            <div><strong>Senior Tickets: </strong>{this.state.senTickets ? (this.state.senTickets) : (0)}</div>
            <div><strong>Email: </strong>{this.state.recipEmail}</div>
            {/* <div><strong>Last Visit: </strong>{lastVisit}</div> */}
            <Button onClick={this.confirmVisit}>Confirm Visit</Button>
          </Box>
        </div>
      )
    } else {
      return <Redirect to={'/'} />
    }
  }
}

export default RedeemTicket