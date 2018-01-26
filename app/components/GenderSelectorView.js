'use strict'

import React, {Component}              from 'react'
import Text                            from './Text'
import base                            from '../constants/styles'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import {ButtonBlack, ButtonGrey}       from './Button'
import Environment                     from './Environment'
import SelfSelector                    from './SelfSelector'
import CornSelector                    from './CornSelector'
import {FairySheet}                    from './Fairy'
import {
  mayteBlack,
  mayteWhite,
  mayteGreen,
  mayteBlue,
  maytePink,
} from '../constants/colors'
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

const _fairyFade = new Animated.Value(0)
const fairies = <FairySheet count={8} style={{opacity: _fairyFade}} colorFn={[mayteWhite, mayteGreen, maytePink, mayteBlue]} />

export default class GenderSelector extends Component {
  constructor(props) {
    super(props)
    this._mask = new Animated.Value(0)
    this._starFade = new Animated.Value(0)
    this._idFade = new Animated.Value(0)
    this._interestFade = new Animated.Value(0)
    this._continueFade = new Animated.Value(0)
    this._shootingStarDrift = new Animated.Value(0)
    this._shootingStarFade = new Animated.Value(0)
    this._fairyFade = new Animated.Value(0)

    // TODO: Account for preselection?

    this.state = {
      mask: true,
      interest: !!(props.gender),
      continue: props.gender && props.orientation,
    }

    this.complete = this.complete.bind(this)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.gender && !this.state.interest) {
      this.setState({interest: true})
      Animated.timing(this._interestFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }

    if (nextProps.gender && nextProps.orientation && !this.state.continue) {
      this.setState({continue: true})
      Animated.parallel([
        Animated.timing(this._continueFade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(_fairyFade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this._mask, {
        toValue: screenHeight,
        delay: 1000,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this._starFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(this._shootingStarFade, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(this._shootingStarDrift, {
          toValue: screenWidth * 0.66,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(this._shootingStarFade, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(this._idFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start()
  }

  complete() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this._idFade, {toValue: 0, duration: 1000, useNativeDriver: true}),
        Animated.timing(this._interestFade, {toValue: 0, duration: 1000, useNativeDriver: true}),
        Animated.timing(this._continueFade, {toValue: 0, duration: 1000, useNativeDriver: true}),
      ]),
      Animated.timing(this._mask, {toValue: 0, duration: 666, useNativeDriver: true})
    ]).start(this.props.select)
  }

  render() {
    const {props,state} = this
    return(
      <View style={style.container}>
      { props.loading ?
        <View style={style.loadingCnr}>
          <ActivityIndicator size="large" />
        </View>
      :
        <View style={style.container}>
          <Environment {...props} starFade={this._starFade} shootingStarDrift={this._shootingStarDrift} shootingStarFade={this._shootingStarFade} />
          { fairies }
          <SelfSelector {...props} fade={this._idFade} />
          <CornSelector {...props} render={state.interest} fade={this._interestFade} />
          <Animated.View style={[style.mask, {
              transform: [{translateY: this._mask}]
            }]} />

          { !this.state.continue ? null :
            <Animated.View style={{opacity: this._continueFade, width: screenWidth, alignItems: 'center'}}>
              <ButtonGrey text={`Continue`} onPress={this.complete} style={style.continue} />
            </Animated.View>
          }
        </View>
      }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(23,20,21,1)',
  },
  loadingCnr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continue: {
    marginTop: em(1),
    marginBottom: em(1),
    position: 'absolute',
    bottom: em(0.33),
    paddingLeft: em(1.33),
    paddingRight: em(1.33),
    transform: [{scale: 0.85}]
  },
  mask: {
    position: 'absolute',
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(23,20,21,1)',
  },
})
