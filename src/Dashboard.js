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
  }

  componentDidMount () {
    if (this.props.admin === 'true') {
      reqeust
        .get('https://secure-temple-21963.herokuapp.com/api/v1/issues')
        .set('Authorization', `Bearer ${localStorage.token}`)
        .then(res => {
          this.setState({
            issues: res.body
          })
        })
    }
  }

  render () {
    return (
      <div className='Dashboard'>
        {this.props.admin === 'true' ? (
          <div className='issues'>
            {this.state.issues.map((issue, idx) => (
              <div className='issue' key={idx}>
                <Box className='transparent-box'>
                  <Issue issue={issue} />
                </Box>
              </div>
            ))}
          </div>
        ) : (
          <Box className='transparent-box'>
            <Content>
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
