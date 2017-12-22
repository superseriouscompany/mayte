import { Linking } from 'react-native'

export const baseUrl = __DEV__ ?
  // 'http://localhost:3000' :
  'https://superserious.ngrok.io' :
  'https://obscure-tundra-93213.herokuapp.com';

export default function request(path, options = {}) {
  if( path[0] != '/' ) path = `/${path}`;

  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'application/json'
  if( options.accessToken ) {
    options.headers['X-Access-Token'] = options.accessToken
    delete options.accessToken
  }
  if( options.body && typeof options.body !== 'string' ) {
    options.body = JSON.stringify(options.body)
  }

  var ok, statusCode;
  return fetch(
    `${baseUrl}${path}`,
    options,
  ).then((response) => {
    ok         = response.ok
    statusCode = response.status
    if( statusCode === 204 ) { return true }
    return response.json()
  }).then((json) => {
    if( !ok ) {
      var err = new Error(json.message || json.error || JSON.stringify(json))
      err.name = 'ApiError'
      err.statusCode = statusCode
      throw err
    }
    return json
  }).catch((err) => {
    if( err.name == 'ApiError' ) { throw err }

    console.log(err.message, err.name)
    console.error(err)
    throw new Error(statusCode)
  })
}

export const oauthInstagram = (params) => {
  var ps = params ? '?' + Object.keys(params).map(p => {
    return `${p}=${params[p]}`
  }).join('&') : ''

  const redirectUrl = `${baseUrl}/webhooks/instagram${ps}`
  const clientId    = '1c6d8f10063b4ac7b9010194c380b6fb'

  const url = 'https://instagram.com/oauth/authorize/?client_id='+clientId+
      '&redirect_uri='+redirectUrl+
      '&response_type=code'+
      '&state=client.ios'

  return Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url)
    } else {
      return Linking.openURL(url)
    }
  }).catch(console.error)
}
