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
 * @param  {object} args:               args to passthru to fetch
 * @param  {string} args.url:           url specified as relative path of API base url
 * @param  {string} [args.method=GET]:  http method
 * @param  {object} [args.headers]:     http headers
 * @param  {object|string} [args.body]: json body
 * @param  {boolean} force:             whether we should do the request even if it's in progress
 * @param  {boolean} [args.upload]:       whether to do an upload
 * @param  {string} [args.filePath]:      uploadable file path
 * @param  {string} [args.fieldName]:      form field name for uploaded file
 * @param  {string} [args.fileName]:      filename for uploaded file
 * @param  {string} [args.fileType]:      mime type of uploaded file
 * @return {promise}:                   result of fetch (error is not thrown)
 */

import api    from '../services/api'
import branch from 'react-native-branch'

export default function request(args, force) {
  return function(dispatch, getState) {
    const accessToken = (getState().user || {}).accessToken
    // TODO: handle querystring order
    const method      = args.method || (!!args.upload ? 'POST' : 'GET')
    const key         = `${method.toUpperCase()} ${args.url}`
    const isLoading   = (getState().api[key] || {}).loading

    if( isLoading && !force ) { return console.warn(`Not going to load ${key} twice`) }

    dispatch({type: 'api:loading', key})

    const httpRequest = !args.upload ?
      api(args.url, {accessToken, ...args}) :
      api.upload({accessToken, path: args.url, ...args})

    return httpRequest.then((json) => {
      dispatch({type: 'api:yes', payload: json, key})
      return json
    }).catch((err) => {
      if( err.statusCode && err.statusCode == 401 ) {
        console.warn('Logging out because we got a 401')
        // TODO: move logout to its own action
        branch.logout()
        dispatch({type: 'user:destroy'})
        dispatch({type: 'vip:destroy'})
        return
      }
      dispatch({type: 'api:no', error: err, key})
      throw err
    })
  }
}
