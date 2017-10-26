import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

const {width, height} = Dimensions.get('window')

class RecInfoView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      topValue: new Animated.Value(height * 0.65),
      heightValue: new Animated.Value(height * 0.3),
    }

    this.animateOpen = this.animateOpen.bind(this)
    this.animateClosed = this.animateClosed.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.infoOpen && !this.props.infoOpen) {
      this.animateOpen()
    } else if (!nextProps.infoOpen && this.props.infoOpen) {
      this.animateClosed()
    }
  }

  animateOpen() {
    Animated.timing(
      this.state.topValue,
      {
        toValue: 0,
        duration: 333,
      }
    ).start()
    Animated.timing(
      this.state.heightValue,
      {
        toValue: height,
        duration: 333,
      }
    ).start()
  }

  animateClosed() {
    Animated.timing(
      this.state.topValue,
      {
        toValue: height * 0.65,
        duration: 333,
      }
    ).start()
    Animated.timing(
      this.state.heightValue,
      {
        toValue: height * 0.3,
        duration: 333,
      }
    ).start()
  }

  render() {
    const {props, state} = this

    return (
      <Animated.View style={[{top: state.topValue, height: state.heightValue,}, style.info]}>
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                        style={style.gradient}>
          <ScrollView style={style.content}
                      scrollEventThrottle={100}
                      onScroll={(e) => {
                        const {y} = e.nativeEvent.contentOffset
                        if (y < 0) {
                          props.hideInfo()
                        }
                      }}
                      scrollEnabled={props.infoOpen ? true : false}>
            <Text style={style.name}>
              {props.recs[props.index].fullName.split(' ')[0]}, {props.recs[props.index].age}
            </Text>
            <Text style={style.location}>
              {props.recs[props.index].distance} miles away
            </Text>
            <View style={[style.tray]}>
              {
                !props.infoOpen ?
                <TouchableOpacity style={style.opener} onPress={() => props.showInfo()} />
                :
                null
              }
              <TouchableOpacity style={[style.bubble]} onPress={() => props.pass(props.recs[props.index].id)}>
                <Image style={style.icon}
                       resizeMode='contain'
                       source={require('../images/x.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[style.bubble]} onPress={() => props.like(props.recs[props.index].id)}>
                <Image style={style.icon}
                       resizeMode='contain'
                       source={require('../images/heart.png')} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={style.handle}>Profreshional Model, Treats!</Text>
              <Text style={style.handle}>@beners</Text>
            </View>
            <View>
              <Text style={style.bio}>
  {`She a bad bad n she allllready know
  (ya she know it)
  Whole bank accooount I'll blow it 💸`}
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    )
  }
}

export default RecInfoView

const style = {
  info: {
    position: 'absolute',
  },

  gradient: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },

  opener: {
    position: 'absolute',
    bottom: 0, left: -20,
    width: width + 20,
    height: height * 0.25,
    backgroundColor: 'transparent',
    zIndex: 1,
  },

  handle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: 23,
  },

  bio: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    paddingTop: 40,
  },

  tray: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  bubble: {
    width: width * 0.3,
    height: width * 0.125,
    borderRadius: width * 0.125,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  icon: {
    height: '60%',
    opacity: 0.8,
  },

  button: {
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0)',
  },

  name: {
    top: 0, left: 0, right: 0,
    color: 'rgba(255,255,255,1)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 30,
  },

  location: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
  }
}
