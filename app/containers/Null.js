'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const {width, height} = Dimensions.get('window')

class Null extends Component {
  render() {
    const {props} = this

    return (
      <Wrapper style={{flex: 1}} implementation={'dumb'}>
        <View style={[style.page, {backgroundColor: 'hotpink'}]} />
        <View style={[style.page, {backgroundColor: 'cornflowerblue'}]} />
        <View style={[style.page, {backgroundColor: 'mediumpurple'}]} />
        <View style={[style.page, {backgroundColor: 'palegreen'}]} />
      </Wrapper>
    )
  }
}

function Wrapper(props) {
  return providers[props.implementation](props)
}

var providers = {
  dumb: function(props) {
    return (
      <ScrollView horizontal={true}>
        {props.children}
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  page: {
    height: height,
    width:  width,
  }
})

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Null)
