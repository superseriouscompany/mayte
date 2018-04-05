'use strict'

import React, {Component}                         from 'react'
import { ParticleSheet }                          from './Particle'
import MatchPreview                               from './MatchPreview'
import { notchHeight, matchHeaderHeight, em }     from '../constants/dimensions'
import { mayteBlack, mayteWhite, }                from '../constants/colors'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <ParticleSheet count={6} loopLength={10000} scale={0.4} particleStyle={{opacity: 0.4}} />
      <ParticleSheet count={6} loopLength={15000} scale={0.8} particleStyle={{opacity: 0.8}} />
      <ParticleSheet count={6} loopLength={20000} scale={1} />
      
      <View style={[style.centered, style.header]}>
        <Text style={style.headerLabel}>Connections</Text>
      </View>
      { props.loading  ?
        <View style={[style.container, style.centered]}>
          <ActivityIndicator />
        </View>
      : props.error ?
        <View style={[style.container, style.centered]}>
          <Text style={style.error}>
            {props.error}
          </Text>
        </View>
      : !props.matches.length ?
        <View style={[style.container, style.centered]}>
          <Text style={style.text}>You have no conversations.</Text>
        </View>
      :
        <ScrollView style={{flex: 1}}>
          { props.matches.map((m, key) => (
            <MatchPreview key={key} match={m} viewChat={() => props.viewChat(m.user)} />
          ))}
        </ScrollView>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red'
  },
  header: {
    height: matchHeaderHeight + notchHeight,
    paddingTop: notchHeight,
    borderBottomWidth: 1,
    borderBottomColor: mayteBlack(0.5),
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  headerLabel: {
    fontSize: em(1.5),
    letterSpacing: em(0.05),
    fontFamily: 'Futura',
  },
  text: {
    fontFamily: 'Futura',
    fontSize: em(1),
  }
})
