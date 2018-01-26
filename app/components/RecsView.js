'use strict'

import React, {Component} from 'react'
import RecView            from './RecView'
import IssaMatchView      from './IssaMatchView'
import Text               from './Text'
import {mayteBlack}       from '../constants/colors'
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      { props.loading ?
        <View style={[styles.container, styles.centered]}>
          <ActivityIndicator size="large"/>
        </View>
      : props.error ?
        <View style={[styles.container, styles.centered]}>
          <Text style={styles.error}>{props.error}</Text>
        </View>
      : !props.recs[props.index] ?
        <View style={[styles.container, styles.centered]}>
          <Text style={{color: mayteBlack()}}>{"There's no one new around you."}</Text>
          <Text style={{color: mayteBlack()}}>{"Check back later!"}</Text>
        </View>
      :
        <View style={styles.container}>
          { !props.recs[props.index + 1] ? null :
            <RecView key={props.recs[props.index + 1].id}
                     rec={props.recs[props.index + 1]}
                     viewHeight={props.viewHeight}
                     setHeight={props.setHeight}
                     like={props.like}
                     pass={props.pass} />
          }
          <RecView key={props.recs[props.index].id}
                   rec={props.recs[props.index]}
                   viewHeight={props.viewHeight}
                   setHeight={props.setHeight}
                   like={props.like}
                   pass={props.pass} />
          { !props.match ? null :
            <IssaMatchView viewHeight={props.viewHeight}
                           otherUser={props.match}
                           dismiss={props.dismiss}/>
          }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    justifyContent: 'center',
    alignItems:     'center',
  },
  error: {
    color: 'red',
  },
})
