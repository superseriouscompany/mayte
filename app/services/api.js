import { Linking } from 'react-native'
import log         from '../services/log'

export const baseUrl = __DEV__ ?
  'https://mayte.ngrok.io' :
  'https://api.dateunicorn.com';

export const webUrl = __DEV__ ?
  'https://mayte.ngrok.io/webview' :
  'https://dateunicorn.com'

function request(path, options = {}) {
  if( path[0] != '/' ) path = `/${path}`;

  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'application/json'
  options.headers['Accept'] = 'application/json'
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

    err.statusCode = statusCode
    log(err)
    throw err
  })
}

request.upload = (params={}) => {
  return new Promise((resolve, reject) => {
    const reqs = ['path', 'filePath', 'fieldName', 'fileName', 'fileType']
    for (var i = 0; i < reqs.length; i++) {
      if (!params[reqs[i]]) return reject(new Error(`Cannot upload - missing param: ${reqs[i]}`))
    }

    var body = new FormData()
    body.append(params.fieldName, {
      uri: params.filePath,
      name: params.fileName,
      type: params.fileType,
    })

    var xhr = new XMLHttpRequest
    xhr.onreadystatechange = (e) => {
      if( xhr.readyState !== 4 ) { return }

      if( 200 <= xhr.status && xhr.status <= 299 ) {
        const json = JSON.parse(xhr.responseText)
        return resolve(json)
      } else {
        if( xhr.status === 0 ) {
          return reject(new Error('Upload failed, check your internet connection.'))
        }
        reject(`Error #${xhr.status}: ${xhr.responseText}`)
      }
    }
    xhr.open('POST', `${baseUrl}${params.path}`)
    xhr.send(body)
  }).then(payload => {
    return payload
  }).catch((err) => {
    log(err.message || JSON.stringify(err))
    throw err
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
  }).catch(log)
}

export default request
