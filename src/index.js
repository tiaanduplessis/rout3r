// eslint-disable-next-line import/no-unresolved
import React, { createContext } from 'react'
import { createBrowserHistory } from 'history'
import wayfarer from 'wayfarer'

import { getQueryStringParams } from './utils'

const Context = createContext()
const { Provider, Consumer } = Context

const withConsumer = (element, params) => (
  <Consumer>
    {({
      state, push, replace, goBack, goForward,
    }) => React.cloneElement(element, {
      path: state.url,
      searchParams: getQueryStringParams(state.search),
      push,
      replace,
      goBack,
      goForward,
      params,
    })
    }
  </Consumer>
)

export class Router extends React.Component {
  constructor(properties) {
    super(properties)

    this.history = properties.history || createBrowserHistory()
    this.unlisten = null
    this.router = wayfarer(properties.defaultPath || '/')

    this.actions = {
      push: this.history.push,
      goBack: this.history.goBack,
      goForward: this.history.goForward,
      replace: this.history.replace,
    }

    React.Children.map(properties.children, child => this.addRoute(child))

    this.state = {
      search: window.location.search,
      url: window.location.pathname,
    }
  }

  componentDidMount() {
    this.unlisten = this.history.listen(({ pathname, search }) => {
      this.setState(state => ({
        ...state,
        url: pathname,
        search,
      }))
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  addRoute(element) {
    const { path } = element.props
    const render = params => withConsumer(element, params)
    this.router.on(path, render)
  }

  render() {
    const { url } = this.state

    return (
      <Provider value={{ state: this.state, ...this.actions }}>
        {this.router(url)}
      </Provider>
    )
  }
}

export function Link({
  path, href, children, ...properties
}) {
  const to = href || path
  return (
    <Consumer>
      {({ push }) => (
        <a
          {...properties}
          href={to}
          onClick={(event) => {
            event.preventDefault()
            push(to)
          }}
        >
          {children}
        </a>
      )}
    </Consumer>
  )
}
