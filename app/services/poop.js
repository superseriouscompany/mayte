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
   rsvp: {
     yes: [
       { "id": "r1BXt9wLf", "fullName": "Prima Shaw", "photos": [ { "url": "https://staging-unicorn-photos.s3.us-west-2.amazonaws.com/e0915df0-0b81-11e8-95ec-2f3754bb666c.jpg" }, null, null ] },
       { "id": "HkKzlNzwG", "fullName": "Ben Benjamin", "photos": [ { "url": "https://staging-unicorn-photos.s3.us-west-2.amazonaws.com/1dc63220-11d3-11e8-8405-b772e522c177.jpg" }, null, null ] },
       { "id": "Skw2H1OUz", "fullName": "Raj Sarkar", "photos": [ { "url": "https://scontent-lax3-1.cdninstagram.com/vp/3c5ef70dba4705096aa30f6a40ee384b/5AF38166/t51.2885-15/sh0.08/e35/p640x640/26072064_151211348934596_8270001455918743552_n.jpg" }, { "url": "https://scontent-lax3-1.cdninstagram.com/vp/ccf28f2aa70b1f39cfd8818aaf041fc2/5B261A20/t51.2885-15/s750x750/sh0.08/e35/23967648_1151305618335984_9090506901430468608_n.jpg" }, { "url": "https://scontent-lax3-1.cdninstagram.com/vp/48cc5172dd9432e0b742cee85f781a3c/5B220C1E/t51.2885-15/sh0.08/e35/p750x750/26153608_137340883598907_7723177103239151616_n.jpg" } ] },
       { "id": "SJCuN6PrG", "fullName": "Super Serious Company📍Portugal", "photos": [ { "url": "https://scontent.cdninstagram.com/vp/dc08b4cbb767c4158e534f29ad01aff3/5AF00216/t51.2885-19/s1024x1024/17817836_297138450721790_6876536910580285440_n.jpg" }, { "url": "https://scontent.cdninstagram.com/vp/dad79afa9ed2daac8a1d40efef675b9c/5B1E883C/t51.2885-15/s640x640/sh0.08/e35/20226155_1814646638850632_2973718360841256960_n.jpg" }, { "url": "https://scontent.cdninstagram.com/vp/157a54ab52159a400a04cf9338fc7376/5AE86569/t51.2885-15/s640x640/sh0.08/e35/17933964_1294354183985274_3694357188131684352_n.jpg" }, { "url": "https://scontent.cdninstagram.com/vp/b5bb9f2000323e81eb7debfbc91dbf39/5A6D020D/t51.2885-15/e15/17883015_1920271161537702_4760636592354230272_n.jpg" }, { "url": "https://scontent.cdninstagram.com/vp/e7fbe65e7fad289a497b5cd12c905977/5B070724/t51.2885-15/s640x640/sh0.08/e35/17663686_1469203783153612_3471433000896430080_n.jpg" } ] },
     ],
     no: []
   },
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
