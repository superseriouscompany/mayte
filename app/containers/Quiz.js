import React, {Component} from 'react'
import {connect}          from 'react-redux'
import QuizView           from '../components/QuizView'
import moment             from 'moment'
import request            from '../actions/request'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email:    props.quiz.email,
      dob:      props.quiz.dob,
      photos:   props.quiz.photos || [null, null, null],
      website:  props.quiz.website,
      freeform: props.quiz.freeform,
      step:     props.quiz.step,
    }
    this.submit    = this.submit.bind(this)
    this.updateDob = this.updateDob.bind(this)
  }

  componentDidMount() {
    if (!this.props.step) {
      this.setState({step: 'email'})
    }

    this.setState({zodiac: computeZodiac(this.props.dob)})
  }

  componentWillReceiveProps(props) {
    if( props.prefilledCode && !this.props.prefilledCode ) {
      this.setState({vipCode: props.prefilledCode})
    }
  }

  updateDob(dob) {
    this.setState({zodiac: computeZodiac(dob)})
    this.setState({dob})
  }

  componentDidUpdate(prevProps, prevState) {
    var {submitting, ...ts} = this.state
    if (prevState != this.state) {
      this.props.setQuiz(ts)
    }
  }

  submit() {
    return this.props.sendQuiz(this.props.quiz).then(() => {
      this.props.updateSelf()
    })
  }

  render() {
    const props = {...this.props.quiz, ...this.props}

    return <QuizView {...props}
             zodiac={this.state.zodiac}
             vipCode={this.state.vipCode}
             update={(k) => this.setState(k)}
             updateDob={this.updateDob}
             submit={this.submit}
             readyForSubmit={
               this.props.quiz.email &&
               this.props.quiz.dob &&
               this.props.quiz.photos.filter(i => i).length &&
               this.props.quiz.website &&
               this.props.quiz.freeform
             } />
  }
}

const mapStateToProps = (state, ownProps) => {
  const apiCall = state.api['POST /applications'] || {}
  // TODO: provide some sort of wildcard interface?
  const redeemKey = Object.keys(state.api).find((k) => k.match(/PUT \/vipCodes\/.+/))
  const redeemCall = state.api[redeemKey] || {}

  console.log('code is', state.vip.pendingCode)

  return {
    user:        state.user,
    quiz:        state.quiz,
    submitting:  !!apiCall.loading,
    error:       apiCall.error,
    redeeming:   !!redeemCall.loading,
    pendingCode: state.vip.pendingCode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setQuiz: (quiz) => dispatch({type: 'quiz:set', quiz}),
    sendQuiz: (quiz) => {
      return dispatch(request({
        method: 'POST',
        url:    '/applications',
        body:   quiz
      }))
    },
    updateSelf: () => {
      return dispatch(request({
        url: '/users/me'
      })).then((user) => {
        dispatch({type: 'user:set', user})
      })
    },
    redeemVipCode: (code) => {
      return dispatch(request({
        method: 'PUT',
        url:    `/vipCodes/${code}`,
      }))
    }
  }
}

function computeZodiac(date) {
  const mom   = moment(date, 'MMM Do YYYY')
  const month = mom.month()
  const day   = mom.day()
  switch (month) {
    case 0:  return day < 20 ? 'capricorn' : 'aquarius'
    case 1:  return day < 19 ? 'aquarius' : 'pisces'
    case 2:  return day < 21 ? 'pisces' : 'aries'
    case 3:  return day < 20 ? 'aries' : 'taurus'
    case 4:  return day < 21 ? 'taurus' : 'gemini'
    case 5:  return day < 21 ? 'gemini' : 'cancer'
    case 6:  return day < 23 ? 'cancer' : 'leo'
    case 7:  return day < 23 ? 'leo' : 'virgo'
    case 8:  return day < 23 ? 'virgo' : 'libra'
    case 9:  return day < 23 ? 'libra' : 'scorpio'
    case 10: return day < 22 ? 'scorpio' : 'sagittarius'
    case 11: return day < 22 ? 'sagittarius' : 'capricorn'
    default: return null;
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
