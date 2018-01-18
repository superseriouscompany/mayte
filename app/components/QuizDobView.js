import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {Scene} from './QuizView'
import {ButtonGrey} from './Button'
import {mayteWhite} from '../constants/colors'
import {em} from '../constants/dimensions'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default (props) => {
  return(
    <Scene
      active={props.step == 'dob'}>

      <DatePicker
        style={[{borderRadius: em(0.33)}]}
        customStyles={{
          dateInput: {
            borderWidth: 0,
            borderRadius: em(0.33),
          },
          dateText: {
            fontFamily: 'Gotham-Book',
            fontSize: em(0.9),
          },
          placeholderText: {
            fontFamily: 'Gotham-Book',
            fontSize: em(0.9),
          }
        }}
        date={props.dob}
        mode="date"
        placeholder="Select Date"
        format="MMM Do YYYY"
        showIcon={false}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={props.update} />


      <TouchableOpacity onPress={props.next}>
        <Text>Next</Text>
      </TouchableOpacity>
    </Scene>
  )
}
