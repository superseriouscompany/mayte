const initialState = []
export default function(state=initialState, action) {
  switch(action.type) {
    case 'products:set':
      return action.products
    default:
      return state
  }
}
