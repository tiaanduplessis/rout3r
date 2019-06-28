// https://stackoverflow.com/a/3855394/7027045
export function getQueryStringParams(query = '') {
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
