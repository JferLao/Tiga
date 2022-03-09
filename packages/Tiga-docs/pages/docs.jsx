import * as Nerv from 'nervjs'
import { Route, Redirect, Switch } from 'react-router-dom'
import React from 'react'
import Sidebar from '../components/sidebar'
import navsConfig from '../nav.config.yml'
import { default as pathMap } from '../page-route'
import '../assets/style/docs.scss'

class Docs extends Nerv.Component {
  constructor() {
    super(...arguments)
    this.state = {
      fixed: false
    }
  }

  atMarkdown

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.location.pathname) {
      this.atMarkdown.scrollTo(0, 0)
    }
  }

  render() {
    const data = navsConfig['components']
    const { fixed } = this.state
    const pathname = this.props.location.pathname
    const reg = /\/\S+\/(\S+)/
    const result = pathname.match(reg)
    const curDemoPath = pathMap[result[1]] || ''

    return (
      <div className='app' id='app'>
        <div className='at-container row'>
          <div className='at-sidebar col-sm-24 col-md-6 col-lg-4'>
            <Sidebar data={data} />
          </div>
          <div
            ref={ref => {
              this.atMarkdown = ref
            }}
            className={`at-markdown col-sm-24 col-md-18 col-lg-20 ${curDemoPath ? 'at-markdown--demo' : ''}`}
          >
            <Switch>
              {data.map(item => {
                if (item.items) {
                  return item.items.map(item => {
                    return (
                      <Route
                        path={`/docs/${item.name.toLowerCase()}`}
                        key={`/docs/${item.name.toLowerCase()}`}
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
                          key={`/docs/${item.name.toLowerCase()}`}
                          component={require(`../view/${item.name}`).default}
                        />
                      )
                    })
                  })
                }
              })}
              <Redirect path='/docs/' to={{ pathname: '/docs/introduction' }} />
            </Switch>

            {curDemoPath && (
              <div className={fixed ? 'demo-frame fixed' : 'demo-frame'} id='T-demo-frame'>
                {curDemoPath ? (
                  <iframe src={`./h5/index.html#/pages/${curDemoPath}/index`} frameBorder='0'></iframe>
                ) : (
                  <iframe src='./h5/index.html' frameBorder='0'></iframe>
                )}
                <div className='iphone-frame'></div>
              </div>
            )}
          </div>
        </div>
        {/* <PageFooter></PageFooter> */}
      </div>
    )
  }
}

export default Docs
