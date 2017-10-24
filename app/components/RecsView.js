'use strict'

import React, {Component} from 'react'
import Header from '../containers/Header'
import RecInfoView from './RecInfoView'
import {
  ActivityIndicator,
  Dimensions,
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
const {width, height} = Dimensions.get('window')

export default function(props) {
  const imgStyle = {width: width, height: props.viewHeight}
  const style = {
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
  }

  return (
    <View style={style.container}>
      <Header />

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
        <View style={style.container}>
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
                      data={props.recs[props.index].photos || []}
                      keyExtractor={(item, index) => index}
                      renderItem={({item}) =>
                        <Image style={imgStyle}
                               resizeMode="cover"
                               source={{url: item.url}} />
                      } />

          <RecInfoView {...props} />
        </View>
      }
    </View>
  )
}
