const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'permissions:ask':
      return {
        ...state,
        [action.permission]: true
      }
    default:
      return state
  }
}
