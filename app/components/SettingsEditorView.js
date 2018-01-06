import React, { Component }      from 'react'
import moment                    from 'moment'
import DatePicker                from 'react-native-datepicker'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { mayteBlack }            from '../constants/colors'
import SettingsEditorPhotos      from '../containers/SettingsEditorPhotos'
import OrbitLoader               from './OrbitLoader'
import {StaticNight, Star} from './Environment'
import {
  em,
  statusBarHeight,
  bottomBoost,
  tabNavHeight,
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

const orbitLoaderRadius = em(0.8)

export default (props) => {
  const oldest   = moment().subtract(100, 'years')
  const youngest = moment().subtract(18, 'years')

  return(
    <View style={style.container}>
      <StaticNight style={style.bg}>
        <Star style={{top: em(3.33), right: em(2)}} twinkleDelay={2000} />
        <Star style={{top: em(10.2), left: em(10)}} twinkleDelay={2800} />
        <Star style={{top: em(20), left: em(15)}} twinkleDelay={3300} />
        <Star style={{top: em(15), left: em(20)}} twinkleDelay={4500} />
        <Star style={{top: em(26.33), left: em(4)}} twinkleDelay={5300} />
        <Star style={{bottom: em(2), left: em(15)}} twinkleDelay={1400} />
        <Star style={{bottom: em(15.2), left: em(20)}} twinkleDelay={4200} />
        <Star style={{bottom: em(23), left: em(2)}} twinkleDelay={6900} />
      </StaticNight>

      <KeyboardAwareScrollView style={[style.container]}
                  scrollEnabled={props.scrollEnabled}>
        <View style={[style.header, style.padded]}>
          <TouchableOpacity onPress={props.cancelEdit}>
            <Text style={[style.text, style.headerBtn]}>CANCEL</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={props.saving ? null : props.save}>
            <Text style={[style.text, style.headerBtn, {opacity: props.saving ? 0 : 1}]}>SAVE</Text>
            { props.saving ?
              <View style={{position: 'absolute', right: orbitLoaderRadius/2, top: -(orbitLoaderRadius/2)}}>
                <OrbitLoader color='white' radius={orbitLoaderRadius} orbRadius={orbitLoaderRadius/4} />
              </View> : null }
          </TouchableOpacity>
        </View>

        {/* PHOTOS */}
        <SettingsEditorPhotos {...props} />


        {/* INFO */}
        <View style={[style.padded, {paddingTop: em(2)}]}>
          <View style={[style.sectionHeader]}>
            <Text style={[style.text, style.sectionHeaderLabel]}>BIO</Text>
            <Text style={[style.text, style.sectionHeaderSublabel]}>{(props.bio || '').length}/500</Text>
          </View>
          <TextInput style={[style.bioInput]}
                     multiline={true}
                     maxLength={500}
                     placeholder='Bio'
                     defaultValue={props.bio}
                     onChangeText={text => props.setBio(text)}></TextInput>

          <View style={[style.sectionHeader]}>
            <Text style={[style.text, style.sectionHeaderLabel]}>BIRTHDATE</Text>
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
                      minDate={oldest.format('MMM Do YYYY')}
                      maxDate={youngest.format('MMM Do YYYY')}
                      showIcon={false}
                      confirmBtnText="Confirm"
                      cancelBtnText="Copeancel"
                      onDateChange={date => props.setDob(date)} />

          <View style={[style.sectionHeader]}>
            <Text style={[style.text, style.sectionHeaderLabel]}>OCCUPATION</Text>
          </View>
          <TextInput style={style.occupationInput}
                     defaultValue={props.occupation}
                     placeholder={'Professional'}
                     onChangeText={text => props.setOccupation(text)}/>
        </View>

        {/* OPTIONS */}
        <View style={[style.padded, {paddingTop: em(3), paddingBottom: em(3)}]}>
        {
          Object.keys(props.options).map((o,i,a) => {
            return(
              <View key={i} style={[style.option, (i == a.length - 1 ? {marginBottom: 0} : {})]} ref={el => this[o]}>
                <Text style={[style.text, style.optionLabel]}>{props.options[o].label}</Text>
                <Switch value={props[o]} onValueChange={(val) => props.setPrivacyOption(o,val)}></Switch>
              </View>
            )
          })
        }
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight - tabNavHeight - bottomBoost,
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
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
    fontSize: em(1.1),
    letterSpacing: em(0.1),
    fontFamily: 'Futura',
    fontWeight: '700',

  },
  sectionHeaderSublabel: {
    fontFamily: 'Gotham-Book',
    fontSize: em(0.8),
    letterSpacing: em(0.1),
    marginLeft: em(0.4),
    marginTop: em(0.3),
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
    marginBottom: em(1.33),
    fontFamily: 'Gotham-Book',
    fontSize: em(0.9),
    letterSpacing: em(0.1),
  },

  dobInput: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: em(1.5),
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
    fontSize: em(1),
    fontFamily: 'Futura',
    letterSpacing: em(0.1),
  },
  optionSwitch: {},
})
