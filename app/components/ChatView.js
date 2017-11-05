'use strict'

import React, {Component}            from 'react'
import { GiftedChat, Bubble }        from 'react-native-gifted-chat'
import { BlurView }                  from 'react-native-blur'
import { screenHeight, matchHeaderHeight } from '../constants/dimensions'
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
      topValue: new Animated.Value(matchHeaderHeight),
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
    Animated.timing(
      this.state.topValue,
      {
        toValue: matchHeaderHeight,
        duration: 333,
      }
    ).start()
  }

  animateClosed() {
    Animated.timing(
      this.state.topValue,
      {
        toValue: screenHeight,
        duration: 333,
      }
    ).start()
  }

  render() {
    const {props, state} = this

    return (
      <Animated.View style={[{top: state.topValue}, style.container]}>
        <BlurView style={style.blur}
                  blurType="light"
                  blurAmount={3}
                  viewRef={null/* required for Android */} />
        { props.loading ?
          <View style={style.centered}>
            <ActivityIndicator />
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
            user={{_id: props.myId}}
            renderBubble={(props) => (
              <Bubble
                {...props}
                containerToNextStyle={{
                  left: {
                    borderBottomLeftRadius: 15,
                  },
                  right: {
                    borderBottomRightRadius: 15,
                  },
                }}
                containerToPreviousStyle={{
                  left: {
                    borderTopLeftRadius: 15,
                  },
                  right: {
                    borderTopRightRadius: 15,
                  },
                }} />
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
    height: screenHeight - matchHeaderHeight,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingBottom: 50,
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
