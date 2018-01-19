import React, { Component }                 from 'react'
import { BlurView }                         from 'react-native-blur'
import LinearGradient                       from 'react-native-linear-gradient'
import RangeSlider                          from '../containers/RangeSlider'
import MaytePicker                          from '../containers/MaytePicker'
import OrbitLoader                          from './OrbitLoader'
import {ButtonBlack}                        from './Button'
import { Star }                             from './Environment'
import {
  mayteBlack,
  mayteWhite,
  mayteGreen,
  mayteRed,
} from '../constants/colors'
import {
  em,
  tabNavHeight,
  screenHeight,
  notchHeight
} from '../constants/dimensions'
import {
  StyleSheet,
  ScrollView,
  Alert,
  View,
  Image,
  Text,
  Slider,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native'

const bubbleDiameter = 200
const orbitLoaderRadius = em(0.8)

export default class PreferencesView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollEnabled: true,
      savingAge: false,
      savingDistance: false,
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
          <ButtonBlack text={`EDIT PROFILE`} onPress={() => props.viewSettingsPage('Editor')} style={style.editBtn} />

          <View style={style.preferences}>
            <View style={[style.preference]}>
              <View style={style.preferenceHeader}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[style.preferenceLabel]}>Age Preference</Text>
                  { state.savingAge ?
                    <OrbitLoader color={mayteBlack()}
                                 radius={orbitLoaderRadius}
                                 style={{marginLeft: em(0.8), transform: [{translateY: orbitLoaderRadius*0.2}]}}
                                 orbRadius={orbitLoaderRadius/4} /> : null }
                </View>
                <Text style={style.preferenceSetting}>
                  {props.ageRange[0]} {`\u2014`} {`${props.ageRange[1]}${props.ageRange[1] === props.maxAge ? '+' : ''}`}
                </Text>
              </View>
              <RangeSlider onUpdate={(pcts) =>
                             props.updateAgeRange(pcts.map(p => Math.round(p * (props.maxAge - props.minAge)) + props.minAge))
                           }
                           minValue={props.minAge}
                           maxValue={props.maxAge}
                           values={props.ageRange}
                           markerDiameter={em(1.33)}
                           trackHighlight={mayteGreen()}
                           onGestureStart={() => this.setState({scrollEnabled: false})}
                           onGestureEnd={() => {
                             this.setState({scrollEnabled: true, savingAge: true})
                             this.props.updatePreferences().then(() => this.setState({savingAge: false}))
                           }} />
            </View>

            <View style={[style.preference]}>
              <View style={style.preferenceHeader}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[style.preferenceLabel]}>Max Distance</Text>
                  { state.savingDistance ?
                    <OrbitLoader color={mayteBlack()}
                                 radius={orbitLoaderRadius}
                                 style={{marginLeft: em(0.8), transform: [{translateY: orbitLoaderRadius*0.2}]}}
                                 orbRadius={orbitLoaderRadius/4} /> : null }
                </View>
                <Text style={style.preferenceSetting}>
                  {`${props.distance}${props.distance === props.maxDistance ? '+' : ''}`} miles away
                </Text>
              </View>
              <RangeSlider onUpdate={(pcts) => {
                             let d = Math.round(pcts[0] * (props.maxDistance - props.minDistance)) + props.minDistance
                             return props.updateDistance(d)
                           }}
                           numMarkers={1}
                           markerDiameter={em(1.33)}
                           minValue={props.minDistance}
                           maxValue={props.maxDistance}
                           values={[props.distance]}
                           trackHighlight={mayteGreen()}
                           onGestureStart={() => this.setState({scrollEnabled: false})}
                           onGestureEnd={() => {
                             this.setState({scrollEnabled: true, savingDistance: true})
                             this.props.updatePreferences().then(() => this.setState({savingDistance: false}))
                           }} />
            </View>
          </View>

          <View style={[style.preference]}>
            <View style={[style.preferenceHeader, {justifyContent: 'flex-start'}]}>
              <Text style={style.preferenceLabel}>I am</Text>
            </View>
            <MaytePicker options={[
                           {label: 'MALE', value: 'male'},
                           {label: 'FEMALE', value: 'female'},
                           {label: 'OTHER', value: 'null'},
                         ]}
                         selected={props.gender}
                         onUpdate={(o) => {
                           // TODO: do this optimistically in updatePreferences
                           // with automatic retries
                           props.updateGender(o)
                           props.updatePreferences({gender: o})
                         }} />
          </View>

          <View style={[style.preference]}>
            <View style={[style.preferenceHeader, {justifyContent: 'flex-start'}]}>
              <Text style={style.preferenceLabel}>Interested In</Text>
            </View>
            <MaytePicker options={[
                           {label: 'MEN', value: 'male'},
                           {label: 'WOMEN', value: 'female'},
                           {label: 'ALL', value: 'null'},
                         ]}
                         selected={props.orientation}
                         onUpdate={(o) => {
                           props.updateOrientation(o)
                           props.updatePreferences({orientation: o})
                         }} />
          </View>

          <ButtonBlack text={`SIGN OUT`} onPress={props.logout} style={style.logout} />

          <Image style={style.icon}
                 resizeMode='contain'
                 source={require('../images/unicorn-icon-black.png')} />
          <Image style={style.logo}
                 source={require('../images/unicorn-logo-black.png')}
                 resizeMode="contain" />


          { props.isDeleting ?
            <View style={style.buttonsCnr}>
              <ActivityIndicator size="large" style={style.deleteLoader}/>
            </View>
          :
            <View style={style.buttonsCnr}>
              <TouchableOpacity style={style.footerBtn}
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
                <Text style={style.footerBtnText}>DELETE ACCOUNT</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[style.footerBtn, style.legalBtn]}
                onPress={() => Linking.openURL('https://dateunicorn.com/privacy-policy')}>
                <Text style={[style.footerBtnText, style.legalText]}>PRIVACY POLICY</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[style.footerBtn, style.legalBtn]}
                onPress={() => Linking.openURL('https://dateunicorn.com/terms')}>
                <Text style={[style.footerBtnText, style.legalText]}>TERMS OF SERVICE</Text>
              </TouchableOpacity>
            </View>
          }
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
  editBtn: {
    marginTop: em(1.66),
    paddingTop: em(0.66),
    paddingBottom: em(0.66),
    paddingLeft: em(1.2),
    paddingRight: em(1.1),
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
    fontFamily: 'Futura',
    backgroundColor: 'transparent',
  },
  preferenceSetting: {
    backgroundColor: 'transparent',
    fontFamily: 'Gotham-Book',
    marginTop: em(0.6),
  },
  button: {
    paddingTop: em(0.66),
    paddingBottom: em(0.66),
    paddingLeft: em(2),
    paddingRight: em(2),
    borderRadius: em(0.33),
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'rgba(0,0,0,1)',
    marginTop: em(1),
  },
  logout: {
    marginTop: em(1),
    paddingLeft: em(1.8),
    paddingRight: em(1.8),
  },
  icon: {
    marginTop: em(3),
    height: em(3.33),
  },
  logo: {
    height: em(1.2),
    width: em(6),
    marginTop: em(0.66),
  },
  buttonsCnr: {
    alignItems: 'center'
  },
  deleteLoader: {
    marginTop: em(2.66)
  },
  footerBtn: {
    marginTop: em(2.66),
    backgroundColor: 'transparent',
  },
  legalBtn: {
    marginTop: em(1.33),
  },
  footerBtnText: {
    fontSize: em(0.8),
    backgroundColor: 'transparent',
    color: mayteRed(1),
    fontFamily: 'Gotham-Book',
    letterSpacing: em(0.1),
    marginLeft: em(0.2),
  },
  legalText: {
    color: mayteBlack(),
  },
})
