import * as Nerv from 'nervjs'
import { Route, Redirect, Switch, browserHistory } from 'react-router-dom'

import navsConfig from '../nav.config.yml'
import { default as pathMap } from '../page-route'
import '../assets/style/docs.scss'

class Docs extends Nerv.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    const data = navsConfig['components']
    return (
      <div className='app' id='app'>
        <Switch>
          {data.map(item => {
            if (item.items) {
              return item.items.map(item => {
                return (
                  <Route
                    path={`/docs/${item.name.toLowerCase()}`}
                    component={require(`../view/${item.name}`).default}
                  />
                )
              })
            }
            if (item.groups) {
              return item.groups.map(item => {
                return item.items.map(item => {
                  return (
                    <Route
                      path={`/docs/${item.name.toLowerCase()}`}
                      component={require(`../view/${item.name}`).default}
                    />
                  )
                })
              })
            }
          })}
          <Redirect path='/docs/' to={{ pathname: '/docs/introduction' }} />
        </Switch>
      </div>
    )
  }
}

export default Docs
