import React, {Component} from 'react'
import {connect}          from 'react-redux'
import QuizView           from '../components/QuizView'
import moment             from 'moment'
import request            from '../actions/request'

class Quiz extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      email:    null,
      dob:      null,
      photos:   [null, null, null],
      website:  null,
      freeform: null,
      step:     'intro',
    }

    var website = props.quiz.website
    if (props.user.instagramHandle && !website) {
      website = `https://instagram.com/${props.user.instagramHandle}`
    }

    this.state = {
      email:    props.quiz.email,
      dob:      props.quiz.dob,
      photos:   props.quiz.photos || [null, null, null],
      website:  website,
      freeform: props.quiz.freeform,
      step:     props.quiz.step || 'intro',
    }

    this.submit    = this.submit.bind(this)
    this.reset     = this.reset.bind(this)
    this.updateDob = this.updateDob.bind(this)
  }

  componentDidMount() {
    this.setState({zodiac: computeZodiac(this.state.dob)})
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

  reset() {
    this.setState(this.initialState)
    this.props.resetQuiz()
  }

  render() {
    const props = {...this.props.quiz, ...this.props}

    return <QuizView {...props}
             zodiac={this.state.zodiac}
             update={(k) => this.setState(k)}
             reset={this.reset}
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

  return {
    user:       state.user,
    quiz:       state.quiz,
    submitting: !!apiCall.loading,
    error:      apiCall.error,
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
    resetQuiz: () => {
      return dispatch({type: 'quiz:destroy'})
    },
    updateSelf: () => {
      return dispatch(request({
        url: '/users/me'
      })).then((user) => {
        dispatch({type: 'user:set', user})
      })
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
