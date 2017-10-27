'use strict'

import React, {Component}     from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import Header                 from '../containers/Header'
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from 'react-native'

const {width, height} = Dimensions.get('window')
const headerHeight = 63

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      topValue: new Animated.Value(headerHeight),
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
        toValue: headerHeight,
        duration: 333,
      }
    ).start()
  }

  animateClosed() {
    Animated.timing(
      this.state.topValue,
      {
        toValue: height,
        duration: 333,
      }
    ).start()
  }

  render() {
    const {props, state} = this

    return (
      <Animated.View style={[{top: state.topValue}, style.container]}>
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
    height: height - headerHeight,
    backgroundColor: 'rgba(255,255,255,0.9)',
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
