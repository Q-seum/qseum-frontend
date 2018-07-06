/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Redirect } from 'react-router-dom'
import { Box } from 'bloomer'
import request from 'superagent'
// import logo from './logo3.png'

class RedeemTicket extends Component {
  componentDidMount () {
    request
      .get(`https://secure-temple-21963.herokuapp.com/api/v1/tickets/${this.props.match.params.id}`)
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
            <h1>success</h1>
          </Box>
        </div>
      )
    } else {
      return <Redirect to={'/'} />
    }
  }
}

export default RedeemTicket
