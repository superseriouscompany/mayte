'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Text               from './Text'
import {em}               from '../constants/dimensions'
import Membership         from '../containers/Membership'
import VipCodeInvite      from '../containers/VipCodeInvite'
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
        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Membership')}>
          <Text style={styles.linkText}>Membership Card</Text>
        </TouchableOpacity>

        {
          props.isAdmin || props.isGold ?
          <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Invite Codes')}>
            <Text style={styles.linkText}>Invite Codes</Text>
          </TouchableOpacity> : null
        }

        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Upcoming Events')}>
          <Text style={styles.linkText}>Upcoming Events</Text>
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
    fontSize: em(1),
    color: mayteWhite()
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    isGold: !!state.user.isGold,
    isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer)
