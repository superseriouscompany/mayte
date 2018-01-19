import React, {Component} from 'react'
import {connect}          from 'react-redux'
import QuizView           from '../components/QuizView'
import api                from '../services/api'
import moment             from 'moment'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.quiz.email,
      dob: props.quiz.dob,
      photos: props.quiz.photos || [null, null, null],
      website: props.quiz.website,
      freeform: props.quiz.freeform,
      step: props.quiz.step,
      submitting: false,
    }
    this.submit    = this.submit.bind(this)
    this.updateDob = this.updateDob.bind(this)
  }

  componentDidMount() {
    if (!this.props.step) {
      this.setState({step: 'dob'})
    }

    this.setState({zodiac: computeZodiac(this.props.dob)})
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
    // api call...
    this.setState({submitting: true})
  }

  render() {
    return <QuizView {...this.props.quiz} user={this.props.user}
             zodiac={this.state.zodiac}
             update={(k) => this.setState(k)}
             updateDob={this.updateDob}
             submit={this.submit}
             submitting={this.state.submitting}
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
  return {
    user: state.user,
    quiz: state.quiz,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setQuiz: (k) => dispatch({type: 'quiz:set', quiz: k}),
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
