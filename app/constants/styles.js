import {em} from './dimensions'
import {mayteBlack, mayteWhite} from './colors'
export default {
  button: {
    paddingLeft: em(0.8),
    paddingRight: em(0.8),
    paddingTop: em(0.6),
    paddingBottom: em(0.6),
    borderRadius: em(0.33),
  },
  buttonGrad: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
    borderRadius: em(0.33),
  },
  buttonText: {
    color: mayteWhite(),
    backgroundColor: 'transparent',
    fontSize: em(1),
    fontFamily: 'Gotham-Medium',
    marginTop: em(0.33),
    marginLeft: em(0.08),
    letterSpacing: em(0.1),
  },
  text: {
    color: mayteBlack(),
  }
}
