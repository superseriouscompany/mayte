const initialState = {
  email:    null,
  dob:      null,
  photos:   [null, null, null],
  website:  null,
  freeform: null,
  vip:      null,
  referral: null,
  step:     'intro',
}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'quiz:set':
      return {...state, ...action.quiz}
    case 'quiz:setPhoto':
      return {
        ...state,
        photos: state.photos.map((p, idx) => {
          return idx === action.idx ? {url: action.url, local: true} : p
        })
      }
    case 'quiz:destroyPhoto':
      return {
        ...state,
        photos: state.photos.map((p, idx) => {
          return (p && p.url) === action.url ? null : p
        })
      }
    case 'quiz:updatePhoto':
      return {
        ...state,
        photos: state.photos.map((p, idx) => {
          return (p && p.url) === action.fromUrl ? {url: action.toUrl, local: false} : p
        })
      }
    case 'quiz:destroy':
      return initialState
    default:
      return state
  }
}
