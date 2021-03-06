/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Box, Checkbox } from 'bloomer'
import request from 'superagent'
import moment from 'moment'

class Issue extends Component {
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
        console.log(res)
      })
  }

  resolveIssue (e) {
    e.preventDefault()
    console.log('element', this.props.issue)
    // this.setState({
    //   showIssue: false
    // })
    request
      .patch(`https://secure-temple-21963.herokuapp.com/api/v1/issues/${this.props.issue.id}`)
      .set('Authorization', `Bearer ${localStorage.token}`)
      .send({
        resolved: true
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  render () {
    console.log(this.props.issue)
    // console.log(this.props)
    const issue = this.props.issue
    return (
      <div>
        <div className='Issue'>
          <Box className='current-box'>
            <p className='issue-content'>Issue #{issue.id}</p>
            <p className='issue-content'><strong>{issue.username}</strong> submitted an issue:</p>
            <p className='issue-content'><strong>"{issue.text}"</strong></p>
            <p className='issue-content'>{issue.username}'s email: {issue.email}</p>
            <p className='issue-content'>Date submitted: {moment(issue.created_at).format('MMMM Do YYYY, h:mm a')}</p>
            <Checkbox onClick={this.resolveIssue}> Issue Resolved</Checkbox>
          </Box>
        </div>
        {/* // )} */}
      </div>
    )
  }
}

export default Issue
