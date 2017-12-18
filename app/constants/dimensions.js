import { Dimensions } from 'react-native'

const dimensions = Dimensions.get('window')
const emBase     = dimensions.width <= 320 ? 12.8 : 16

export const screenWidth       = dimensions.width
export const screenHeight      = dimensions.height
export const tabNavHeight      = 50 * (emBase/16)
export const statusBarHeight   = 0
export const matchHeaderHeight = 65 * (emBase/16)
export const em                = (mod) => mod * emBase
