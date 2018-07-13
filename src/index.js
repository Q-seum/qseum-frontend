import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {StripeProvider} from 'react-stripe-elements'
// import { process.env.API_KEY }
const token = process.env.REACT_APP_API_KEY

ReactDOM.render(<StripeProvider apiKey={token}><App /></StripeProvider>, document.getElementById('root'))
registerServiceWorker()
