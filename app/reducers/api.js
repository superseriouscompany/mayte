const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'api:loading':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          loading: true,
        }
      }
    case 'api:yes':
      var time = +new Date
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          loading: false,
          error: null,
          body: action.payload,
          time,
          // TODO: only keep history of responses if it's requested
          // to avoid unbounded storage growth. possibly only keep GET responses?
          responses: [{
            body: action.payload,
            time,
          }].concat(state[action.key].responses || []).slice(0, 2),
        }
      }
    case 'api:no':
      var time = +new Date
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          loading: false,
          body: null,
          error: action.error,
          time,
          errors: [{
            error: action.error,
            time,
          }].concat(state[action.key].errors || []).slice(0, 2),
        }
      }
    // TODO: import the constant
    case 'persist/REHYDRATE':
      const incoming = action.payload.api
      if( !incoming ) { return initialState }
      const payload = {}
      for( var key in incoming ) {
        payload[key] = {
          ...incoming[key],
          loading: null,
        }
      }
      return payload
    default:
      return state
  }
}
