import React, { Component } from 'react'
import ProfileView from '../components/ProfileView'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class SettingsProfile extends Component {
  render() {
    const { props, state } = this
    return(
      <View style={style.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={props.viewPreferences}>
            <Text>Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.viewPreferences}>
            <Text>Editor</Text>
          </TouchableOpacity>
        </View>
        <ProfileView {...props}
                     setHeight={(h) => this.setState({viewHeight: h})}
                     hideButtons={true} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: mayteBlack(),
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
})
