import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {StripeProvider} from 'react-stripe-elements'

ReactDOM.render(<StripeProvider><App /></StripeProvider>, document.getElementById('root'))
registerServiceWorker()
