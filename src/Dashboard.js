import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title } from 'bloomer'

class Dashboard extends Component {
  render () {
    return (
      <div className='Dashboard'>
        {this.props.admin === 'true' ? (
          <Box>
            <Title>Ready to start scanning!</Title>
          </Box>
        ) : (
          <Box>
            <Content>
              <div>Your fast pass into the museum!</div>
              <div className='QRCode-container'>
                <QRCode value={`http://localhost:3000/users/${localStorage.id}`} />
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
