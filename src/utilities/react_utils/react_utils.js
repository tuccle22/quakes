import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * This React component raises up mapped functions
 * to coordinate mapped components state changes
 * across different branches of the virtual dom without
 * rendering all mapped components
 */
class StoreFunctionsById extends Component {
  constructor(props) {
    super(props)
    const { id, stateName, funcName, func, initialState, functions } = props
    this.state = {
      [stateName]: initialState
    }

    this[funcName] = () => {
      this.setState( prevState => ({[stateName]: func(prevState[stateName])}))
    }

    functions[id] = {
      ...functions[id],
      [funcName]: this[funcName]
    }
  }

  render() {
    const { children, id, funcName, functions } = this.props
    return (
      children({
        ...this.state,
        [funcName]: functions[id][funcName]
      })
    )
  }
}

StoreFunctionsById.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stateName: PropTypes.string,
  funcName: PropTypes.string,
  functions: PropTypes.object,
  initialState: PropTypes.any,
  func: PropTypes.func
}

function toggleBoolean(bool) { return !bool }

export { StoreFunctionsById, toggleBoolean }