/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Header from './Header'
import Register from './Register'
import Dashboard from './Dashboard'
import Profile from './Profile'
import ScanProfile from './ScanProfile'
import PageFooter from './PageFooter'
import { Container } from 'bloomer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      token: null,
      id: null,
      admin: localStorage.admin
    }

    this.updateState = this.updateState.bind(this)
  }

  componentDidMount () {
    this.setState({
      token: localStorage.token,
      id: localStorage.id,
      admin: localStorage.admin
    })
  }

  updateState () {
    this.setState({
      token: localStorage.token,
      id: localStorage.id,
      admin: localStorage.admin
    })
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <Header token={this.state.token} admin={this.state.admin} />
          <Container>
            {this.state.token ? (
              <Route exact path='/' render={props => (
                <Dashboard {...props} admin={this.state.admin} />
              )} />
            ) : (
              <Route exact path='/' render={props => (
                <Login {...props} updateState={this.updateState} />
              )} />
            )}
            <Route path='/register' component={Register} />
            <Route path='/profile' render={props => (
              <Profile {...props} updateState={this.updateState} />
            )} />
            <Route path={`/users/:userId`} render={props => (
              <ScanProfile {...props} admin={this.state.admin} />
            )} />

          </Container>
          {/* <PageFooter /> */}
        </div>
      </Router>
    )
  }
}

export default App
