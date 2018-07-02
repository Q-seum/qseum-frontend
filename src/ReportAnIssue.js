/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { Title, Box, Field, Label, Control, Input, Button, TextArea } from 'bloomer'

class ReportAnIssue extends Component {
  constructor () {
    super()
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    e.preventDefault()
    request
      .post('https://secure-temple-21963.herokuapp.com/api/v1/issues')
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        user_id: localStorage.id,
        text: this.state.text
      })
      .then(res => {
        console.log(res)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div className='ReportAnIssue'>
        <Box className='transparent-box'>
          <Title>Report an issue</Title>
          <p className='issue-text'>We always hope that your visit to the museum is perfect. 
            If you notice something that needs our attention, please use this form to let us know. 
            <strong> Remember to dial 911 in an emergency.</strong>
          </p>
          <form onSubmit={this.handleSubmit}>
            <Field>
              <Control>
                <TextArea placeholder='Report your issue here' name='text' onChange={this.handleChange} />
              </Control>
            </Field>
            <Field isGrouped>
              <Control>
                <Button isColor='primary' type='submit'>Submit Issue</Button>
              </Control>
              <Control>
                <Link to='/'>
                  <Button isColor='danger'>Cancel</Button>
                </Link>
              </Control>
            </Field>
          </form>
        </Box>
      </div>
    )
  }
}

export default ReportAnIssue
