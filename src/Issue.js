/* global localStorage */

import React, { Component } from 'react'
import './App.css'
import { Box, Content, Title } from 'bloomer'
import reqeust from 'superagent'

class Issue extends Component {
  render () {
    console.log(this.props.issue)
    const issue = this.props.issue
    return (
      <div className='Issue'>
        <Title>{issue.username}</Title>
        <p>{issue.text}</p>
      </div>
    )
  }
}

export default Issue
