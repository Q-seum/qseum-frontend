/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title, Input } from 'bloomer'

class Dashboard extends Component {
  render () {
    return (
      <div className='Dashboard'>
        {this.props.admin === 'true' ? (
          <Box className='transparent-box'>
            <Title>Ready to start scanning!</Title>
            {/* <Input type='file' accept='image/*' capture='camera' /> */}
          </Box>
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
