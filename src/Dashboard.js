/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title } from 'bloomer'
import request from 'superagent'
import Issue from './Issue'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      issues: [],
      username: '',
      account: '',
      membershipType: '',
      email: '',
      accommodations: '',
      joinDate: '',
      expirationDate: '',
      selfie: ''
    }

    this.apiCall = this.apiCall.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  apiCall () {
    if (this.props.admin === 'true') {
      request
        .get('https://secure-temple-21963.herokuapp.com/api/v1/issues')
        .set('Authorization', `Bearer ${localStorage.token}`)
        .then(res => {
          // console.log(res)
          this.setState({
            issues: res.body
          })
        })
    }
  }

  componentDidMount () {
    if (this.props.admin === 'true') {
      this.apiCall()
      this.interval = setInterval(() => this.apiCall(), 1000)
    } else {
      request
        .get(`https://secure-temple-21963.herokuapp.com/api/v1/users/${localStorage.id}`)
        .set('Authorization', `Bearer ${localStorage.token}`)
        .then(res => {
          this.setState({
            username: res.body.data.attributes.username,
            account: res.body.data.attributes.account,
            membershipType: res.body.data.attributes.membershipType,
            email: res.body.data.attributes.email,
            accommodations: res.body.data.attributes.accommodations,
            joinDate: res.body.data.attributes.joinDate,
            expirationDate: res.body.data.attributes.expirationDate,
            selfie: res.body.data.attributes.selfie
          })
        })
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  handleLogout () {
    localStorage.clear()
    this.props.updateState()
    this.props.history.push('/')
  }

  render () {
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
                  <Issue issue={issue} />
                </div>
              ))}
            </Box>
          </div>
        ) : (
          <Box className='transparent-box'>
            <Content>
              <img src={this.state.selfie} className='avi' />
              <div><strong>Member of the Museum of Life and Science</strong></div>
              <div>Durham, North Carolina</div>
              <div>
                <QRCode className='QRCode-container' value={`https://q-seum.firebaseapp.com/users/${localStorage.id}`} />
              </div>
              <div>Hi, <strong>{this.state.username}!</strong> Present this code to a museum employee to enter the museum!</div>
              {/* <div className='user-info'>
                <div>Membership type: <strong>{this.state.membershipType} person admission</strong></div>
                <div>Expiration Date: <strong>{this.state.expirationDate}</strong></div>
              </div> */}
            </Content>
          </Box>
        )}
      </div>
    )
  }
}

export default Dashboard
