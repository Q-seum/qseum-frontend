/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title } from 'bloomer'
import request from 'superagent'
import Issue from './Issue'
import IssueResolved from './IssueResolved'

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
      selfie: '',
      resolvedIssues: [],
      currentIssues: true,
      primaryUser: '',
      seconaryUser: ''
    }

    this.apiCall = this.apiCall.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.toggleResolved = this.toggleResolved.bind(this)
    this.toggleCurrent = this.toggleCurrent.bind(this)
  }

  apiCall () {
    if (this.props.admin === 'true') {
      request
        .get('https://secure-temple-21963.herokuapp.com/api/v1/issues')
        .set('Authorization', `Bearer ${localStorage.token}`)
        .then(res => {
          // console.log(res)
          this.setState({
            issues: res.body.issues_new,
            resolvedIssues: res.body.issues_resolved
          })
        })
    }
  }

  toggleResolved (e) {
    this.setState({
      currentIssues: false
    })
    e.target.classList.add('is-active')
    console.log(e.target.previousElementSibling)
    e.target.previousElementSibling.classList.remove('is-active')
  }

  toggleCurrent (e) {
    this.setState({
      currentIssues: true
    })
    e.target.classList.add('is-active')
    e.target.nextElementSibling.classList.remove('is-active')
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
            selfie: res.body.data.attributes.selfie,
            primaryUser: res.body.data.attributes.primaryUser,
            secondaryUser: res.body.data.attributes.secondaryUser
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
    // console.log(this.state.resolvedIssues)
    return (
      <div className='Dashboard contain'>
        {this.props.admin === 'true' ? (
          <div className='issues'>
            {this.state.issues.length === 0 && (
              <Box className='transparent-box'>
                <Title>No issues at the moment</Title>
              </Box>
            )}
            <Title>Issues</Title>
            <Title isSize={4}><span className='issues-title is-active' onClick={this.toggleCurrent}>Current</span> | <span className='issues-title' onClick={this.toggleResolved}>Resolved</span></Title>
            {this.state.currentIssues ? (
              <div>
                {this.state.issues.map((issue, idx) => (
                  <div className='issue' key={idx}>
                    <Issue issue={issue} />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {this.state.resolvedIssues.map((issue, idx) => (
                  <div className='issue' key={idx}>
                    <IssueResolved issue={issue} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Box className='transparent-box'>
            <Content>
              <img src={this.state.selfie} className='avi' alt='Your Selfie' />
              <div><strong>Member of the Museum of Life and Science</strong></div>
              <div>Durham, North Carolina</div>
              {/* {this.state.secondaryUser ? (
                <div>Membership held by {this.state.primaryUser} & {this.state.secondaryUser}</div>
              ) : (
                <div>Membership held by: {this.state.primaryUser}</div>

              )} */}
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
