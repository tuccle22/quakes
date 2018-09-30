import React, { PureComponent, Fragment } from 'react'
import { InfoWindow } from 'react-google-maps'
import Radius from '../../atoms/radius/radius'
import { QuakeCard } from '../../containers/quake_card/quake_card'
import { quakeShades } from '../../constants/colors'
import { getPercievedRadius } from '../../utilities/map_utils'

class QuakeCircle extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isInfoWindowShown: false,
      isExpandedInfoWindowShown: false
    }
    this.toggleInfoWindow = () => {
      this.setState( _ => _.isExpandedInfoWindowShown && _.isInfoWindowShown ? null : ({isInfoWindowShown: !_.isInfoWindowShown}))
    }
    this.toggleSelect = () => {
      const [ lng, lat ] = props.geometry.coordinates
      console.log(lat, lng)
      props.changeCenter({lat, lng}, props.properties.mag)
      this.setState(_ => ({isExpandedInfoWindowShown: !_.isExpandedInfoWindowShown}))
    }
    props.quakeFunctions[props.id] = {
      ...props.quakeFunctions[props.id],
      toggleInfoWindow: this.toggleInfoWindow,
      toggleSelectCircle: this.toggleSelect
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
    const { id, geometry, properties } = this.props
    const { isInfoWindowShown, isExpandedInfoWindowShown } = this.state
    const [ lng, lat ] = geometry.coordinates

    return (
      <Fragment>
        <Radius
          center={{lat: lat, lng: lng}}
          radius={getPercievedRadius(properties.mag)}
          color={quakeShades[Math.round(properties.mag)]}
          onClick={this.onClick}
          onMouseOver={this.onMouseHover}
          onMouseOut={this.onMouseHover}
        />
        { isInfoWindowShown &&
          <InfoWindow position={{lat, lng}}>
            <QuakeCard properties={properties}
            />
          </InfoWindow>
        }
      </Fragment>
    )
  }
}
export default QuakeCircle
