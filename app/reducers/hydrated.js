const initialState = false
export default function(state=initialState, action) {
  switch(action.type) {
    case 'persist/REHYDRATE':
      return true
    default:
      return state
  }
}
