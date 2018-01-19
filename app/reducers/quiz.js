const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'quiz:set':
      return {...state, ...action.quiz}
    case 'quiz:destroy':
      return initialState
    default:
      return state
  }
}
