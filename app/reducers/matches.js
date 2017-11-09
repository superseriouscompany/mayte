const initialState = {data: []}
export default (state=initialState, action) => {
  switch (action.type) {
    case 'matches:load':
      return {...state, loading: true}
    case 'matches:load:yes':
      return {...state, data: action.matches, loading: null, dirty: null}
    case 'matches:load:no':
      return {...state, loading: false, error: action.error}
    case 'matches:invalidate':
      return {...state, dirty: true}
    default:
      return state
  }
}
