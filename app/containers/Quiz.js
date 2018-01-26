import React, {Component} from 'react'
import {connect}          from 'react-redux'
import QuizView           from '../components/QuizView'
import moment             from 'moment'
import request            from '../actions/request'
import api                from '../services/api'
import logout             from '../actions/logout'
import {
  Alert
} from 'react-native'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state         = {}
    this.submit        = this.submit.bind(this)
    this.verifyVipCode = this.verifyVipCode.bind(this)
    this.selectPhoto   = this.selectPhoto.bind(this)
    this.toggleTerms   = this.toggleTerms.bind(this)
  }

  componentDidMount() {
    this.setState({zodiac: computeZodiac(this.props.quiz.dob)})
    if( this.props.pendingCode ) {
      this.props.setQuiz({vipCode: this.props.pendingCode})
    }
  }

  componentWillReceiveProps(props) {
    if( props.pendingCode != this.props.pendingCode ) {
      this.props.setQuiz({vipCode: props.pendingCode})
    }

    if( props.quiz.dob != this.props.quiz.dob ) {
      this.setState({zodiac: computeZodiac(props.quiz.dob)})
    }

    if( props.quiz.website === null && props.user.instagramHandle ) {
      this.props.setQuiz({website: `https://instagram.com/${props.user.instagramHandle}`})
    }
  }

  submit() {
    if( !!this.props.photos.find(p => p && p.local) ) {
      this.setState({photosLoading: true})
      return setTimeout(this.submit, 250)
    }
    this.setState({photosLoading: false})
    if( !this.props.photos.filter(p => p).length ) {
      return Alert.alert(
        'Photos failed to upload',
        null,
        [
          { text: 'Edit Photos', onPress: () => this.props.setQuiz({step: 'photos'}) }
        ],
        { cancelable: false }
      )
    }

    this.setState({submitting: true})
    return this.props.sendQuiz(this.props.quiz).then(() => {
      return this.props.updateSelf()
    }).catch((err) => {
      this.setState({submitting: false})
      alert(err.message || JSON.stringify(err))
    })
  }

  verifyVipCode() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var r = {code: this.state.vip, referral: testRef}
        if (this.state.vip == 'error') {
          reject({error: 'Code invalid.'})
        }
        resolve(r)
      }, 2000)
    })
  }

  selectPhoto(idx, localPath) {
    this.props.setPhoto(idx, localPath)
    return this.props.uploadPhoto(
      localPath,
      `${this.props.user.id}_${Date.now()}.jpg`
    ).then(payload => {
      if (!payload || !payload.url) {
        return this.props.destroyPhoto(localPath)
      }
      return this.props.updatePhoto(localPath, payload.url)
    }).catch(err => {
      this.props.destroyPhoto(localPath)
      alert(err.message || JSON.stringify(err))
      return log(err)
    })
  }

  toggleTerms() {
    this.setState({terms: !this.state.terms})
  }

  render() {
    const props = {...this.props.quiz, ...this.props}

    return <QuizView {...props}
             zodiac={this.state.zodiac}
             photosLoading={this.state.photosLoading}
             update={this.props.setQuiz}
             submit={this.submit}
             selectPhoto={this.selectPhoto}
             toggleTerms={this.toggleTerms}
             terms={this.state.terms}
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
  const apiCall = state.api['POST /applications'] || {}
  // TODO: provide some sort of wildcard interface?
  const redeemKey = Object.keys(state.api).find((k) => k.match(/PUT \/vipCodes\/.+/))
  const redeemCall = state.api[redeemKey] || {}

  return {
    user:        state.user,
    quiz:        state.quiz,
    error:       apiCall.error,
    redeeming:   !!redeemCall.loading,
    pendingCode: state.vip.pendingCode,
    photos:      state.quiz.photos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setQuiz: (quiz) => {
      return dispatch({type: 'quiz:set', quiz})
    },
    setPhoto: (idx, url) => {
      return dispatch({type: 'quiz:setPhoto', idx, url})
    },
    destroyPhoto: (url) => {
      return dispatch({type: 'quiz:destroyPhoto', url})
    },
    updatePhoto: (fromUrl, toUrl) => {
      return dispatch({type: 'quiz:updatePhoto', fromUrl, toUrl})
    },
    sendQuiz: (quiz) => {
      return dispatch(request({
        method: 'POST',
        url:    '/applications',
        body:   quiz
      }))
    },
    resetQuiz: () => {
      return dispatch(logout())
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
    },
    uploadPhoto: (filePath, fileName) => {
      return dispatch(request({
        url:       '/images',
        upload:    true,
        fieldName: 'image_file',
        fileType:  'image/jpeg',
        fileName,
        filePath,
      }))
    },
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
