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
import ReportAnIssue from './ReportAnIssue'
import ResetPassword from './ResetPassword'
import RecoverPassword from './RecoverPassword'
import Map from './Map'
import LandingPage from './LandingPage'
import PrePurchase from './PrePurchase'
import RedeemTicket from './RedeemTicket'
import { Elements } from 'react-stripe-elements'
// import PageFooter from './PageFooter'
import { Container } from 'bloomer'
// import firebase from './firebase'

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
    console.log(process.env.apiKey)
    return (
      <Router>
        <div className='App'>

          {this.state.token ? (
            <div>
              <Header token={this.state.token} admin={this.state.admin} updateState={this.updateState} />
              <Container className='page-container'>
                <Route exact path='/' render={props => (
                  <Dashboard {...props} admin={this.state.admin} updateState={this.updateState} />
                )} />
              </Container>
            </div>
          ) : (
            <Route exact path='/' render={props => (
              <LandingPage {...props} updateState={this.updateState} />
            )} />
          )}
          {/* <Header token={this.state.token} admin={this.state.admin} /> */}
          <Container className='page-container'>
            <Route path='/login' render={props => (
              <Login {...props} updateState={this.updateState} />
            )} />
            <Route path='/register' component={Register} />
            <Route path='/profile' render={props => (
              <Profile {...props} updateState={this.updateState} />
            )} />
            <Route path={`/users/:userId`} render={props => (
              <ScanProfile {...props} admin={this.state.admin} />
            )} />
            <Route path='/report-issue' render={props => (
              <ReportAnIssue {...props} />
            )} />
            <Route path='/password-reset' render={props => (
              <RecoverPassword {...props} />
            )} />
            <Route path='/password-recover/:id/:new_token' render={props => (
              <ResetPassword {...props} />
            )} />
            <Route path='/map' render={props => (
              <Map {...props} />
            )} />
            <Route path='/pre-purchase' render={props => (
              <Elements>
                <PrePurchase {...props} />
              </Elements>
            )} />
            <Route path='/tickets/:id' render={props => (
              <RedeemTicket {...props} admin={this.state.admin} />
            )} />

          </Container>
          {/* <PageFooter /> */}
        </div>
      </Router>
    )
  }
}

export default App
