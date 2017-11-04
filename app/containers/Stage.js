'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Login              from './Login'
import Recs               from './Recs'
import Settings           from './Settings'
import Matches            from './Matches'
import store              from '../reducers'
import Match              from './Match'
import Null               from './Null'
import Header             from './Header'
import { width, height }  from '../services/globals'
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'

const useScratch = false

class Stage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeIn: new Animated.Value(0),
    }
    this.showScene = this.showScene.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nextScene && nextProps.nextScene.animation) {
      this.animateIn(nextProps.nextScene.animation)
    }
  }

  showScene(scene, props) {
    props = {
      ...props,
      ...this.props,
    }

    if (!props.authenticated) {
      return <Login />
    }

    return <Null scene={scene} />

    switch(scene) {
      case 'Settings':
        return <Settings />
      case 'Matches':
        return <Matches />
      case 'Match':
        return <Match userId={props.params.userId} myId={props.user.id} />
      case 'Recs':
        return <Recs />
      default:
        return <Recs />
    }
  }

  animateIn(anim) {
    const ogv = this.state[anim]._value
    var params

    switch (anim) {
      case 'fadeIn':
        params = {toValue: 1, duration: 333}
        break
      default:
        params = {toValue: this.state[anim], duration: 0}
    }

    Animated.timing(
      this.state[anim],
      params
    ).start(() => {
      this.state[anim].setValue(ogv)
      this.props.onTransition({
        ...this.props.nextScene,
        next: null,
        animation: null,
      })
    })
  }

  render() {
    const {props, state} = this

    return !props.hydrated ?
      null
    : useScratch ?
      <Scratch />
    : !props.authenticated ?
      <Login />
    :
    <View style={[style.container]}>
      <Header />
      { this.showScene(props.scene) }
    </View>
  }
}

function mapStateToProps(state) {
  return {
    authenticated: !!state.user.accessToken,
    hydrated:      state.hydrated,
    scene:         state.scene.name,
    params:        state.scene,
    user:          state.user,
    nextScene:     state.scene.next,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onTransition: (scene) => {
      dispatch({type: 'scene:change', scene: scene})
    }
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  railway: {
    backgroundColor: 'lightblue',
    flexDirection: 'row',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
