import React, { Component } from 'react'
import { em, screenHeight, screenWidth } from '../constants/dimensions'
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class CameraRollView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top: new Animated.Value(screenHeight)
    }
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    Animated.timing(this.state.top, {
      toValue: 0,
      duration: 300,
    }).start()
  }

  close() {
    Animated.timing(this.state.top, {
      toValue: screenHeight,
      duration: 300
    }).start(this.props.closeCameraRoll)
  }

  render() {
    const { props, state } = this
    return (
      <Animated.ScrollView style={[style.container, {top: state.top}]}>
        <View style={style.centered}>
          <TouchableOpacity onPress={this.close} style={[style.centered,{height: em(3.5)}]}>
            <Text style={style.close}>CLOSE</Text>
          </TouchableOpacity>
        </View>
        <View style={style.photoBin}>
          {
            props.cameraRollEdges.map((e,i) => {
              return(
                <TouchableOpacity key={i} style={[style.thumbnail]}
                                  onPress={() => {
                                    props.pushToPhotoBin(e.node.image.uri)
                                    this.close()
                                  }} >
                  <Image resizeMode='cover'
                         style={{width: '100%', height: '100%'}}
                         source={{uri: e.node.image.uri}} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </Animated.ScrollView>
    )
  }
}

style = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 0, left: 0,
    height: screenHeight,
    backgroundColor: 'white'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
  },
  photoBin: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: screenWidth * 0.12,
  },
  close: {
    fontFamily: 'Gotham-Book',
    fontSize: em(1),
    letterSpacing: em(0.1),
  }
})
