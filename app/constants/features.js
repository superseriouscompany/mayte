var features = {
  quiz:        true,
  approval:    true,
}

// Swap conditionals to enable animations in dev
// if( false ) {
if( __DEV__ ) {
  for(var key in features) {
    features[key] = false
  }
}

export default features
