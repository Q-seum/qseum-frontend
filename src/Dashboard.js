import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content } from 'bloomer'

class Dashboard extends Component {
  render () {
    return (
      <div className='Dashboard'>
        <Box className='QRBox'>
          <Content>
            <div>Your fast pass into the museum!</div>
            <div className='QRCode-container'>
              <QRCode value={`http://localhost:3000/users/${localStorage.id}`} />
            </div>
            <div>Show this to a museum employee to get checked in!</div>
          </Content>
        </Box>
      </div>
    )
  }
}

export default Dashboard
