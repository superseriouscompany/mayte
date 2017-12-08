import React, { Component } from 'react'
import moment from 'moment'
import { mayteBlack } from '../constants/colors'
import DatePicker from 'react-native-datepicker'
import CurrentPhotos from '../containers/CurrentPhotos'
import CameraRoll from '../containers/CameraRoll'
import {
  em,
  statusBarHeight,
  screenWidth,
  screenHeight,
} from '../constants/dimensions'
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Switch,
  Image,
  View,
  Text,
} from 'react-native'

export default (props) => {
  const oldest   = moment().subtract(100, 'years')
  const youngest = moment().subtract(18, 'years')
  const maxDob   = `${oldest.year()}-${oldest.month()}-${oldest.date()}`
  const minDob   = `${youngest.year()}-${youngest.month()}-${youngest.date()}`

  let trash

  return(
    <ScrollView style={[style.container, {backgroundColor: mayteBlack()}]}
                scrollEnabled={props.scrollEnabled}>
      <View style={[style.header, style.padded]}>
        <TouchableOpacity onPress={props.cancelEdit}>
          <Text style={[style.headerBtn]}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.saving ? null : props.save}>
          <Text style={[style.headerBtn]}>{props.saving ? '...' : 'SAVE'}</Text>
        </TouchableOpacity>
      </View>

      {/* PHOTOS */}
      <View>
        {props.crop ? <Image style={{width: screenWidth / 2, height: screenHeight / 2}} resizeMode='cover' source={{uri: props.crop.path}} /> : null}
        <View style={[style.padded, {zIndex: 100}]}>
          <View style={[style.sectionHeader]}>
            <Text style={[style.sectionHeaderLabel]}>PHOTOS</Text>
            <Text style={[style.sectionHeaderSublabel]}>{props.photoBin.length}/10</Text>
            <View style={[style.trashBin, {opacity: props.rearrangingPhotos ? 1 : 0, /*transform: [{scale: props.trashReady ? 1 : 0.8}]*/}]}
                  ref={(el) => trash = el}
                  onLayout={(e) => {
                    trash.measure((x, y, width, height, pageX, pageY) => {
                      props.setTrashArea({pageX, pageY, width, height})
                    })
                  }}>
              <Image source={props.trashReady ?
                             require('../images/trash-open-white.png') :
                             require('../images/trash-closed-white.png') }
                     style={{width: '100%', height:'100%'}}
                     resizeMode='contain' />
            </View>
          </View>
          <CurrentPhotos photoBin={props.photoBin}
                         active={props.rearrangingPhotos}
                         trashArea={props.trashArea}
                         toggleTrashReady={props.toggleTrashReady}
                         toggleActive={props.toggleRearrangingPhotos} />
        </View>

        <View>
          <Text style={[style.photoSelectLabel, {textAlign: 'center', color: 'white'}]}>
            SELECT FROM INSTAGRAM
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              <View style={style.photoSelect}>
              {
                (props.user.availablePhotos.filter((p,i) => i%2===0) || []).map((p,i) => {
                  return (
                    <TouchableOpacity key={i} onPress={() => props.editImage(p.image)}>
                      <Image style={[style.photoSelectImg]}
                             resizeMode="cover"
                             source={{url: p.image.url}} />
                    </TouchableOpacity>
                  )
                })
              }
              </View>
              <View style={style.photoSelect}>
              {
                (props.user.availablePhotos.filter((p,i) => i%2===1) || []).map((p,i) => {
                  return (
                    <TouchableOpacity key={i} onPress={() => props.editImage(p.image)}>
                      <Image style={[style.photoSelectImg]}
                             resizeMode="cover"
                             source={{url: p.image.url}} />
                    </TouchableOpacity>
                  )
                })
              }
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={[style.photoSelectLabel, {textAlign: 'center', color: 'white'}]}>
            SELECT FROM CAMERA ROLL
          </Text>
          <TouchableOpacity onPress={props.getFromCameraRoll}>
            <View style={[style.cameraRollBtn]}>
              <Text style={{fontSize: em(1.5), color: 'white', height: em(2)}}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>


      {/* INFO */}
      <View style={[style.padded, {paddingTop: em(2)}]}>
        <View style={[style.sectionHeader]}>
          <Text style={[style.sectionHeaderLabel]}>BIO</Text>
          <Text style={[style.sectionHeaderSublabel]}>{props.bio.length}/500</Text>
        </View>
        <TextInput style={[style.bioInput]}
                   multiline={true}
                   maxLength={500}
                   defaultValue={props.bio || 'Sample bio text'}
                   onChangeText={text => props.setBio(text)}></TextInput>

        <View style={[style.sectionHeader]}>
          <Text style={[style.sectionHeaderLabel]}>BIRTHDATE</Text>
        </View>
        <DatePicker style={[style.dobInput, {borderRadius: em(0.33)}]}
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        borderRadius: em(0.33),
                      },
                      dateText: {
                        fontFamily: 'Gotham-Book',
                        fontSize: em(0.9),
                      }
                    }}
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

        <View style={[style.sectionHeader]}>
          <Text style={[style.sectionHeaderLabel]}>OCCUPATION</Text>
        </View>
        <TextInput style={style.occupationInput}
                   defaultValue={props.occupation || 'Professional'}
                   onChangeText={text => props.setOccupation(text)}/>
      </View>

      {/* OPTIONS */}
      <View style={[style.padded, {paddingTop: em(3)}]}>
      {
        Object.keys(props.options).map((o,i) => {
          return(
            <View key={i} style={[style.option]} ref={el => this[o]}>
              <Text style={style.optionLabel}>{props.options[o].label}</Text>
              <Switch value={props[o]} onValueChange={(val) => props.setPrivacyOption(o,val)}></Switch>
            </View>
          )
        })
      }
      </View>

      {
        props.cameraRollOpen ?
        <CameraRoll cameraRollOpen={props.cameraRollOpen}
                    pushToPhotoBin={props.pushToPhotoBin}
                    cameraRollEdges={props.cameraRollEdges}
                    closeCameraRoll={props.closeCameraRoll} /> :
        null
      }
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: em(1.33),
    marginBottom: em(2),
  },
  headerBtn: {
    color: 'white',
    fontSize: em(1),
    letterSpacing: em(0.1),
    fontFamily: 'Gotham-Book',
  },
  padded: {
    paddingLeft: em(1),
    paddingRight: em(1),
  },
  sectionHeader: {
    paddingBottom: em(0.66),
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionHeaderLabel: {
    color: 'white',
    fontSize: em(1.2),
    letterSpacing: em(0.1),
    fontFamily: 'Gotham-Black',
  },
  sectionHeaderSublabel: {
    color: 'white',
    fontFamily: 'Gotham-Book',
    letterSpacing: em(0.1),
    marginLeft: em(0.66),
    marginTop: em(0.33),
  },

  photoSelect: {
    flexDirection: 'row',
    paddingLeft: em(1),
    paddingRight: em(1),
  },
  photoSelectLabel: {
    fontSize: em(1),
    fontFamily: 'Gotham-Black',
    letterSpacing: em(0.1),
    paddingTop: em(2),
    paddingBottom: em(1),
  },
  photoSelectImg: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: em(0.33),
    marginBottom: em(0.33),
    marginRight: em(0.33),
  },

  cameraRollBtn: {
    width: em(3),
    height: em(3),
    borderRadius: em(1.5),
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bioInput: {
    backgroundColor: 'white',
    fontSize: em(1),
    minHeight: em(8),
    padding: em(1),
    paddingTop: em(0.8),
    paddingBottom: em(0.8),
    borderRadius: em(0.33),
    marginBottom: em(1),
    fontFamily: 'Gotham-Book',
    fontSize: em(0.9),
    letterSpacing: em(0.1),
  },

  dobInput: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: em(1),
  },

  occupationInput: {
    backgroundColor: 'white',
    borderRadius: em(0.33),
    padding: em(1),
    paddingTop: em(0.8),
    paddingBottom: em(0.8),
    textAlign: 'center',
    fontFamily: 'Gotham-Book',
    fontSize: em(0.9),
    letterSpacing: em(0.1),
  },


  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: em(1.33),
  },
  optionLabel: {
    color: 'white',
    fontSize: em(1.2),
    fontFamily: 'Gotham-Bold',
    letterSpacing: em(0.1),
  },
  optionSwitch: {},

  trashBin: {
    height: em(1.66),
    width: em(1.66),
    marginLeft: em(0.33),
  },
})
