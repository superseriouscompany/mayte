'use strict'

import React, {Component} from 'react'
import Scratch            from '../containers/Scratch'
import Login              from '../containers/Login'
import Gamepad            from '../containers/Gamepad'
import {
  Text,
  View,
} from 'react-native'

const useScratch = false

export default function(props) {
  return useScratch ?
    <Scratch />
  : !props.session ?
    <Login />
  :
    <Gamepad />
}
