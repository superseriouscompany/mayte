const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'session:create':
      return action.session
    case 'session:destroy':
      return initialState
    default:
      return state
  }
}
