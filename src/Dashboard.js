import React, { Component } from 'react'
import './App.css'
import QRCode from 'qrcode.react'

class Dashboard extends Component {
  render () {
    return (
      <div className='Dashboard'>
        <div>Your fast pass into the museum!</div>
        <QRCode value={`http://localhost:3000/${localStorage.id}`} />
        <div>Show this to a museum employee to get checked in!</div>
      </div>
    )
  }
}

export default Dashboard
