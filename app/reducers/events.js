const initialState = []
export default function(state=initialState, action) {
  switch(action.type) {
    case 'events:set':
      return action.events
    default:
      return state
  }
}
