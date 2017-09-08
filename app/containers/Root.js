'use strict'

import React, {Component} from 'react'
import {
  Dimensions,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

const {width, height} = Dimensions.get('window')

export default class Root extends Component {
  render() { return (
    <View style={style.container}>
      <View style={style.tray}>
        <TouchableOpacity onPress={() => alert('no')}>
          <Text style={style.button}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('yes')}>
          <Text style={style.button}>Yes</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={[style.container]}>
        <Image style={style.image} resizeMode="cover" source={{url: 'https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/21372067_129553654347748_5155457396683833344_n.jpg'}} />
        <Image style={style.image} resizeMode="cover" source={{url: 'https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/21147329_1973484256261473_9031074582802464768_n.jpg'}} />
        <Image style={style.image} resizeMode="cover" source={{url: 'https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/21433986_1471057176276621_7259829455751741440_n.jpg'}} />
      </ScrollView>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  tray: {
    backgroundColor: 'hotpink',
    position: 'absolute',
    top: height - 50,
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
  }
})
