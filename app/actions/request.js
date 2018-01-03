import api from '../services/api'

/**
 * request is a dispatched thunk action that makes an http request to the api and stores
 * dispatches a loading event followed by a success event or failure event.
 *
 * in conjunction with the `api` reducer, this allows components to share
 * http responses and to retry failed requests.
 *
 * it generates a key for the results of the request and uses the `api` reducer to store
 * responses and errors.
 *
 * @param  {object} args:              args to passthru to fetch
 * @param  {string} args.url:          url specified as relative path of API base url
 * @param  {string} [args.method=GET]: http method
 * @param  {object} [headers]:         http headers
 * @param  {object|string} [body]:     json body
 * @param  {boolean} force:            whether we should do the request even if it's in progress
 * @return {promise}:                  result of fetch (error is not thrown)
 */
export default function request(args, force) {
  return function(dispatch, getState) {
    const accessToken = (getState().user || {}).accessToken
    // TODO: handle querystring order
    const key         = `${(args.method || 'GET').toUpperCase()} ${args.url}`
    const isLoading   = (getState().api[key] || {}).loading

    if( isLoading && !force ) { return console.warn(`Not going to load ${key} twice`) }

    dispatch({type: 'api:loading', key})
    return api(args.url, {accessToken, ...args}).then((json) => {
      dispatch({type: 'api:yes', payload: json, key})
      return json
    }).catch((err) => {
      dispatch({type: 'api:no', error: err, key})
      throw err
    })
  }
}
