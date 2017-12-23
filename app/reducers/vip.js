const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'vip:set':
      return action.vip
    case 'vip:destroy':
      return initialState
    default:
      return state
  }
}