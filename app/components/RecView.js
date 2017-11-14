'use strict'

import React, {Component} from 'react'
import RecInfoView from './RecInfoView'
import { width, height } from '../constants/dimensions'
import {
  ActivityIndicator,
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
    this.imgStyle = {width: width, height: props.viewHeight}
  }
  render() {
    const {props} = this
    return (
      <View style={style.container}>
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
            <Text>{`There's no one new around you.`}</Text>
          </View>
        :
          <View style={[style.container]}>
            <FlatList style={[style.container]}
                      onLayout={(e) => {
                        const {height} = e.nativeEvent.layout
                        props.setHeight(height)
                      }}
                      onScroll={(e) => {
                        const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
                        if (contentOffset.y + layoutMeasurement.height > contentSize.height) {
                          e.preventDefault()
                          props.showInfo()
                        }
                      }}
                      showsVerticalScrollIndicator={false}
                      pagingEnabled
                      data={props.rec.photos || []}
                      keyExtractor={(item, index) => index}
                      renderItem={({item}) =>
                        <Image style={this.imgStyle}
                               resizeMode="cover"
                               source={{url: item.url}} />
                      } />

            <RecInfoView {...props} />
          </View>
        }
      </View>
    )
  }
}

const style = StyleSheet.create({

  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
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
