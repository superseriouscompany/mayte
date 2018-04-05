import React, {Component} from 'react'
import {connect}          from 'react-redux'
import LinearGradient     from 'react-native-linear-gradient'
import Text               from './Text'
import Membership         from '../containers/Membership'
import VipCodeInvite      from '../containers/VipCodeInvite'
import {
  em,
  rootNav,
  notchHeight,
} from '../constants/dimensions'
import {
  mayteBlack,
  mayteWhite,
} from '../constants/colors'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

class DrawerContainer extends Component {
  render() {
    const {props} = this
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('DrawerToggle')}
          style={styles.toggler}>
          <LinearGradient colors={[mayteWhite(0.9), mayteWhite()]} style={styles.togglerGrad} />
          <Image style={styles.togglerIcon} resizeMode='contain' source={require('../images/nav-black.png')} />
        </TouchableOpacity>

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
    paddingTop: em(2.5),
    paddingHorizontal: em(1.25),
  },
  link: {
    marginBottom: em(1),
  },
  linkText: {
    fontSize: em(1.33),
    color: mayteWhite()
  },
  toggler: {
    width: rootNav.toggleWidth,
    height: rootNav.toggleHeight,
    right: -rootNav.toggleWidth + em(-1),
    top: em(1) + notchHeight,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: rootNav.toggleWidth/2,
  },
  togglerGrad: {
    position: 'absolute',
    top: 0, left: 0,
    width: rootNav.toggleWidth,
    height: rootNav.toggleHeight,
    borderRadius: rootNav.toggleWidth / 2,
    borderWidth: 1,
    borderColor: mayteBlack(0.1),
    backgroundColor: 'transparent',
  },
  togglerIcon: {
    width: '50%',
    height: '50%',
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
