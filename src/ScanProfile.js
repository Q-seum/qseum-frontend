/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Title, Box, Field, Label, Control, Button, Content, Checkbox } from 'bloomer'
import moment from 'moment'

class ScanProfile extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      username: '',
      account: '',
      membershipType: '',
      email: '',
      accommodations: '',
      joinDate: '',
      expirationDate: '',
      visitors: '',
      selfie: '',
      validSelfie: false,
      lastVisit: [],
      primaryUser: '',
      secondaryUser: '',
      scanned: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateSelfie = this.validateSelfie.bind(this)
    // console.log(localStorage.id)
  }

  componentDidMount () {
    request
      .get(`https://secure-temple-21963.herokuapp.com/api/v1/users/${this.props.match.params.userId}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .then(res => {
        console.log(res)
        this.setState({
          id: res.body.data.id,
          username: res.body.data.attributes.username,
          account: res.body.data.attributes.accountNumber,
          membershipType: res.body.data.attributes.membershipType,
          email: res.body.data.attributes.email,
          accommodations: res.body.data.accommodations,
          joinData: res.body.data.joinDate,
          expirationDate: res.body.data.expirationDate,
          selfie: res.body.data.attributes.selfie,
          validSelfie: res.body.data.attributes.validSelfie,
          // lastVisit: moment(res.body.data.attributes.visits[0].date).format('MMMM Do YYYY, h:mm a')
          lastVisit: res.body.data.attributes.visits,
          primaryUser: res.body.data.attributes.primaryUser,
          secondaryUser: res.body.data.attributes.secondaryUser
        })
      })
  }

  validateSelfie () {
    this.setState({
      validSelfie: !this.state.validSelfie
    })
  }

  handleChange (e) {
    // console.log(e.target.name)
    // console.log(e.target.value)
    console.log(e.target.parentNode.childNodes)
    e.target.parentNode.childNodes.forEach(button => {
      if (button.classList.contains('selected')) {
        button.classList.remove('selected')
      }
    })
    e.target.classList.add('selected')
    this.setState({
      [e.target.name]: Number(e.target.value)
    })
  }

  handleSubmit (e) {
    console.log(this.state.validSelfie)
    // console.log(this.state.id, this.state.account, this.state.visitors)
    e.preventDefault()
    request
      .post('https://secure-temple-21963.herokuapp.com/api/v1/visits')
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        user_id: this.state.id,
        account: this.state.account,
        visitors: Number(this.state.visitors)
      })
      .then(res => {
        console.log(res)
        this.setState({
          scanned: true
        })
      })
      .catch(err => {
        console.log(err)
      })
    request
      .patch(`https://secure-temple-21963.herokuapp.com/api/v1/users/${this.props.match.params.userId}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        valid_selfie: this.state.validSelfie
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    // console.log(this.state.lastVisit)
    let lastVisit
    if (this.state.lastVisit[0]) {
      lastVisit = moment(this.state.lastVisit[0].date).format('MMMM Do YYYY, h:mm a')
    } else {
      lastVisit = 'First time visiting'
    }
    if (this.props.admin === 'true') {
      return (
        <div className='ScanProfile contain'>
          {!this.state.scanned ? (
            <Box className='transparent-box'>
              <Title className='raleway'>Check In {this.state.username}</Title>
              <Content>
                <div className='img-container'>
                  <img src={this.state.selfie} className='avi' alt='User Selfie' />
                </div>
                {this.state.secondaryUser ? (
                  <div><strong>Membership Holders: </strong>{this.state.primaryUser} & {this.state.secondaryUser}</div>
                ) : (
                  <div><strong>Membership Holder: </strong>{this.state.primaryUser} </div>

                )}
                {/* <div><strong>Username: </strong>{this.state.username}</div> */}
                <div><strong>Email: </strong>{this.state.email}</div>
                <div><strong>Account #: </strong>{this.state.account}</div>
                <div><strong>Membership Type: </strong>{this.state.membershipType}</div>
                <div><strong>Last Visit: </strong>{lastVisit}</div>
                {/* <div><strong>Accommodations: </strong>{this.state.accommodations}</div> */}
                {/* <div><strong>Date Joined: </strong>{this.state.joinData}</div> */}
                {/* <div><strong>Membership Expiration Date: </strong>{this.state.expirationDate}</div> */}
              </Content>
              <form onSubmit={this.handleSubmit}>
                <Field className='checkin'>
                  {Number(this.state.membershipType) === 2 && (
                    <Field>
                      <Label>Number of visitors:</Label>
                      <Control>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='1'>1</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='2'>2</Button>
                      </Control>
                    </Field>
                  )}
                  {Number(this.state.membershipType) === 4 && (
                    <Field>
                      <Label>Number of visitors</Label>
                      <Control>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='1'>1</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='2'>2</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='3'>3</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='4'>4</Button>
                      </Control>
                    </Field>
                  )}
                  {Number(this.state.membershipType) === 6 && (
                    <Field>
                      <Label>Number of visitors</Label>
                      <Control>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='1'>1</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='2'>2</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='3'>3</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='4'>4</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='5'>5</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='6'>6</Button>
                      </Control>
                    </Field>
                  )}
                  {Number(this.state.membershipType) === 8 && (
                    <Field>
                      <Label>Number of visitors:</Label>
                      <Control>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='1'>1</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='2'>2</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='3'>3</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='4'>4</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='5'>5</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='6'>6</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='7'>7</Button>
                        <Button name='visitors' onClick={this.handleChange} id='visitors' value='8'>8</Button>
                      </Control>
                    </Field>
                  )}
                </Field>
                {this.state.validSelfie === false ? (
                  <Field>
                    <Control>
                      <Label>Validate user identity by checking driver's license photo</Label>
                      <Checkbox type='submit' onChange={this.validateSelfie}> Validate Selife</Checkbox>
                    </Control>
                  </Field>
                ) : (
                  <div>
                    <div>
                      <div>Selfie has been validated!</div>
                      <a onClick={this.validateSelfie}>Undo Validation</a>
                    </div>
                    <Field>
                      <Control>
                        <Button type='submit' isColor='primary'>Check In</Button>
                      </Control>
                    </Field>
                  </div>
                )}
              </form>
            </Box>
          ) : (
            <Box className='transparent-box centered'>
              <Content>
                <Title>Check-in Successful!</Title>
                <Link to='/'>
                  <Button isColor='danger'>Home</Button>
                </Link>
              </Content>
            </Box>
          )}
        </div>
      )
    } else {
      return <Redirect to={'/'} />
    }
  }
}

export default ScanProfile
