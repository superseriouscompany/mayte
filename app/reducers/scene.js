const initialState = {
  name: 'Login'
}

export default function(state=initialState, action) {
  switch(action.type) {
    case 'scene:change':
      const scene = typeof action.scene === 'string' ? {name: action.scene} :
                    typeof action.scene === 'number' ? {index: action.scene} :
                    action.scene

      if (scene.name && !scene.index) {
        switch (scene.name) {
          case 'Settings':
            scene.index = 0
            break
          case 'Recs':
            scene.index = 1
            break
          case 'Matches':
            scene.index = 2
            break
          case 'Match':
            scene.index = 3
            break
        }
      }

      if (scene.index && !scene.name) {
        switch (scene.index) {
          case 0:
            scene.name = 'Settings'
            break
          case 1:
            scene.name = 'Recs'
            break
          case 2:
            scene.name = 'Matches'
            break
          case 3:
            scene.name = 'Match'
            break
        }
      }

      return {
        ...state,
        ...scene,
      }
    default:
      return state
  }
}
