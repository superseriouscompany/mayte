import React, { Component } from 'react'
import RangeSliderView from '../components/RangeSliderView.js'

class RangeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minValue: props.minValue,
      maxValue: props.maxValue,
    }
  }

  render() {
    const { props, state } = this
    return(
      <RangeSliderView {...props} {...state} />
    )
  }
}

RangeSlider.defaultProps = {
  onUpdate: (vals) => null,
  minValue: 0,
  maxValue: 0,
  numMarkers: 2,
  trackHeight: 3,
  markerDiameter: 60,
  trackColor: '#000',
  markerFill: '#000',
  markerStroke: '#000',
  markerStrokeWidth: 0,
}

export default RangeSlider
