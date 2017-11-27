import { Dimensions } from 'react-native'

const dimensions = Dimensions.get('window')
const emBase     = 16

export const screenWidth       = dimensions.width
export const screenHeight      = dimensions.height
export const statusBarHeight   = 15
export const matchHeaderHeight = 65
export const em                = (mod) => mod * emBase
