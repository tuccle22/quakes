import React, { PureComponent, Fragment } from 'react'
import { ListGroupItem, Badge, Collapse, CardBody, Card } from 'reactstrap';
import { quakeShades, textColor } from '../../constants/colors'

import './quake_card.css'

class QuakeCardState extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHighlighted: false,
      isSelected: false
    }

    this.toggleHighlight = () => {
      this.setState( _ => _.isSelected && _.isHighlighted ? null : ({ isHighlighted: !_.isHighlighted }))
    }
    this.toggleSelect = () => {
      this.setState( _ => ({ isSelected: !_.isSelected }))
    }

    props.quakeFunctions[props.id] = {
      ...props.quakeFunctions[props.id],
      toggleHighlightCard: this.toggleHighlight,
      toggleSelectCard: this.toggleSelect
    }
  }
  
  onMouseHover = () => {
    this.props.quakeFunctions[this.props.id].toggleHighlightCard()
    this.props.quakeFunctions[this.props.id].toggleInfoWindow()
  }

  onClick = () => {
    this.props.quakeFunctions[this.props.id].toggleSelectCard()
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

const QuakeCard = ({
  onClick, onMouseHover, isSelected, properties
}) => {
  const [City, Country] = properties.place.split(" ").slice(-2)

  const bgColor = quakeShades[Math.round(properties.mag)]
  const txtColor = textColor(bgColor)
  return (
    <Fragment>
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
      <Collapse isOpen={isSelected}>
        <Card>
          <CardBody>
            <pre>
              {JSON.stringify(properties, null, 2)}
            </pre>
          </CardBody>
        </Card>
      </Collapse>
    </Fragment>
  )
}

export { QuakeCardState, QuakeCard }