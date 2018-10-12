import React, { PureComponent } from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'

import './quake-details.css'

class QuakeDetails extends PureComponent {
  onClose = () => this.props.onClose()
  render() {
    const { selectedQuake, onClick } = this.props
    return selectedQuake ? (
      <Container fluid className='details'>
        <Row>
          <Col md={12}>
            <Card onClick={onClick}>
              <CardBody>
                <pre>
                  {JSON.stringify(selectedQuake, null, 2)}
                </pre>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    ) : null
  }
}

export { QuakeDetails }