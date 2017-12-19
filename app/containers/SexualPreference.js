import React, { Component } from 'react'
import { em } from '../constants/dimensions'
import { mayteBlack } from '../constants/colors'
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

export default class SexualPreference extends Component {
  constructor(props) {
    super(props)

    this.state = {
      idx: props.options.indexOf(props.selected),
    }

    this.selectOption = this.selectOption.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      const idx = this.props.options.indexOf(nextProps.selected)
      this.setState({idx: idx})
      Animated.timing(this.state.bgLeft, {
        toValue: this.state.optionLayout.width * idx,
        duration: 150,
      }).start()
    }
  }

  selectOption(i) {
    this.props.onUpdate(this.props.options[i])
  }

  render() {
    const { props, state } = this
    return (
      <View style={style.container}>
        { state.optionLayout ?
          <Animated.View style={[style.bg, {
            left: state.bgLeft,
            width: state.optionLayout.width,
          }]}></Animated.View> : null }
        {
          props.options.map((o,i,a) => {
            return(
              <TouchableWithoutFeedback
                key={i}
                onPress={() => this.selectOption(i)}
                onLayout={
                  (e) => {
                    this.setState({
                      optionLayout: e.nativeEvent.layout,
                      bgLeft: new Animated.Value(e.nativeEvent.layout.width * state.idx),
                    })
                  }
                }>
                <View style={[
                  style.option,
                  (i === 0 ? style.optionFirst : {}),
                  (i === a.length-1 ? style.optionLast : {}),
                ]}>
                  <Animated.Text style={[style.label, {color: state.idx === i ? 'white' : 'black'}]}>
                    {o}
                  </Animated.Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.33)',
    borderRadius: em(0.5),
    overflow: 'hidden',
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: em(1),
    paddingBottom: em(1),
    borderColor: mayteBlack(0.1),
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  optionFirst: {
    borderLeftWidth: 0,
  },
  optionLast: {
    borderRightWidth: 0,
  },
  label: {
    fontSize: em(1),
    backgroundColor: 'transparent',
    fontFamily: 'Gotham-Book',
    marginTop: em(0.2),
  },
  bg: {
    position: 'absolute',
    backgroundColor: mayteBlack(1),
    top: 0, bottom: 0,
  }
})
