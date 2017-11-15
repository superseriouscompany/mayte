import React, {Component} from 'react'
import { connect } from 'react-redux'
import { screenWidth, screenHeight } from '../constants/dimensions'
import { issaMatchOpen, issaMatchClose } from '../constants/timings'
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
        <Text style={style.title}>{`U GUYS SHUD KISS <3`}</Text>

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
          <Text style={[style.buttonText]}>KEEP BROWSING</Text>
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
    backgroundColor: 'rgba(35,31,32, 0.8)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bubble: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginLeft: 20,
    marginRight: 20,
  },

  tray: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  button: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'rgba(0,0,0,1)',
    backgroundColor: 'rgba(220,224,223,1)',
    width: 280,
  },

  buttonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(35,31,32,1)',
    letterSpacing: 1,
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewChat: (match) => {
      dispatch({type: 'scene:change', scene: {
        name: 'Match',
        view: 'Chat',
        user: match,
      }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssaMatchView)
