import React, { PureComponent, Fragment } from 'react'
import { ListGroupItem, Badge } from 'reactstrap';
import { quakeShades, textColor } from '../../constants/colors'

import './quake-item.css'

class QuakeItemState extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHighlighted: false,
    }

    this.toggleHighlight = () => {
      this.setState( _ => _.isHighlighted ? null : ({ isHighlighted: !_.isHighlighted }))
    }

    props.quakeFunctions[props.id] = {
      ...props.quakeFunctions[props.id],
      toggleHighlightCard: this.toggleHighlight,
    }
  }
  
  onMouseHover = () => {
    this.props.quakeFunctions[this.props.id].toggleHighlightCard()
    this.props.quakeFunctions[this.props.id].toggleInfoWindow()
  }

  onClick = () => {
    this.props.onQuakeSelect(this.props.properties)
    this.props.quakeFunctions[this.props.id].toggleSelectCircle()
  }


  render() {
    return this.props.children({
      properties: this.props.properties,
      onClick: this.onClick,
      onMouseHover: this.onMouseHover,
      isSelected: this.state.isSelected
    })
  }
}

const QuakeItem = ({
  onClick, onMouseHover, properties
}) => {
  const [City, Country] = properties.place.split(" ").slice(-2)

  // some magnitudes can be less than 0...who knew?
  const bgColor = quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0] 
  const txtColor = textColor(bgColor)
  return (
    <ListGroupItem className="justify-content-between"
      onClick={onClick}
      onMouseOver={onMouseHover}
      onMouseOut={onMouseHover}
      >
      <Badge style={{ backgroundColor: bgColor, color: txtColor }}>
        MAG {properties.mag.toFixed(2)}
      </Badge> &nbsp;
        {City} {Country}
    </ListGroupItem>
  )
}

export { QuakeItemState, QuakeItem }