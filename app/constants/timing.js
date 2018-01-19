var timing = {
  // login screen
  loginBgIn:       666,
  loginBtnIn:      333,
  loginBtnStagger: 333,
  loginBtnDelay:   222,

  // profile
  profileOpen:    333,
  profileClose:   333,
  profileSwitch:  333,

  // recs
  recLike:        333,
  recPass:        333,
  issaMatchOpen:  333,
  issaMatchClose: 333,

  // chat
  chatOpen:       333,
  chatClose:      333,
}

// Swap conditionals to enable animations in dev
// if( false ) {
if( __DEV__ ) {
  for(var key in timing) {
    timing[key] = 0
  }
}

export default timing
