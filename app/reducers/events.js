const initialState = []
export default function(state=initialState, action) {
  switch(action.type) {
    case 'events:set':
      console.log('here we fuckin go:', action.events)
      return action.events
    default:
      return state
  }
}
