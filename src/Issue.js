/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Box, Content, Title, Checkbox } from 'bloomer'
import request from 'superagent'
import moment from 'moment'

class Issue extends Component {
  constructor () {
    super()
    this.state = {
      resolved: false
    }
    this.resolveIssue = this.resolveIssue.bind(this)
  }

  resolveIssue (e) {
    e.preventDefault()
    console.log('element', this.props.issue.id)
    request
      .patch(`https://secure-temple-21963.herokuapp.com/api/v1/issues/${this.props.issue.id}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        resolved: true
      })
    this.setState({
      resolved: true
    })
  }

  render () {
    // console.log(this.props.issue)
    // console.log(this.props)
    const issue = this.props.issue
    return (
      <div>
        {!this.state.resolved && (
          <div className='Issue'>
            <Box className='transparent-box'>
              <p><strong>{issue.username}</strong> submitted an issue:</p>
              <p>Issue: <strong>{issue.text}</strong></p>
              <p>{issue.id}</p>
              <p>Date submitted: {moment(issue.created_at).format('MMMM Do YYYY, h:mm a')}</p>
              <Checkbox onClick={this.resolveIssue}> Issue Resolved</Checkbox>
            </Box>
          </div>
        )}
      </div>
    )
  }
}

export default Issue
