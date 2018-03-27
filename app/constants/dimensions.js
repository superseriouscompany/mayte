import { Dimensions, Platform } from 'react-native'

const dimensions = Dimensions.get('window')
const emBase     = dimensions.width <= 320 ? 12.8 : 16

export const screenWidth       = dimensions.width
export const screenHeight      = dimensions.height
export const tabNavHeight      = 50 * (emBase/16)
export const statusBarHeight   = 0
export const em                = (mod) => mod * emBase
export const isIphoneX         = (() => {
  return (
    Platform.OS === 'ios' &&
    (screenHeight === 812 || screenWidth === 812)
  )
})()
export const notchHeight       = isIphoneX ? 30 : 0
export const bottomBoost       = isIphoneX ? 20 : 0
export const rootNav = {
  width: em(18.75),
  toggleWidth: em(2.5),
  toggleHeight: em(2.5),
}
export const matchHeaderHeight = rootNav.toggleHeight * 1.75
