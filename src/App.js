/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Header from './Header'
import Register from './Register'
import Dashboard from './Dashboard'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: null,
      id: null
    }

    this.updateState = this.updateState.bind(this)
  }

  componentDidMount () {
    this.setState({
      token: localStorage.token,
      id: localStorage.id
    })
  }

  updateState () {
    this.setState({
      token: localStorage.token,
      id: localStorage.id
    })
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <Header />
          <div className='container'>
            {this.state.token ? (
              <Route exact path='/' component={Dashboard} />
            ) : (
              <Route exact path='/' render={props => (
                <Login {...props} updateState={this.updateState} />
              )} />
            )}
            <Route path='/register' component={Register} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
