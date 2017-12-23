const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'vipCode:set':
      return action.vipCode
    case 'vipCode:destroy':
      return initialState
    default:
      return state
  }
}
