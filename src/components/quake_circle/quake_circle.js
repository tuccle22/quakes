import React, { PureComponent, Fragment } from 'react'
import { InfoWindow } from 'react-google-maps'
import Radius from '../../atoms/radius/radius'
import { quakeShades } from '../../constants/colors'

class QuakeCircleState extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isInfoWindowShown: false,
      isSelected: false
    }
    this.toggleInfoWindow = () => {
      this.setState( _ => _.isSelected && _.isInfoWindowShown ? null : ({isInfoWindowShown: !_.isInfoWindowShown}))
    }
    this.toggleSelect = () => {
      const { center: { lat, lng }, radius } = props
      this.setState( _ => {
        if (_.isSelected) {
          props.goToLastBounds();
        } else {
          props.changeCenter({ lat, lng }, radius)
        }
        return ({isSelected: !_.isSelected})
      });
    }

    props.quakeFunctions[props.id] = {
      ...props.quakeFunctions[props.id],
      toggleInfoWindow: this.toggleInfoWindow,
      toggleSelectCircle: this.toggleSelect
    }
  }

  onHover = () => {
    this.props.quakeFunctions[this.props.id].toggleHighlightCard()
    this.props.quakeFunctions[this.props.id].toggleInfoWindow()
  }

  onClick = () => {
    this.props.onQuakeSelect(this.props.properties)
    this.props.quakeFunctions[this.props.id].toggleSelectCircle()
  }

  render() {
    const { quakeFunctions, changeCenter, ...rest } = this.props
    return this.props.children({
      ...this.state, ...rest,
      onHover: this.onHover,
      onClick: this.onClick
    })
  }
}

const QuakeCircle = ({
  children,
  center,
  radius,
  properties,
  onClick,
  onHover,
  isInfoWindowShown,
  onQuakeSelect: deSelect
}) => {
  const { lat, lng } = center
  return (
    <Fragment>
      <Radius
        center={{ lat, lng }}
        radius={radius}
        color={quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0]}
        onClick={onClick}
        onMouseOver={onHover}
        onMouseOut={onHover}
      />
      { isInfoWindowShown && children }
    </Fragment>
  )
}

export { QuakeCircleState, QuakeCircle }