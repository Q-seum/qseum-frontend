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
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className='ReportAnIssue'>
        <Box className='transparent-box'>
          <Title>Report an issue</Title>
          <Field>
            <Control>
              <TextArea placeholder='report your issue here' name='text' onChange={this.handleChange} />
            </Control>
          </Field>
        </Box>
      </div>
    )
  }
}

export default ReportAnIssue
