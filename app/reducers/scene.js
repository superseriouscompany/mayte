// const initialState = {
//   name: 'Login'
// }

const initialState = {
  name: 'Chat',
  userId: 'SySyz_n5W',
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'scene:change': return {
      ...state,
      ...(typeof action.scene === 'string' ? {name: action.scene} : action.scene),
    }
    default:
      return state
  }
}
