import React from 'react'
import { Grid, Container, Row, Col, Form, Button } from 'rsuite'
import HTMLReactParser from 'html-react-parser'

const Contact = () => {
  return (
    <div>
      <div className='x'>
        {
          HTMLReactParser(`<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1647.850082508035!2d106.7512130436423!3d10.790614245466534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3175275c74a30675%3A0xb7f9d62628a8e372!2zQ2h1bmcgQ8awIENlbnRhbmEgVGjhu6cgVGhpw6ptLCAzNiDEkC4gTWFpIENow60gVGjhu40sIEFuIFBow7osIFF14bqtbiAyLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmggNzAwMDAsIFZp4buHdCBOYW0!3m2!1d10.790609199999999!2d106.7521306!5e0!3m2!1svi!2s!4v1654678214112!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`)
        }
      </div>
      <Grid className='x-container'>
        <Container>
          <Row>
            <Col xs={24}>
              <Form>
                <Form.Group>
                  <Form.ControlLabel>Tên của bạn</Form.ControlLabel>
                  <Form.Control value={EventTarget.value} placeholder={'Nhập tên của bạn'}></Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </Grid>
    </div>
  )
}

export default Contact