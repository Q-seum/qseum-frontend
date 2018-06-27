import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Footer, Content, Column, Container, Columns } from 'bloomer'
import logo from './logo3.png'

class PageFooter extends Component {
  render () {
    return (
      <Footer id='footer'className='footer'>
        <Container>
          <Content>
            <p>
              Q-seum
            </p>
            <p>Made by Momentum Cohort 1</p>
          </Content>
        </Container>
      </Footer>
    )
  }
}

export default PageFooter
