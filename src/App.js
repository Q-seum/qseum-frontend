import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Header from './Header'
import Register from './Register'
// import QRCode from 'qrcode.react'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    )
  }
}

export default App
