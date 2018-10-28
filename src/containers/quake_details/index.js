import React, { PureComponent } from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'

import './quake-details.css'
import { stringify } from 'querystring';

const QuakeDetails = ({properties, center, id, onClick}) => (
  <Container fluid className='details'>
    <Row>
      <Col md={12}>
        <Card onClick={onClick}>
          <CardBody>
            <pre>
              {JSON.stringify(properties, null, 2)}
            </pre>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
)

export { QuakeDetails }