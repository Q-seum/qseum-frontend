import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Header from './Header'
// import QRCode from 'qrcode.react'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Route exact path='/' render={props => (
            <Login />
          )} />
        </div>
      </Router>
    )
  }
}

export default App
