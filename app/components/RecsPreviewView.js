import React, { Component }              from 'react'
import { connect }                       from 'react-redux'
import { BlurView }                      from 'react-native-blur'
import { em, screenWidth, screenHeight } from '../constants/dimensions'
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
} from 'react-native'

class RecsPreview extends Component {
  constructor(props) {
    super(props)
    this._bgOpacity = new Animated.Value(0)
    this._headerOpacity = new Animated.Value(0)
    this._subOpacity = new Animated.Value(0)
    this._lockOpacity = new Animated.Value(0)

    this._headerY = new Animated.Value(em(1))
    this._lockY = new Animated.Value(em(1))

    this.runAnim = this.runAnim.bind(this)
  }

  componentDidMount() {

  }

  runAnim() {
    Animated.sequence([
      Animated.timing(this._bgOpacity, {
        toValue: 1,
        duration: 333,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(this._headerOpacity, {
          toValue: 1,
          duration: 333,
          useNativeDriver: true,
        }),
        Animated.timing(this._headerY, {
          toValue: 0,
          duration: 333,
          useNativeDriver: true,
        }),
        Animated.timing(this._lockOpacity, {
          toValue: 1,
          duration: 333,
          useNativeDriver: true,
        }),
        Animated.timing(this._lockY, {
          toValue: 0,
          duration: 333,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(this._subOpacity, {
        toValue: 1,
        duration: 333,
        useNativeDriver: true,
      })
    ]).start()
  }

  render() {
    const {props, state} = this
    return (
      <View style={style.container}>
        <Animated.View style={[style.bg, {opacity: this._bgOpacity}]}>
          <Image source={props.user.preferences.orientation == 'male' ? require('../images/recs-preview-bg-male.jpg') : require('../images/recs-preview-bg-female.jpg')}
                 style={style.bgImg}
                 onLoad={this.runAnim}
                 resizeMode='cover' />
          <BlurView style={style.bgBlur}
                    blurType="light"
                    blurAmount={4}
                    viewRef={null/* required for Android */} />
        </Animated.View>
        <Animated.View style={[style.header, {opacity: this._headerOpacity, transform: [{translateY: this._headerY}]}]}>
          <Text style={style.headerMain}>
            {`CATCH ME\nIF YOU CAN`}
          </Text>
          <Animated.Image
            source={require('../images/lock.png')}
            style={[style.lock, {opacity: this._lockOpacity, transform: [{translateY: this._lockY}]}]}
            resizeMode='contain' />
        </Animated.View>
        <Animated.View style={{opacity: this._subOpacity}}>
          <Text style={[style.headerSub]}>
            {`Suggestions launch Valentine's Day 2018`}
          </Text>
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecsPreview)

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
  },
  bgBlur: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
  },
  bgImg: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    opacity: 0.33,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerMain: {
    backgroundColor: 'transparent',
    fontFamily: 'Futura',
    fontSize: em(2),
    fontWeight: '700',
    letterSpacing: em(0.33),
    lineHeight: em(2) * 1.5,
    textAlign: 'center',
    marginBottom: em(0.66),
  },
  headerSub: {
    backgroundColor: 'transparent',
    fontFamily: 'Futura',
    fontSize: em(0.9),
    marginLeft: em(0.09),
    marginBottom: em(2),
    lineHeight: em(1) * 1.5,
    letterSpacing: em(0.08),
    textAlign: 'center',
  },
  lock: {
    width: em(4.5),
    height: em(4.5),
    marginRight: em(1),
  },
})
