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

const btnDims = {
  width: em(3),
  height: em(3),
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBtn: {
    ...btnDims,
    right: em(1),
    top: statusBarHeight + em(1),
    borderRadius: btnDims.width/2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    ...btnDims,
    position: 'absolute',
    top: 0, left: 0,
    borderRadius: btnDims.width / 2,
    borderWidth: 1,
    borderColor: mayteBlack(0.1),
    backgroundColor: 'transparent',
  },
})
