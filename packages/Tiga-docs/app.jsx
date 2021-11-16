import * as Nerv from 'nervjs'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Docs from './pages/docs.jsx'
import './assets/style/normalize.scss'
import './assets/style/index.scss'
class App extends Nerv.Component {
  constructor(...args) {
    super(...args)
  }

  render() {
    return (
      <div className='wrapper'>
        <Switch>
          <Route path='/' component={Docs} />
        </Switch>
      </div>
    )
  }
}

Nerv.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('container')
)
