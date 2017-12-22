import { Linking } from 'react-native'

export const baseUrl = __DEV__ ?
  // 'http://localhost:3000' :
  'https://superserious.ngrok.io' :
  'https://obscure-tundra-93213.herokuapp.com';

function request(path, options = {}) {
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

      if( xhr.status < 299 ) {
        const json = JSON.parse(xhr.responseText)
        return resolve(json)
      } else {
        reject(xhr.status + ': ' + xhr.responseText)
      }
    }
    xhr.open('POST', `${baseUrl}${params.path}`)
    xhr.send(body)
  }).then(payload => {
    return payload
  }).catch((err) => {
    console.error(err.message || JSON.stringify(err))
    alert(err.message || JSON.stringify(err))
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

export default request
