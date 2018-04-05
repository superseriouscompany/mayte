'use strict'

import React, {Component} from 'react'
import { em } from '../constants/dimensions'
import { mayteBlack } from '../constants/colors'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  const user = props.match.user

  return (
    <TouchableOpacity style={style.container} onPress={props.viewChat}>
      <Image source={{url: user.photos[0].url}} style={style.image} />
      <Text style={style.name}>{user.fullName}</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingTop:        em(0.66),
    paddingBottom:     em(0.66),
    paddingLeft:       em(1),
    paddingRight:      em(1),
    borderColor:       mayteBlack(0.1),
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  name: {
    fontFamily: 'Futura',
    fontSize: em(1.2),
    color: mayteBlack(),
  },
  image: {
    borderRadius: em(2),
    width: em(4),
    height: em(4),
    marginRight: em(1),
  }
})
