const initialState = {
  name: 'Login'
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'scene:change': return {
      ...state,
      name: action.scene,
    }
    default:
      return state
  }
}
