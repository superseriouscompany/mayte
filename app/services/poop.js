import moment from 'moment'

export const events = [
 {
   title: 'Unicorn Wowza',
   venue: {
     name: "Jumbo's",
     geo: {lat: 33.9982585, lng: -118.4471769},
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
     geo: {lat: 34.0800794, lng: -118.2633104},
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
     geo: {lat: 0, lng: 0},
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
     geo: {lat: 0, lng: 0},
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
     geo: {lat: 0, lng: 0},
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
     geo: {lat: 0, lng: 0},
   },
   startTime: moment().add(5, 'days'),
   endTime: moment().add(5, 'days').add(2, 'hours'),
   invites: [],
   rsvp: {yes: [], no: []},
   checkIns: [],
   id: "fgh"
 }
]

export function rsvp(eid, user, status){
  const e = events.find(evt => evt.id == eid)
  const key = status ? 'yes' : 'no'
  e.rsvp[key].push(user)
  e.rsvp[status ? 'no' : 'yes'] = e.rsvp[status ? 'no' : 'yes'].filter(u => u.id !== user.id)
  return Promise.resolve(true)
}

export function get(){
  return Promise.resolve(events.concat())
}
