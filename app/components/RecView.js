'use strict'

import React, {Component} from 'react'
import RecInfoView from './RecInfoView'
import { screenWidth, screenHeight } from '../constants/dimensions'
import {
  ActivityIndicator,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  View,
} from 'react-native'

const useScratch = false

export default class RecView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoOpen: false,
      leftValue: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }
  }

  animateLike() {
    Animated.parallel([
      Animated.timing(this.state.leftValue, {
        toValue: screenWidth,
        duration: 333,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 333,
      })
    ]).start()
  }

  animatePass() {
    Animated.parallel([
      Animated.timing(this.state.leftValue, {
        toValue: -screenWidth,
        duration: 333,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 333,
      })
    ]).start()
  }

  render() {
    const {props, state} = this
    return (
      <Animated.View style={[{left: state.leftValue, opacity: state.opacity}, style.wrapper]}>
        { props.loading ?
          <View style={style.centered}>
            <ActivityIndicator />
          </View>
        : props.error ?
          <View style={style.centered}>
            <Text style={style.error}>{props.error}</Text>
          </View>
        : props.exhausted || props.recs.length === 0 ?
          <View style={style.centered}>
            <Text>{`There's no one new around you.`}</Text>
          </View>
        :
          <View style={[style.container]}>
            <FlatList style={[style.container]}
                      onLayout={(e) => {
                        const {height} = e.nativeEvent.layout
                        return props.viewHeight ? null : props.setHeight(height)
                      }}
                      onScroll={(e) => {
                        const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
                        if (contentOffset.y + layoutMeasurement.height > contentSize.height) {
                          e.preventDefault()
                          this.setState({infoOpen: true})
                        }
                      }}
                      showsVerticalScrollIndicator={false}
                      pagingEnabled
                      data={props.rec.photos || []}
                      keyExtractor={(item, index) => index}
                      renderItem={({item}) =>
                        <Image style={{width: screenWidth, height: props.viewHeight}}
                               resizeMode="cover"
                               source={{url: item.url}} />
                      } />

            <RecInfoView {...props}
                         infoOpen={state.infoOpen}
                         like={() => {this.animateLike(); props.like(props.rec)}}
                         pass={() => {this.animatePass(); props.pass(props.rec)}}
                         showInfo={() => this.setState({infoOpen: true})}
                         hideInfo={() => this.setState({infoOpen: false})} />
          </View>
        }
      </Animated.View>
    )
  }
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
  },

  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },

  error: {
    color: 'red',
  },

})
