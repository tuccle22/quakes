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
  
  onMouseOut = () => {
    const { onQuakeHover, quakeFunctions, id } = this.props
    quakeFunctions[id].toggleHighlightCard()
    onQuakeHover()
  }

  onMouseOver = () => {
    const { onQuakeHover, quakeFunctions, id, center, properties } = this.props
    quakeFunctions[id].toggleHighlightCard()
    onQuakeHover({ id, properties, center })
  }

  onClick = () => {
    const { onQuakeSelect, id, center, properties } = this.props
    onQuakeSelect({ id, properties, center })
  }

  render() {
    return this.props.children({
      properties: this.props.properties,
      onClick: this.onClick,
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
    })
  }
}

const QuakeItem = ({
  properties, ...rest
}) => {
  const [City, Country] = properties.place.split(" ").slice(-2)

  // some magnitudes can be less than 0...who knew?
  const bgColor = quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0] 
  const txtColor = textColor(bgColor)
  return (
    <ListGroupItem {...rest} className="justify-content-between">
      <Badge style={{ backgroundColor: bgColor, color: txtColor }}>
        MAG {properties.mag.toFixed(2)}
      </Badge> &nbsp;
        {City} {Country}
    </ListGroupItem>
  )
}

export { QuakeItemState, QuakeItem }