import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { width, height } from '../services/dimensions'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'

export default (props) => {
  return(
    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                    style={style.gradient}>
      <ScrollView style={style.content}
                  scrollEventThrottle={100}
                  onScroll={(e) => {
                    const {y} = e.nativeEvent.contentOffset
                    if (y < 0) {
                      props.hideInfo()
                    }
                  }}
                  scrollEnabled={props.infoOpen ? true : false}>
        <Text style={style.name}>
          {props.user.fullName.split(' ')[0]}, {props.user.age}
        </Text>
        <Text style={style.location}>
          {props.user.distance} miles away
        </Text>
        {
          props.hideButtons ? null :
          <View style={[style.tray]}>
            {
              !props.infoOpen ?
              <TouchableOpacity style={[style.opener]} onPress={() => props.showInfo()} />
              :
              null
            }
            <TouchableOpacity style={[style.bubble]} onPress={() => props.pass(props.user.id)} >
              <Image style={style.icon}
                     resizeMode='contain'
                     source={require('../images/x.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={[style.bubble]} onPress={() => props.like(props.user.id)}>
              <Image style={style.icon}
                     resizeMode='contain'
                     source={require('../images/heart.png')} />
            </TouchableOpacity>
          </View>
        }
        {
          !props.infoOpen ?
          <TouchableOpacity style={style.opener} onPress={() => props.showInfo()} />
          :
          null
        }
        <View style={style.cv}>
          <Text style={style.handle}>Profreshional Model, Treats!</Text>
          <Text style={style.handle}>@beners</Text>
        </View>
        <View>
          <Text style={style.bio}>
{`She a bad bad n she allllready know
(ya she know it)
Whole bank accooount I'll blow it 💸`}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}


const style = StyleSheet.create({
  gradient: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    backgroundColor: 'transparent',
  },

  cv: {
    paddingTop: 30,
  },

  handle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: 23,
  },

  bio: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    paddingTop: 40,
  },

  name: {
    top: 0, left: 0, right: 0,
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 30,
  },

  location: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
  },

  tray: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10,
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
    zIndex: 1,
  },

  icon: {
    height: '60%',
    opacity: 0.8,
  },

  button: {
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0)',
  },

  opener: {
    position: 'absolute',
    top: 10, left: 0,
    width: '100%',
    height: height * 0.25,
    zIndex: 1,
  },
})
