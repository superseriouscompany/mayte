import moment        from 'moment'
import haversine     from 'haversine'
import {GeoLocation} from 'react-native'

export function rsvp(eid, user, willAttend){
  const e = events.find(evt => evt.id == eid)
  const key = willAttend ? 'yes' : 'no'
  e.rsvp[key].push(user)
  e.rsvp[willAttend ? 'no' : 'yes'] = e.rsvp[willAttend ? 'no' : 'yes'].filter(u => u.id !== user.id)
  if (willAttend) {navigator.geolocation.requestAuthorization()}
  return Promise.resolve(true)
}

export function checkIn(eid, user){
  const e = events.find(evt => evt.id == eid)
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(d => {
      const {latitude, longitude} = d.coords
      const distance = haversine({latitude, longitude}, e.venue.geo, {unit: 'meter'})
      if (distance <= 100) {
        e.checkIns.push(user)
        return resolve()
      } else {
        return resolve('Please try within 100 meters of the venue.')
      }
    }, err => {
      return resolve(err.message)
    })
  })
}

export function forceEnd(eid, ms){
  const e = events.find(evt => evt.id == eid)
  e.endTime = moment().add(ms, 'ms')
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms+1000)
  })
}

export function get(){
  return Promise.resolve(events.concat())
}
