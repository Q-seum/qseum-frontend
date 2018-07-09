/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Box, Title } from 'bloomer'

class Map extends Component {
  render () {
    return (
      <div className='Map raleway'>
        <Box className='transparent-box'>
          <Title>Museum Map</Title>
          <div>
            Download PDF <a href='https://www.speakcdn.com/assets/2348/museum_map_updated.pdf'> here!</a>
          </div>
          <img src={require('./museum-map1.jpg')} alt='' />
          <img src={require('./museum-map2.jpg')} alt='' />
        </Box>
      </div>
    )
  }
}

export default Map
