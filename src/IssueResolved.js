/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Box, Content, Title, Checkbox } from 'bloomer'
import request from 'superagent'
import moment from 'moment'

class IssueResolved extends Component {
  constructor () {
    super()
    this.state = {
      showIssue: true
    }
    this.resolveIssue = this.resolveIssue.bind(this)
  }

  componentDidMount () {
    request
      .get(`https://secure-temple-21963.herokuapp.com/api/v1/issues/${this.props.issue.id}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .then(res => {
        this.setState({
          showIssue: !res.body.data.attributes.resolved
        })
        // })
      })
  }

  resolveIssue (e) {
    e.preventDefault()
    console.log('element', this.props.issue)
    this.setState({
      showIssue: false
    })
    request
      .patch(`https://secure-temple-21963.herokuapp.com/api/v1/issues/${this.props.issue.id}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        resolved: true
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    // console.log(this.props.issue)
    // console.log(this.props)
    const issue = this.props.issue
    return (
      <div>
        <div className='IssueResolved'>
          <Box className='resolved-box'>
            <p className='issue-content'>Issue #{issue.id}</p>
            <p className='issue-content'><strong>{issue.username}</strong> submitted an issue:</p>
            <p className='issue-content'><strong>{issue.text}</strong></p>
            <p className='issue-content'>{issue.username}'s email: {issue.email}</p>
            <p className='issue-content'>Date submitted: {moment(issue.created_at).format('MMMM Do YYYY, h:mm a')}</p>
          </Box>
        </div>
      </div>
    )
  }
}

export default IssueResolved
