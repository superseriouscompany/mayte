'use strict'

import React, {Component} from 'react'
import Header from '../containers/Header'
import { width, height } from '../services/dimensions'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      { props.loading  ?
        <View style={style.centered}>
          <ActivityIndicator />
        </View>
      : props.error ?
        <View style={style.centered}>
          <Text style={style.error}>
            {props.error}
          </Text>
          <TouchableOpacity onPress={props.logout}>
            <Text style={style.button}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      : !props.photos.length ?
        <View style={style.centered}>
          <Text>You have no photos available.</Text>
          <TouchableOpacity onPress={props.logout}>
            <Text style={style.button}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      :
        <ScrollView style={{flex: 1}}>
          <Text style={style.title}>{props.user && props.user.fullName} ID: {props.user && props.user.id}</Text>
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
