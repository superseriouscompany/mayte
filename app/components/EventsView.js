import React, {Component} from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      { props.loading ?
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      : !props.events ?
        null
      : !props.events.length ?
        <View style={styles.centered}>
          <Text>No events found.</Text>
        </View>
      :
        <View style={styles.container}>
          {props.events.map((e, key) => (
            <Text key={key}>{e.title}</Text>
          ))}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:    1,
    padding: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems:     'center',
    flex:           1,
  }
})
