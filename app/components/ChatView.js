'use strict'

import React, {Component}                   from 'react'
import { BlurView }                         from 'react-native-blur'
import timing                               from '../constants/timing'
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat'
import {
  mayteWhite,
} from '../constants/colors'
import {
  em,
  screenHeight,
  matchHeaderHeight,
  notchHeight,
  tabNavHeight,
  bottomBoost,
} from '../constants/dimensions'
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      yValue: new Animated.Value(0),
      opacity: new Animated.Value(1)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.view === 'Chat' && this.props.view !== 'Chat') {
      this.animateOpen()
    } else if (nextProps.view !== 'Chat' && this.props.view === 'Chat') {
      this.animateClosed()
    }
  }

  animateOpen() {
    Animated.parallel([
      Animated.timing(this.state.yValue, {
        toValue: 0,
        duration: timing.chatOpen,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: timing.chatOpen,
        useNativeDriver: true,
      })
    ]).start()
  }

  animateClosed() {
    Animated.parallel([
      Animated.timing(this.state.yValue, {
        toValue: screenHeight,
        duration: timing.chatClose,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: timing.chatClose,
        useNativeDriver: true,
      })
    ]).start()
  }

  renderInputToolbar(props) {
    // the render props aren't executing...
    return <InputToolbar
      {...props}
      beep="boop"
      renderComposer={this.renderComposer}
      renderSend={this.renderSend}
      containerStyle={{paddingBottom: bottomBoost, backgroundColor: mayteWhite(),}} />
  }

  renderSend(props) {
    return <Send
      {...props}
      textStyle={{color: 'pink'}} />
  }

  renderComposer(props) {
    return <Composer
      {...props}
      composerHeight={em(4)}
      textInputStyle={{
        fontFamily: 'Futura',
        color: 'indianred'
      }}
      containerStyle={{
        paddingBottom: bottomBoost,
        backgroundColor: 'lightblue',
      }} />
  }

  render() {
    const {props, state} = this

    return (
      <Animated.View style={[{transform: [{translateY: state.yValue}], opacity: state.opacity}, style.container]}>
        <BlurView style={style.blur}
                  blurType="light"
                  blurAmount={3}
                  viewRef={null/* required for Android */} />
        { props.loading ?
          <View style={style.centered}>
            <ActivityIndicator size="large"/>
          </View>
        : props.error ?
          <View style={style.centered}>
            <Text style={style.error}>
              {props.error}
            </Text>
          </View>
        :
          <GiftedChat
            messages={props.messages}
            onSend={(messages) => props.onSend(messages)}
            renderInputToolbar={/*this.renderInputToolbar SEE COMMENT IN FUNC*/ null}
            user={{_id: props.myId}}
            renderBubble={(props) => (
              <Bubble
                {...props}
                 />
            )}
            />
        }
      </Animated.View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: screenHeight - matchHeaderHeight - notchHeight,
    backgroundColor: 'rgba(255,255,255,0.9)',
    top: matchHeaderHeight + notchHeight,
    paddingBottom: bottomBoost,
  },
  blur: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    borderWidth: 0,
    opacity: 0.8,
  },
  centered: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  error: {
    color: 'red',
  },
})
