'use strict'

import React, {Component} from 'react'
import Header from '../containers/Header'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const useScratch = false
const {width, height} = Dimensions.get('window')

export default function(props) {
  return (
    <View style={style.container}>
      <Header />

      { props.loading ?
        <View style={style.centered}>
          <ActivityIndicator />
        </View>
      : props.error ?
        <View style={style.centered}>
          <Text style={style.error}>{props.error}</Text>
        </View>
      : props.exhausted || props.index >= props.recs.length ?
        <View style={style.centered}>
          <Text>There's no one new around you.</Text>
        </View>
      :
        <View style={style.container}>
          <View style={style.tray}>
            <TouchableOpacity onPress={() => props.pass(props.recs[props.index].id)}>
              <Text style={style.button}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.like(props.recs[props.index].id)}>
              <Text style={style.button}>Yes</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={[style.container]}>
            { (props.recs[props.index].photos || []).map((p, key) => (
              <Image key={key} style={style.image} resizeMode="cover" source={{url: p.url}} />
            ))}
          </ScrollView>
        </View>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  tray: {
    backgroundColor: 'hotpink',
    position: 'absolute',
    bottom: 0,
    height: 50,
    zIndex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    color: 'white',
  },

  image: {
    height: height,
    width: width,
  },

  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },

  error: {
    color: 'red',
  }
})
