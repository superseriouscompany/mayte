'use strict'

import React, {Component} from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity onPress={props.addPass}>
          <Text>Add pass to wallet</Text>
        </TouchableOpacity>
      </View>
      <WebView style={{flex: 1}} source={{uri: 'https://dateunicorn.com/velvetrope/'}} scrollEnabled={false} scalesPageToFit={false}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 20,
  },
})
