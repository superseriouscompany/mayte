import React, {Component} from 'react'
import {connect}          from 'react-redux'
import QuizView           from '../components/QuizView'
import api                from '../services/api'

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
    this.submit = this.submit.bind(this)
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
             update={(k) => this.setState(Object.assign({}, this.state, k))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
