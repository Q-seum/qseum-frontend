/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title } from 'bloomer'

class Map extends Component {
  render () {
    return (
      <div className='Map'>
        <Box className='transparent-box'>
          <Title>Museum Map</Title>
          <Content>
            <div>Your fast pass into the museum!</div>
          </Content>
        </Box>
        )}
      </div>
    )
  }
}

export default Map
