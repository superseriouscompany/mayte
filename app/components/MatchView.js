'use strict'

import React, {Component} from 'react'
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
      <Text>{user.fullName}</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding:           10,
    borderColor:       'lightgrey',
    flexDirection:     'row',
    alignItems:        'center',
  },
  image: {
    borderRadius: 10,
    width: 50,
    height: 50,
    marginRight: 10,
  }
})
