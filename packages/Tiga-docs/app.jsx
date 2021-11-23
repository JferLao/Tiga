import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import '@tailwindcss/postcss7-compat/tailwind.css'


import Docs from './pages/docs.jsx'
import './assets/style/normalize.scss'
import './assets/style/index.scss'

class App extends React.Component {
  constructor(...args) {
    super(...args)
  }

  render() {
    return (
      <div className='wrapper'>
        <Switch>
          <Route path='/docs' component={Docs} />
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('container')
)
