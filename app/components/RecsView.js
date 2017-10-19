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
  Animated,
} from 'react-native'

const useScratch = false
const {width, height} = Dimensions.get('window')

export default function(props) {
  const imgStyle = {width: width, height: props.viewHeight}

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
          <Text style={style.name}>{props.recs[props.index].fullName.split(' ')[0]}, {20 + Math.floor(Math.random() * 10)} ({Math.ceil(Math.random() * 5)} miles away)</Text>
          <ScrollView style={[style.container]}
                      onLayout={(e) => {
                        const {height} = e.nativeEvent.layout
                        props.setHeight(height)
                      }}
                      showsVerticalScrollIndicator={false}
                      pagingEnabled>
            { (props.recs[props.index].photos || []).map((p, key) => (
              <Image key={key}
                     style={imgStyle}
                     resizeMode="cover"
                     source={{url: p.url}} />
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
    backgroundColor: '#d6d6d6',
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

  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },

  error: {
    color: 'red',
  },

  name: {
    position: 'absolute',
    top: 0,
    padding: 10,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'red',
    textAlign: 'center',
    zIndex: 1,
  }
})
