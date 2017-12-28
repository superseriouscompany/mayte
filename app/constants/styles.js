import {em} from './dimensions'
import {mayteBlack, mayteWhite} from './colors'
export default {
  button: {
    backgroundColor: mayteBlack(),
    paddingLeft: em(0.8),
    paddingRight: em(0.8),
    paddingTop: em(0.6),
    paddingBottom: em(0.6),
    borderRadius: em(0.33),
  },
  buttonText: {
    color: mayteWhite(),
    fontSize: em(1.25),
  },
  text: {
    color: mayteBlack(),
  }
}
