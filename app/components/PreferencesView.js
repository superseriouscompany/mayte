import React, { Component } from 'react'
import RangeSlider from '../containers/RangeSlider'
import { em } from '../constants/dimensions'
import {
  StyleSheet,
  ScrollView,
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
      <ScrollView contentContainerStyle={style.container} scrollEnabled={state.scrollEnabled}>
        <TouchableOpacity onPress={() => props.viewProfile()}>
          <Image style={style.bubble} source={{uri: props.user.photos[0].url}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.viewEditor()}>
          <Text style={style.editCTA}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={style.preferences}>
          <View style={[style.preference]}>
            <View style={style.preferenceHeader}>
              <Text style={style.preferenceLabel}>Age Preference</Text>
              <Text>{props.ageRange[0]} - {props.ageRange[1]}</Text>
            </View>
            <RangeSlider onUpdate={(pcts) =>
                           props.updateAgeRange(pcts.map(p => Math.round(p * (props.maxAge - props.minAge)) + props.minAge))
                         }
                         minValue={props.minAge}
                         maxValue={props.maxAge}
                         values={props.ageRange}
                         onGestureStart={() => this.setState({scrollEnabled: false})}
                         onGestureEnd={() => {
                           this.setState({scrollEnabled: true})
                           this.props.updatePreferences()
                         }} />
          </View>

          <View style={[style.preference]}>
            <View style={style.preferenceHeader}>
              <Text style={style.preferenceLabel}>Distance</Text>
              <Text>{props.distance} miles away</Text>
            </View>
            <RangeSlider onUpdate={(pcts) => {
                           let d = Math.round(pcts[0] * (props.maxDistance - props.minDistance)) + props.minDistance
                           return props.updateDistance(d)
                         }}
                         numMarkers={1}
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

        <TouchableOpacity onPress={props.logout}>
          <Text style={style.logout}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: em(4),
    alignItems: 'center',
  },
  bubble: {
    width: bubbleDiameter,
    height: bubbleDiameter,
    borderRadius: bubbleDiameter * 0.5,
  },
  editCTA: {
    paddingTop: em(1.66),
    fontSize: em(1.66),
  },
  preferences: {
    width: '100%',
    paddingTop: em(2),
    paddingLeft: em(1),
    paddingRight: em(1),
  },
  preference: {
    marginBottom: em(2),
  },
  preferenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: em(1),
    alignItems: 'center',
    paddingRight: em(1),
  },
  preferenceLabel: {
    fontSize: em(1.33),
  },

  logout: {
    textAlign: 'center',
    marginTop: em(2),
    marginBottom: em(2),
  },
})