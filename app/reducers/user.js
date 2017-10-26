const initialState = null

export default function(state=initialState, action) {
  switch(action.type) {
    case 'user:set': return {
      ...state,
      ...action.user,
    }
    default:
      return state
  }
}
