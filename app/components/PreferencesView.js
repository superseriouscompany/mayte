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
  render() {
    const { props, state } = this
    return(
      <ScrollView contentContainerStyle={style.container}>
        <TouchableOpacity onPress={() => props.viewProfile()}>
          <Image style={style.bubble} source={{uri: props.user.photos[0].url}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.viewEditor()}>
          <Text style={style.editCTA}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={style.preferences}>
          <View style={style.preferenceHeader}>
            <Text style={style.preferenceLabel}>Age Preference</Text>
            <Text>{props.ageRange}</Text>
          </View>
          <RangeSlider minValue={18}
                       maxValue={50} />
        </View>
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
  preferenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preferenceLabel: {
    fontSize: em(1.33),
  }
})
