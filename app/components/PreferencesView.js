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
          <View style={style.preferenceHeader}>
            <Text style={style.preferenceLabel}>Age Preference</Text>
            <Text>{props.ageRange[0]} - {props.ageRange[1]}</Text>
          </View>
          <RangeSlider onUpdate={(pcts) =>
                         props.updateAgeRange(pcts.map(p => Math.round(p * (props.maxAge - props.minAge)) + props.minAge))
                       }
                       onGestureStart={() => this.setState({scrollEnabled: false})}
                       onGestureEnd={() => this.setState({scrollEnabled: true})} />
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
