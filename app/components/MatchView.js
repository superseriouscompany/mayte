'use strict'

import React, {Component}                 from 'react'
import MatchInfoView                      from './MatchInfoView'
import ProfileView                        from './ProfileView'
import {
  screenWidth,
  notchHeight,
  matchHeaderHeight,
} from '../constants/dimensions'
import {
  Animated,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  View,
} from 'react-native'

const useScratch = false

export default (props) => {
  const imgStyle = {width: screenWidth, height: props.viewHeight}

  return (
    <View style={{...style.container, marginTop: matchHeaderHeight + notchHeight}}>
      <ProfileView {...props}
                   matchOpen={props.view === 'Profile'}
                   hideButtons={true} />
    </View>
  )
}

const style = {
  container: {
    flex: 1,
  },

  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },

  error: {
    color: 'red',
  },
}
