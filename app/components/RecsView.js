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
          <View style={style.info}>
            <Text style={style.name}>
              {props.recs[props.index].fullName.split(' ')[0]}, {20 + Math.floor(Math.random() * 10)} ({Math.ceil(Math.random() * 5)} miles away)
            </Text>
            <View style={[style.tray]}>
              <TouchableOpacity style={[style.bubble]} onPress={() => props.pass(props.recs[props.index].id)}>
                <Image style={style.icon}
                       resizeMode='contain'
                       source={require('../images/x.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[style.bubble]} onPress={() => props.like(props.recs[props.index].id)}>
                <Image style={style.icon}
                       resizeMode='contain'
                       source={require('../images/heart.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  info: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },

  tray: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  bubble: {
    width: width * 0.3,
    height: width * 0.125,
    borderRadius: width * 0.125,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    height: '60%',
    opacity: 0.8,
  },

  button: {
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0)',
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
    top: 0,
    left: 0,
    right: 0,
    color: 'rgba(255,255,255,1)',
    backgroundColor: 'rgba(255,255,255,0)',
    textAlign: 'center',
    fontSize: 20,
    zIndex: 1,
  }
})
