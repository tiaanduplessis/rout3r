import React, { createContext } from "react"; // eslint-disable-line
import { createBrowserHistory } from 'history'
import wayfarer from 'wayfarer'

const Context = createContext()
const { Provider, Consumer } = Context

const withConsumer = (elem, params) => (
  <Consumer>
    {({
      state, push, replace, goBack, goForward,
    }) => React.cloneElement(elem, {
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
  constructor(props) {
    super(props)

    this.history = props.history || createBrowserHistory()
    this.unlisten = null
    this.router = wayfarer(props.defaultPath || '/')

    this.actions = {
      push: this.history.push,
      goBack: this.history.goBack,
      goForward: this.history.goForward,
      replace: this.history.replace,
    }

    React.Children.map(props.children, child => this.addRoute(child))

    this.state = {
      search: window.location.search, // eslint-disable-line
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

  addRoute(elem) {
    const { path } = elem.props
    const render = params => withConsumer(elem, params)
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
  path, href, children, ...props
}) {
  const to = href || path
  return (
    <Consumer>
      {({ push }) => (
        <a
          {...props}
          href={to}
          onClick={(e) => {
            e.preventDefault()
            push(to)
          }}
        >
          {children}
        </a>
      )}
    </Consumer>
  )
}

// https://stackoverflow.com/a/3855394/7027045
function getQueryStringParams(query = '') {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        const [key, value] = param.split('=')
        params[key] = value
          ? decodeURIComponent(value.replace(/\+/g, ' '))
          : ''
        return params
      }, {})
    : {}
}
