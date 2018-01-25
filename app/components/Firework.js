'use strict'

import React, {Component} from 'react'
import {
  View,
  Animated,
} from 'react-native'

// http://www.coderslexicon.com/code/59/
function findPointOnCircle(originX, originY, radius, angleRadians) {
  var newX = radius * Math.cos(angleRadians) + originX
  var newY = radius * Math.sin(angleRadians) + originY
  return {"x" : newX, "y" : newY}
}

export default class Firework extends Component {
  constructor(props) {
    super(props)
    this.reset()

    const {fireworkDiameter: fd, sparkDiameter: sd} = props
    this.fs = {
      width: fd,
      height: fd,
      position: 'absolute',
    }
    this.ss = {

    }

    this.state = {}

    this.renderSparks = this.renderSparks.bind(this)
    this.reset = this.reset.bind(this)
    this.splode = this.splode.bind(this)
  }

  reset() {
    this._explode = new Animated.Value(0)
    this._driftY  = new Animated.Value(0)
    this._opacity = new Animated.Value(1)
  }

  splode() {
    Animated.sequence([
      Animated.timing(this._explode, {
        delay: this.props.delay || 0,
        toValue: 1,
        duration: this.props.explodeTime,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(this._driftY, {
          toValue: this.props.decayY,
          duration: this.props.decayTime,
          useNativeDriver: true,
        }),
        Animated.timing(this._opacity, {
          toValue: 0,
          duration: this.props.decayTime,
          useNativeDriver: true,
        })
      ])
    ]).start(() => this.setState({dead: true}))

    if (this.props.trigger) {
      setTimeout(this.props.trigger, this.props.delay)
    }
  }

  componentDidMount() {
    if (this.props.hold) {return}
    this.splode()
  }

  renderSparks(numSparks) {
    const {fireworkDiameter: fd, sparkDiameter: sd, color} = this.props
    var sparks = []
    for (let i = 0; i < numSparks; i++) {
      let degrees = 360 / numSparks * i
      let coords = findPointOnCircle(fd/2, fd/2, fd/2, degrees * Math.PI / 180)
      sparks.push(
        <View key={i} style={[
          {
            backgroundColor: color,
            width: sd,
            height: sd,
            transform: [{scale: i%2==0 ? 1 : 0.66}, {rotate: '45deg'}],
            borderRadius: i%2==0 ? sd/2 : 0,
            position: 'absolute',
            top:coords.y-sd/2, right: coords.x-sd/2,
          },
        ]} />
      )
    }
    return sparks
  }

  render() {
    const {props,state} = this

    return(
      <Animated.View style={[this.fs, props.style, {opacity:this._opacity, transform: [{scale:this._explode}, {translateY:this._driftY}]}]}>
        {this.renderSparks(props.numSparks)}
      </Animated.View>
    )
  }
}

export class FireworkShow extends Component {
  constructor(props) {
    super(props)

    this.loop = this.loop.bind(this)
    this.mapWorks = this.mapWorks.bind(this)

    this.state = {
      works: this.mapWorks()
    }
  }

  mapWorks() {
    const md = this.props.maxFireworkDiameter
    return React.Children.map(this.props.children, (c,i) => {
      return React.cloneElement(c, {
        key: Date.now(),
        fireworkDiameter: this.props.maxFireworkDiameter,
        trigger: i == React.Children.count(this.props.children) - 1 ? () => setTimeout(this.loop, this.props.loopDelay) : null
      })
    })
  }

  loop() {
    const works = this.mapWorks()
    this.setState({works: [...this.state.works, ...works]})
  }

  render() {
    const {props, state} = this

    return (state.works)
  }
}

Firework.defaultProps = {
  color: 'gold',
  fireworkDiameter: 150,
  sparkDiameter: 15,
  decayTime: 8000,
  explodeTime: 100,
  decayY: 100,
  numSparks: 8,
}
