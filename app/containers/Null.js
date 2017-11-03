'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

class Null extends Component {
  render() {
    const {props} = this

    return (
      <Wrapper implementation={'dumb'}>
        <Text>Hello world</Text>
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
      <View style={{flex: 1}}>
        { React.Children.map(props.children, child => {
          return React.cloneElement(child, { style: {color: 'hotpink'}})
        })}
      </View>
    )
  }
}

const style = StyleSheet.create({

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
