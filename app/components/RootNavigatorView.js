'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Text               from './Text'
import Membership         from '../containers/Membership'
import VipCodeInvite      from '../containers/VipCodeInvite'
import {
  em,
  rootNav,
} from '../constants/dimensions'
import {
  mayteBlack,
  mayteWhite,
} from '../constants/colors'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

class DrawerContainer extends Component {
  render() {
    const {props} = this
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('DrawerOpen')}
          style={{
            width: rootNav.toggleWidth,
            height: rootNav.toggleHeight,
            backgroundColor: 'navajowhite',
            right: -rootNav.toggleWidth + em(-1),
            top: em(1),
            position: 'absolute', }}/>

        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Settings')}>
          <Text style={styles.linkText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Recs')}>
          <Text style={styles.linkText}>Suggestions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Connections')}>
          <Text style={styles.linkText}>Connections</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Membership')}>
          <Text style={styles.linkText}>Membership</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mayteBlack(),
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  link: {
    marginBottom: em(1),
  },
  linkText: {
    fontSize: em(1.33),
    color: mayteWhite()
  }
})

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer)
