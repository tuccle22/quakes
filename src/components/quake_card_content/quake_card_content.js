import React, { PureComponent, Fragment } from 'react'
import { ListGroupItem, Collapse } from 'reactstrap'

class QuakeCardContent extends PureComponent {
  toggleCollapse = () => {
    this.setState( _ => ({collapse: !_.collapse}))
  }
  render() {
    return (
      <Fragment>
        <ListGroupItem
          onMouseOver={this.toggleCollapse}
          onMouseOut={this.toggleCollapse}
        >
          {quake.properties.place}
        </ListGroupItem>
        <Collapse isOpen={this.state.collapse}>
          {this.props.children}
        </Collapse>
      </Fragment>
    )
  }
}
