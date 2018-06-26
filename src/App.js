import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Header from './Header'
import Register from './Register'
import Dashboard from './Dashboard'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Header />
          <div className='container'>
            <Route exact path='/' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/Dashboard' component={Dashboard} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
