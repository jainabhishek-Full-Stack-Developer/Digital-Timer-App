import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isButtonsDisabled = timerElapsedInSeconds > 0

    return (
      <div className="timerLimitControllerContainer">
        <p className="limitLabel">Set Timer limit</p>
        <div className="timerLimitController">
          <button
            className="limitControllerButton"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limitLabelAndValueContainer">
            <p className="limitValue">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limitControllerButton"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onRestTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimerElapsedInSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state

    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timerControllerContainer">
        <button
          className="timerControllerBtn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="timerControllerIcon"
          />
          <p className="timerControllerLabel">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timerControllerBtn"
          onClick={this.onRestTimer}
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timerControllerIcon"
          />
          <p className="timerControllerLabel">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimerFormat = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timerElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <>
        <div className="appContainer">
          <h1 className="heading">Digital Timer</h1>
          <div className="digitalTimerContainer">
            <div className="timerDisplayContainer">
              <div className="elapsedTimeContainer">
                <h1 className="elapsedTime">
                  {this.getElapsedSecondsInTimerFormat()}
                </h1>
                <p className="timerState">{labelText}</p>
              </div>
            </div>
            <div className="controlsContainer">
              {this.renderTimerController()}
              {this.renderTimerLimitController()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DigitalTimer
