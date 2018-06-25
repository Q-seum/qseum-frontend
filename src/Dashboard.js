import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import QRCode from 'qrcode.react'

class Dashboard extends Component {
  render () {
    return (
      <Router>
        <div className='QRCode'>
          <QRCode value='test'/>
        </div>
      </Router>
    )
  }
}

export default Dashboard
