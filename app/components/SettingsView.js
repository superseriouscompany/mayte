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

const {width, height} = Dimensions.get('window')

export default function(props) {
  return (
    <View style={style.container}>
      <Header />
      { props.loading  ?
        <View style={style.centered}>
          <ActivityIndicator />
        </View>
      : props.error ?
        <View style={style.centered}>
          <Text style={style.error}>
            {props.error}
          </Text>
        </View>
      : !props.photos.length ?
        <View style={style.centered}>
          <Text>You have no photos available.</Text>
        </View>
      :
        <ScrollView style={{flex: 1}}>
          <Text style={style.title}>{props.user && props.user.fullName}</Text>
          <View style={style.grid}>
            { (props.photos || []).map((p, key) => (
              <TouchableOpacity key={key}
                                onPress={() => p.isActive ? props.deactivate(p.instagramId) : props.activate(p.instagramId)}>
                <Image source={{url: p.thumbnail.url}}
                       style={[style.image, {
                         width: width / 3,
                         height: width / 3,
                       }, p.isActive ? style.active : style.inactive]} />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={props.logout}>
            <Text style={style.button}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red'
  },
  grid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
  },
  title: {
    textAlign: 'center',
    padding: 10,
  },
  button: {
    color: 'blue',
    textAlign: 'center',
    padding: 10,
  },
  active: {
  },
  inactive: {
    opacity: .25,
  },
})
