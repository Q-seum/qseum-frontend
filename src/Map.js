/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'
import { Box, Content, Title, Image } from 'bloomer'

class Map extends Component {
  render () {
    return (
      <div className='Map'>
        <Box className='transparent-box'>
          <Title>Museum Map</Title>
          <img src='museum-map1.jpg' />
          <img src='logo3.png' />
        </Box>
      </div>
    )
  }
}

export default Map
