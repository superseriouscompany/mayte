import React, {Component} from 'react'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { screenWidth, screenHeight, em } from '../constants/dimensions'
import { issaMatchOpen, issaMatchClose } from '../constants/timings'
import { mayteBlack } from '../constants/colors'
import {
  StyleSheet,
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

class IssaMatchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0)
    }

    this.animateIn = this.animateIn.bind(this)
    this.animateOut = this.animateOut.bind(this)
  }

  componentDidMount() {
    this.animateIn()
  }

  animateIn() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: issaMatchOpen
      })
    ]).start()
  }

  animateOut() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: issaMatchClose
      })
    ]).start(this.props.dismiss)
  }

  render() {
    const {props, state} = this
    return (
      <Animated.View style={[{opacity: state.opacity, height: props.viewHeight}, style.container]}>
        <Text style={style.title}>{`IT'S 🦄 MUTUAL`}</Text>

        <View style={style.tray}>
          <Image style={style.bubble} source={{uri: props.user.photos[0].url}} />
          <Image style={style.bubble} source={{uri: props.otherUser.photos[0].url}} />
        </View>

        <TouchableOpacity onPress={() => {
                            props.viewChat(props.otherUser)
                            this.animateOut()
                          }}
                          style={[style.button, {marginBottom: 40}]}>
          <Text style={[style.buttonText]}>START CHATTING</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.animateOut}
                          style={style.button}>
          <Text style={[style.buttonText]}>CONTINUE</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    backgroundColor: mayteBlack(0.8),
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bubble: {
    height: Math.max(screenWidth * 0.3, 80),
    width: Math.max(screenWidth * 0.3, 80),
    borderRadius: Math.max(screenWidth * 0.3, 80) / 2,
    marginLeft: 20,
    marginRight: 20,
  },

  tray: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: em(3),
    marginBottom: em(4.5),
  },

  title: {
    fontSize: em(2),
    color: 'white',
    fontFamily: 'Gotham-Medium',
    letterSpacing: em(0.166),
    marginLeft: em(0.1),
  },

  button: {
    paddingTop: em(1.33),
    paddingBottom: em(1.33),
    paddingLeft: em(1),
    paddingRight: em(1),
    borderRadius: 4,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'rgba(0,0,0,1)',
    backgroundColor: 'rgba(220,224,223,0.95)',
    width: 260,
  },

  buttonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: em(1),
    fontWeight: 'bold',
    color: mayteBlack(),
    letterSpacing: 1,
    fontFamily: 'Gotham-Medium',
    marginTop: em(0.1),
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    viewChat: (match) => {
      ownProps.navigation.navigate("Matches")
      dispatch({type: 'scene:change', scene: {
        name: 'Match',
        view: 'Chat',
        user: match,
      }})
    }
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(IssaMatchView))
