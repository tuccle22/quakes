import React, { PureComponent, Fragment } from 'react'
import { InfoWindow } from 'react-google-maps'
import Radius from '../../atoms/radius/radius'
import { quakeShades } from '../../constants/colors'

class QuakeCircleState extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isInfoWindowShown: false,
    }
    this.toggleInfoWindow = () => {
      this.setState( _ => {
        if (_.isInfoWindowShown) {
          return ({isInfoWindowShown: false})
        } else {
          return ({isInfoWindowShown: true})
        }
      })
    }

    props.quakeFunctions[props.id] = {
      ...props.quakeFunctions[props.id],
      toggleInfoWindow: this.toggleInfoWindow
    }
  }

  onMouseOut = () => {
    const { onQuakeHover, quakeFunctions, id } = this.props
    quakeFunctions[id].toggleHighlightCard()
    onQuakeHover()
  }

  onMouseOver = () => {
    const { onQuakeHover, quakeFunctions, id, center, properties } = this.props
    quakeFunctions[id].toggleHighlightCard()
    onQuakeHover({ id, center, properties })
  }

  onClick = () => {
    const { onQuakeSelect, id, center, properties } = this.props
    onQuakeSelect({ id, center, properties })
  }

  render() {
    const { children, quakeFunctions, changeCenter, ...rest } = this.props
    return children({
      ...this.state, ...rest,
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      onClick: this.onClick
    })
  }
}

const QuakeCircle = ({
  children,
  properties,
  isInfoWindowShown,
  ...rest
}) => { 
  const color = quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0]
  return (
    <Radius {...rest} color={color} />
)}

export { QuakeCircleState, QuakeCircle }