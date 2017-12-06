'use strict'

import React, {Component} from 'react'
import ProfileView from './ProfileView'
import { screenWidth, screenHeight } from '../constants/dimensions'
import { recLike, recPass } from '../constants/timings'
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  View,
} from 'react-native'

export default class RecView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftValue: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }
  }

  animateLike() {
    Animated.parallel([
      Animated.timing(this.state.leftValue, {
        toValue: screenWidth,
        duration: recLike,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: recLike,
      })
    ]).start()
  }

  animatePass() {
    Animated.parallel([
      Animated.timing(this.state.leftValue, {
        toValue: -screenWidth,
        duration: recPass,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: recPass,
      })
    ]).start()
  }

  render() {
    const {props, state} = this
    return (
      <Animated.View style={[{left: state.leftValue, opacity: state.opacity}, style.wrapper]}>
        { props.error ?
          <View style={style.centered}>
            <Text style={style.error}>{props.error}</Text>
          </View>
        : props.exhausted || props.recs.length === 0 ?
          <View style={style.centered}>
            <Text>{`There's no one new around you.`}</Text>
          </View>
        : <ProfileView {...props}
                       user={props.rec}
                       infoOpen={state.infoOpen}
                       like={() => {this.animateLike(); props.like(props.rec)}}
                       pass={() => {this.animatePass(); props.pass(props.rec)}} />
        }
      </Animated.View>
    )
  }
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
  },

  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },

  error: {
    color: 'red',
  },

})