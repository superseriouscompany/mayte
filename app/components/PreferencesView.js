import React, { Component } from 'react'
import { BlurView } from 'react-native-blur'
import RangeSlider from '../containers/RangeSlider'
import SexualPreference from '../containers/SexualPreference'
import { em, tabNavHeight, screenHeight, notchHeight } from '../constants/dimensions'
import { mayteBlack, mayteRed } from '../constants/colors'
import {
  StyleSheet,
  ScrollView,
  Alert,
  View,
  Image,
  Text,
  Slider,
  TouchableOpacity,
} from 'react-native'

const bubbleDiameter = 200

export default class PreferencesView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollEnabled: true
    }
  }

  render() {
    const { props, state } = this
    return(
      <View style={{flex: 1}}>
        <Image source={{uri: props.user.photos[0].url}} resizeMode='cover' style={style.background} />
        <BlurView style={style.blur}
                  blurType="light"
                  blurAmount={10}
                  viewRef={null/* required for Android */} />
        <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false} scrollEnabled={state.scrollEnabled}>
          <TouchableOpacity onPress={() => props.viewSettingsPage('Profile')}>
            <Image style={style.bubble} source={{uri: props.user.photos[0].url}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.viewSettingsPage('Editor')}>
            <Text style={style.editCTA}>EDIT PROFILE</Text>
          </TouchableOpacity>

          <View style={style.preferences}>
            <View style={[style.preference]}>
              <View style={style.preferenceHeader}>
                <Text style={style.preferenceLabel}>Age Preference</Text>
                <Text style={style.preferenceSetting}>
                  {props.ageRange[0]} - {`${props.ageRange[1]}${props.ageRange[1] === props.maxAge ? '+' : ''}`}
                </Text>
              </View>
              <RangeSlider onUpdate={(pcts) =>
                             props.updateAgeRange(pcts.map(p => Math.round(p * (props.maxAge - props.minAge)) + props.minAge))
                           }
                           minValue={props.minAge}
                           maxValue={props.maxAge}
                           values={props.ageRange}
                           markerDiameter={em(1.33)}
                           onGestureStart={() => this.setState({scrollEnabled: false})}
                           onGestureEnd={() => {
                             this.setState({scrollEnabled: true})
                             this.props.updatePreferences()
                           }} />
            </View>

            <View style={[style.preference]}>
              <View style={style.preferenceHeader}>
                <Text style={style.preferenceLabel}>Distance</Text>
                <Text style={style.preferenceSetting}>
                  {`${props.distance}${props.distance === props.maxDistance ? '+' : ''}`} miles away
                </Text>
              </View>
              <RangeSlider onUpdate={(pcts) => {
                             let d = Math.round(pcts[0] * (props.maxDistance - props.minDistance)) + props.minDistance
                             return props.updateDistance(d)
                           }}
                           numMarkers={1}
                           debug={true}
                           markerDiameter={em(1.33)}
                           minValue={props.minDistance}
                           maxValue={props.maxDistance}
                           values={[props.distance]}
                           onGestureStart={() => this.setState({scrollEnabled: false})}
                           onGestureEnd={() => {
                             this.setState({scrollEnabled: true})
                             this.props.updatePreferences()
                           }} />
            </View>
          </View>

          <View style={[style.preference]}>
            <View style={[style.preferenceHeader, {justifyContent: 'flex-start'}]}>
              <Text style={style.preferenceLabel}>Interested In</Text>
            </View>
            <SexualPreference options={['MEN', 'WOMEN', 'ALL']}
                              selected={props.sexual}
                              onUpdate={(o) => {
                                props.updateSexual(o)
                                props.updatePreferences({sexual: o})
                              }} />
          </View>

          <TouchableOpacity onPress={props.logout} style={[style.button]}>
            <Text style={style.logout}>SIGN OUT</Text>
          </TouchableOpacity>

          <Image style={style.logo}
                 resizeMode='contain'
                 source={require('../images/icon-trans-black.png')} />
          <Text style={style.appName}>UNICORN</Text>

          <TouchableOpacity style={style.deleteBtn}
                            onPress={() => {
                              Alert.alert(
                                "Delete Account",
                                "Are you sure?",
                                [
                                  {text: 'Cancel'},
                                  {text: 'Confirm', onPress: () => props.deleteAccount()}
                                ]
                              )
                            }}>
            <Text style={style.deleteBtnText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    paddingTop: em(4),
    alignItems: 'center',
    paddingBottom: tabNavHeight,
  },
  background: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
    opacity: 0.3,
  },
  blur: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    borderWidth: 0,
    opacity: 0.8,
  },
  bubble: {
    width: bubbleDiameter,
    height: bubbleDiameter,
    borderRadius: bubbleDiameter * 0.5,
  },
  editCTA: {
    paddingTop: em(1.66),
    fontSize: em(1),
    fontFamily: 'Gotham-Medium',
    letterSpacing: em(0.1),
    backgroundColor: 'transparent',
  },
  preferences: {
    width: '100%',
    paddingTop: em(3),
  },
  preference: {
    marginBottom: em(2),
    paddingLeft: em(1),
    paddingRight: em(1),
    width: '100%',
  },
  preferenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: em(1),
    alignItems: 'center',
    width: '100%',
    paddingRight: em(1),
  },
  preferenceLabel: {
    fontSize: em(1.33),
    fontFamily: 'Gotham-Medium',
    backgroundColor: 'transparent',
  },
  preferenceSetting: {
    backgroundColor: 'transparent',
    fontFamily: 'Gotham-Book',
  },
  button: {
    paddingTop: em(1.2),
    paddingBottom: em(1.2),
    paddingLeft: em(3.66),
    paddingRight: em(3.66),
    borderRadius: em(0.33),
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'rgba(0,0,0,1)',
    backgroundColor: mayteBlack(0.9),
    marginTop: em(1),
  },
  logout: {
    textAlign: 'center',
    fontFamily: 'Gotham-Book',
    fontSize: em(1),
    letterSpacing: em(0.1),
    color: 'white',
    marginTop: em(0.1),
  },
  logo: {
    marginTop: em(3),
    height: em(3.33),
  },
  appName: {
    fontSize: em(0.8),
    color: mayteBlack(0.66),
    fontFamily: 'Gotham-Book',
    letterSpacing: em(0.1),
    marginTop: em(0.66),
    marginLeft: em(0.1),
    backgroundColor: 'transparent',
  },
  deleteBtn: {
    marginTop: em(2.66),
    backgroundColor: 'transparent',
  },
  deleteBtnText: {
    fontSize: em(0.8),
    backgroundColor: 'transparent',
    color: mayteRed(1),
    fontFamily: 'Gotham-Book',
    letterSpacing: em(0.1),
    marginLeft: em(0.2),
  }
})
