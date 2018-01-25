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
    ]).start(() => {
      if (this.props.onDecay) {
        this.props.onDecay(this)
      }
    })
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

    this.generateWork = this.generateWork.bind(this)
    this.killWork = this.killWork.bind(this)

    this.state = {
      works: []
    }
  }

  componentDidMount() {
    return this.props.active ? this.generateWork() : null
  }

  generateWork() {
    const {props} = this
    const fdd = 1 - props.fireworkDiameterDeviation
    const sdd = 1 - props.sparkDiameterDeviation
    const id = Date.now()
    const workProps = {
      key: id, id: id, // We don't get access to key :(
      delay: props.workDelay + Math.random() * -(props.workDelayOffset) + props.workDelayOffset,
      style: {
        left: props.origin.left + Math.random() * -(props.radius*2) + props.radius,
        top: props.origin.top + Math.random() * -(props.radius*2) + props.radius,
      },
      color: props.colors[Math.round(Math.random() * props.colors.length)],
      fireworkDiameter: Math.random() * (props.maxFireworkDiameter * fdd) + (props.maxFireworkDiameter * props.fireworkDiameterDeviation),
      sparkDiameter: Math.random() * (props.maxSparkDiameter * sdd) + (props.maxSparkDiameter * props.sparkDiameterDeviation),
      numSparks: props.maxNumSparks / (Math.random() > 0.5 ? 2 : 1),
      onDecay: this.killWork,
    }

    const work = <Firework {...workProps} />

    setTimeout(() => {
      this.setState({works: [...this.state.works, work]})
      return this.props.active ? this.generateWork() : null
    }, workProps.delay)
  }

  killWork(work) {
    this.state.works = this.state.works.filter(w => w.props.id != work.props.id)
  }

  render() {
    const {props, state} = this

    return (state.works)
  }
}

FireworkShow.defaultProps = {
  origin: {left: 0, top: 0},
  workDelay: 800,
  workDelayOffset: 200,
  fireworkDiameterDeviation: 0.4,
  sparkDiameterDeviation: 0.4,
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
