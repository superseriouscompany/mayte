const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'user:set':
      return action.user
    default:
      return state
  }
}
