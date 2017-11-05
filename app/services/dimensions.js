import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

// TODO: this is a guess, we should use https://github.com/miyabi/react-native-safe-area or similar on iOS and <StatusBar> on android
const statusBarHeight = 15

export { width, height, statusBarHeight }
