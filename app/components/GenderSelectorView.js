'use strict'

import React, {Component} from 'react'
import Text from './Text'
import base from '../constants/styles'
import {em} from '../constants/dimensions'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

// TODO: use Picker component https://streetsmartdev.com/creating-form-select-component-in-react-native/

export default function(props) {
  return (
    <View style={styles.container}>
      { props.loading ?
        <ActivityIndicator />
      :
        <View style={styles.container}>
          <View style={styles.optionsCnr}>
            <View style={styles.options}>
              <Text style={styles.heading}>I identify as:</Text>

              <Option {...props} field="gender" value="female">A Woman</Option>
              <Option {...props} field="gender" value="male">A Man</Option>
              <Option {...props} field="gender" value="null">Other</Option>
            </View>

            <View style={styles.options}>
              <Text style={styles.heading}>I am interested in:</Text>

              <Option {...props} field="orientation" value="male">Men</Option>
              <Option {...props} field="orientation" value="female">Women</Option>
              <Option {...props} field="orientation" value="null">Everyone</Option>
            </View>
          </View>
          <TouchableOpacity style={[base.button, styles.continue]} onPress={props.select}>
            <Text style={[base.buttonText]}>Continue</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

function Option(props) {
  const selected = props[props.field] == props.value

  return (
    <TouchableOpacity style={[styles.option, selected ? styles.selected : null]} key={props.field + '-' + props.value} onPress={() => props.set(props.field, props.value)}>
      <Text style={selected ? styles.selectedText : null}>
        {props.children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    borderWidth: 1,
  },
  selectedText: {
  },
  optionsCnr: {
    flex: 1,
    padding: em(2),
    width: em(20),
  },
  continue: {
    marginTop: em(1),
    marginBottom: em(1),
  },
  heading: {
    marginBottom: em(1),
  },
  options: {
    marginBottom: em(2),
  },
  option: {
    padding: em(1),
  }
})
