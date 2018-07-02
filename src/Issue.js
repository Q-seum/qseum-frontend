/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Box, Content, Title } from 'bloomer'
import reqeust from 'superagent'
import moment from 'moment'

class Issue extends Component {
  render () {
    console.log(this.props.issue)
    console.log(this.props)
    const issue = this.props.issue
    return (
      <div className='Issue'>
        <p><strong>{issue.username}</strong> submitted an issue:</p>
        <p>Issue: <strong>{issue.text}</strong></p>
        <p>Date submitted: {moment(issue.created_at).format('MMMM Do YYYY, h:mm a')}</p>
      </div>
    )
  }
}

export default Issue
