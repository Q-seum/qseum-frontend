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
          <img src={require('./museum-map1.jpg')} />
<<<<<<< HEAD
          <img src={require('./museum-map2.jpg')} />
=======
          {/* <img src='logo3.png' /> */}
          {/* <img src={require('logo3.png')} /> */}
>>>>>>> f91479f4a058bb9fcc9a3bace2602e71a41b65a0
        </Box>
      </div>
    )
  }
}

export default Map
