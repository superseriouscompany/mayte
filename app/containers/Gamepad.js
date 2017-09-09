'use strict'

import React, {Component} from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

const {width, height} = Dimensions.get('window')

export default class Gamepad extends Component {
  constructor(props) {
    super(props)
    this.yup = this.yup.bind(this)
    this.nope = this.nope.bind(this)
    this.state = {
      loading: true,
      index: 0,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/recs', {
      headers: {'X-Access-Token': this.props.user.accessToken}
    }).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        recs: json.recs,
        loading: false,
      })
    }).catch((err) => {
      console.warn(err)
      this.setState({error: err.message, loading: false})
    })
  }

  yup() {
    alert('It\'s a match!')
    this.setState({index: this.state.index + 1})
  }

  nope() {
    this.setState({index: this.state.index + 1})
  }

  render() {
    const {props} = this
    return (
      <View style={style.container}>
        { this.state.loading ?
          <View style={style.centered}>
            <ActivityIndicator />
          </View>
        : this.state.error ?
          <View style={style.centered}>
            <Text>{this.state.error}</Text>
          </View>
        : this.state.index >= this.state.recs.length ?
          <View style={style.centered}>
            <Text>No mas.</Text>
          </View>
        :
          <View style={style.container}>
            <Text style={{padding: 20}}>{this.state.index}</Text>
            <View style={style.tray}>
              <TouchableOpacity onPress={this.nope}>
                <Text style={style.button}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.yup}>
                <Text style={style.button}>Yes</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={[style.container]}>
              <Image style={style.image} resizeMode="cover" source={{url: this.state.recs[this.state.index].imageUrl}} />
            </ScrollView>
          </View>
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  tray: {
    backgroundColor: 'hotpink',
    position: 'absolute',
    top: height - 50,
    height: 50,
    zIndex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    color: 'white',
  },

  image: {
    height: height,
    width: width,
  },

  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  }
})
