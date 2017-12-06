'use strict'

import React, {Component} from 'react'
import moment             from 'moment'
import DatePicker         from 'react-native-datepicker'
import { screenWidth }    from '../constants/dimensions'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native'

export default (props) => {
  const oldest   = moment().subtract(100, 'years')
  const youngest = moment().subtract(18, 'years')
  const maxDob   = `${oldest.year()}-${oldest.month()}-${oldest.date()}`
  const minDob   = `${youngest.year()}-${youngest.month()}-${youngest.date()}`

  return (
    <View style={style.container}>
      { props.loading  ?
        <View style={style.centered}>
          <ActivityIndicator />
        </View>
      : props.error ?
        <View style={style.centered}>
          <Text style={style.error}>
            {props.error}
          </Text>
          <TouchableOpacity onPress={props.logout}>
            <Text style={style.button}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      : !props.photos.length ?
        <View style={style.centered}>
          <Text>You have no photos available.</Text>
          <View>
            <TextInput style={[style.bio]}
                       multiline={true}
                       maxLength={500}
                       defaultValue={props.user.bio || 'Sample bio text'}
                       onChangeText={text => {
                         // Goal is to have timeout here a la:
                         //   cancelTimeout(this.bioTimeout)
                         //   this.bioTimeout = setTimeout(() => props.updateBio(text), 500)
                         props.updateBio(text)
                       }}></TextInput>
            <TextInput style={[style.age]}
                       keyboardType={'numeric'}
                       defaultValue={props.user.age || '25'}
                       onChangeText={text => {
                         // Goal is to have timeout here a la:
                         //   cancelTimeout(this.ageTimeout)
                         //   this.ageTimeout = setTimeout(() => props.updateAge(text), 500)
                         props.updateAge(parseInt(text))
                       }} />
          </View>
          <TouchableOpacity onPress={props.logout}>
            <Text style={style.button}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      :
        <ScrollView style={{flex: 1}}>
          <Text style={style.title}>{props.user && props.user.fullName} ID: {props.user && props.user.id}</Text>
          <View style={style.grid}>
            { (props.photos || []).map((p, key) => (
              <TouchableOpacity key={key}
                                onPress={() => p.isActive ? props.deactivate(p.instagramId) : props.activate(p.instagramId)}>
                <Image source={{url: p.thumbnail.url}}
                       style={[style.image, {
                         width: screenWidth / 3,
                         height: screenWidth / 3,
                       }, p.isActive ? style.active : style.inactive]} />
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <TextInput style={[style.bio]}
                       multiline={true}
                       maxLength={500}
                       defaultValue={props.user.bio || 'Sample bio text'}
                       onChangeText={text => {
                         // Goal is to have timeout here a la:
                         //   cancelTimeout(this.bioTimeout)
                         //   this.bioTimeout = setTimeout(() => props.updateBio(text), 500)
                         props.setBio(text)
                       }}></TextInput>
            <TouchableOpacity style={[style.submitBtn, {opacity: props.updatingBio ? 0.5 : 1}]}
                              onPress={props.updateBio}>
              <Text>SUBMIT</Text>
            </TouchableOpacity>
            <DatePicker style={{width: screenWidth - 40, marginLeft: 20}}
                        date={props.dob}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={minDob}
                        maxDate={maxDob}
                        showIcon={false}
                        confirmBtnText="confirm"
                        cancelBtnText="cancel"
                        onDateChange={date => props.setDob(date)} />
            <TouchableOpacity style={[style.submitBtn, {opacity: props.updatingDob ? 0.5 : 1}]}
                              onPress={props.updateDob}>
              <Text>SUBMIT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={props.logout}>
            <Text style={style.button}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red'
  },
  grid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
  },
  title: {
    textAlign: 'center',
    padding: 10,
    paddingTop: 25,
  },
  button: {
    color: 'blue',
    textAlign: 'center',
    padding: 10,
  },
  active: {
  },
  inactive: {
    opacity: .25,
  },
  bio: {
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    height: 100,
  },
  dob: {
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
  },
  submitBtn: {
    margin: 20,
    backgroundColor: 'lightblue',
    padding: 10,
  }
})