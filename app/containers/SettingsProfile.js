import React, { Component } from 'react'
import ProfileView from '../components/ProfileView'
import LinearGradient from 'react-native-linear-gradient'
import {mayteWhite, mayteBlack} from '../constants/colors'
import { em, matchHeaderHeight, statusBarHeight } from '../constants/dimensions'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native'

// TODO: move view stuff to app/components and make this a proper container
export default class SettingsProfile extends Component {
  componentDidMount() {
    this.props.updateBaseScene('Profile')
  }

  render() {
    const { props, state } = this
    return(
      <View style={style.container}>
        <ProfileView {...props} {...state}
                     myProfile={true}
                     setHeight={(h) => this.setState({viewHeight: h})}
                     hideButtons={true} />
       <TouchableOpacity onPress={() => props.viewSettingsPage('Preferences')}
                         style={[style.headerBtn]}>
         <LinearGradient colors={[mayteWhite(0.9), mayteWhite()]} style={style.btnGrad} />
         <Image source={require('../images/settings-black.png')}
                resizeMode='contain'
                style={[style.headerIcon]} />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => props.viewSettingsPage('Editor')}
                         style={[style.headerBtn, {top:em(5)}]}>
         <LinearGradient colors={[mayteWhite(0.9), mayteWhite()]} style={style.btnGrad} />
         <Image source={require('../images/edit-black.png')}
                resizeMode='contain'
                style={[style.headerIcon]} />
       </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBtn: {
    width: em(3),
    height: em(3),
    right: em(1),
    top: statusBarHeight + em(1),
    position: 'absolute',
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
  btnGrad: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
    borderRadius: em(1.5),
    backgroundColor: mayteBlack(),
  },
})
