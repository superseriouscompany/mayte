import React, { Component } from 'react'
import ProfileView from '../components/ProfileView'
import { em, matchHeaderHeight, statusBarHeight } from '../constants/dimensions'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native'

export default class SettingsProfile extends Component {
  componentDidMount() {
    this.props.updateBaseScene('Profile')
  }

  render() {
    const { props, state } = this
    return(
      <View style={style.container}>
        <View style={[style.header]}>
          <TouchableOpacity onPress={() => props.viewSettingsPage('Preferences')}
                            style={[style.headerBtn, {marginLeft: em(1)}]}>
            <Image source={require('../images/gear.png')}
                   resizeMode='contain'
                   style={[style.headerIcon]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.viewSettingsPage('Editor')}
                            style={[style.headerBtn, {marginRight: em(1)}]}>
            <Image source={require('../images/edit.png')}
                   resizeMode='contain'
                   style={[style.headerIcon]} />
          </TouchableOpacity>
        </View>
        <ProfileView {...props} {...state}
                     myProfile={true}
                     setHeight={(h) => this.setState({viewHeight: h})}
                     hideButtons={true} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: mayteBlack(),
  },
  header: {
    marginTop: em(1.33),
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    height: 40,
    top: 0,
    zIndex: 1,
  },
  headerBtn: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: '50%',
    height: '50%',
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
})
