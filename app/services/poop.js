import moment        from 'moment'
import haversine     from 'haversine'
import {GeoLocation} from 'react-native'

export const events = [
 {
   title: 'Unicorn Wowza',
   venue: {
     name: "Unicorn HQ",
     geo: {latitude: 34.0853097, longitude: -118.2538206},
   },
   startTime: moment().add(7, 'days'),
   endTime: moment().add(7, 'days').add(2, 'hours'),
   invites: [{id: 'HkKzlNzwG'}, {id: 'rJvJHxeUM'}],
   rsvp: {yes: [], no: []},
   checkIns: [],
   id: "abc"
 },
 {
   title: 'Unicorn Party',
   venue: {
     name: "Unicorn Dungeon",
     geo: {latitude: 34.0800794, longitude: -118.2633104},
   },
   startTime: moment().add(2, 'days'),
   endTime: moment().add(2, 'days').add(2, 'hours'),
   invites: [{id: "yourmom"}, {id: "yourdad"}],
   rsvp: {
     yes: [{id: "yourmom", instagramHandle: "yourmom"}],
     no: [{id: "yourdad", instagramHandle: "yourdad"}],
   },
   checkIns: [],
   id: "bcd"
 },
 {
   title: 'Unicorn Party',
   venue: {
     name: "Dat Swamp",
     geo: {latitude: 0, longitude: 0},
   },
   startTime: moment().add(2, 'days'),
   endTime: moment().add(2, 'days').add(2, 'hours'),
   invites: [],
   rsvp: {yes: [], no: []},
   checkIns: [],
   id: "cde"
 },
 {
   title: 'Unicorn Hang',
   venue: {
     name: "Dat Ocean",
     geo: {latitude: 0, longitude: 0},
   },
   startTime: moment().add(3, 'days'),
   endTime: moment().add(3, 'days').add(2, 'hours'),
   invites: [],
   rsvp: {yes: [], no: []},
   checkIns: [],
   id: "def"
 },
 {
   title: 'Unicorn Party',
   venue: {
     name: "Mom's Place",
     geo: {latitude: 0, longitude: 0},
   },
   startTime: moment().add(4, 'days'),
   endTime: moment().add(4, 'days').add(2, 'hours'),
   invites: [],
   rsvp: {yes: [], no: []},
   checkIns: [],
   id: "efg"
 },
 {
   title: 'Unicorn Party',
   venue: {
     name: "Dad's New Apartment",
     geo: {latitude: 0, longitude: 0},
   },
   startTime: moment().add(5, 'days'),
   endTime: moment().add(5, 'days').add(2, 'hours'),
   invites: [],
   rsvp: {yes: [], no: []},
   checkIns: [],
   id: "fgh"
 }
]

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
      console.log("OOPS WHERES MY KIDS:", err)
      return resolve(err.message)
    })
  })
}

export function get(){
  return Promise.resolve(events.concat())
}
