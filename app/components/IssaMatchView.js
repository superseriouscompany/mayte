import React, {Component} from 'react'
import { screenWidth, screenHeight } from '../constants/dimensions'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

class IssaMatchView extends Component {
  render() {
    const {props} = this
    return (
      <View style={[style.container, {height: props.viewHeight}]}>
        <Text style={style.title}>{`U GUYS SHUD KISS <3`}</Text>

        <View style={style.tray}>
          <Image style={style.bubble} source={{uri: 'https://pokewalls.files.wordpress.com/2011/04/1bulbasaur1920x1200.jpg'}} />
          <Image style={style.bubble} source={{uri: props.otherUser.photos[0].url}} />
        </View>

        <TouchableOpacity onPress={() => {props.viewChat(); props.dismiss()}}
                          style={[style.button, {marginBottom: 40}]}>
          <Text style={[style.buttonText]}>START CHATTING</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {/*some animation*/ props.dismiss()}}
                          style={style.button}>
          <Text style={[style.buttonText]}>KEEP BROWSING</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default IssaMatchView

style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    backgroundColor: 'rgba(35,31,32, 0.8)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bubble: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginLeft: 20,
    marginRight: 20,
  },

  tray: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  button: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'rgba(0,0,0,1)',
    backgroundColor: 'rgba(220,224,223,1)',
    width: 280,
  },

  buttonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(35,31,32,1)',
    letterSpacing: 1,
  }
})
