const initialState = {
  name: 'Login'
}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'scene:change':
      const scene = action.scene

      if (scene.animation) {
        return {
          ...state,
          next: scene,
        }
      }

      return {
        ...state,
        ...(typeof scene === 'string' ? {name: action.scene} : action.scene),
        data: action.data || {}
      }
    default:
      return state
  }
}
