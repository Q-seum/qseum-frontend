/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title } from 'bloomer'
import reqeust from 'superagent'
import Issue from './Issue'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      issues: []
    }

    this.apiCall = this.apiCall.bind(this)
  }

  apiCall () {
    if (this.props.admin === 'true') {
      reqeust
        .get('https://secure-temple-21963.herokuapp.com/api/v1/issues')
        .set('Authorization', `Bearer ${localStorage.token}`)
        .then(res => {
          console.log(res)
          this.setState({
            issues: res.body
          })
        })
    }
  }

  componentDidMount () {
    this.apiCall()
    this.interval = setInterval(() => this.apiCall(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    console.log(this.state.issues.length)
    return (
      <div className='Dashboard'>
        {this.props.admin === 'true' ? (
          <div className='issues'>
            {this.state.issues.length === 0 && (
              <Box className='transparent-box'>
                <Title>No issues at the moment</Title>
              </Box>
            )}
            <Box className='transparent-box issues-box'>
              <Title>Current Issues</Title>
              {this.state.issues.map((issue, idx) => (
                <div className='issue' key={idx}>
                  <Box className='transparent-box'>
                    <Issue issue={issue} />
                  </Box>
                </div>
              ))}
            </Box>
          </div>
        ) : (
          <Box className='transparent-box'>
            <Content>
              <Title>Membership QR-Code</Title>
              <div>Your fast pass into the museum!</div>
              <div className='QRCode-container'>
                <QRCode value={`https://q-seum.firebaseapp.com/users/${localStorage.id}`} />
              </div>
              <div>Show this to a museum employee to get checked in!</div>
            </Content>
          </Box>
        )}
      </div>
    )
  }
}

export default Dashboard
