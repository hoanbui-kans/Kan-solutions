import React, { useRef, useState } from 'react'
import { Grid, Container, Row, Col, Form, Button, Schema, Loader } from 'rsuite'
import { setCookies } from 'cookies-next';
import axios from 'axios';

const Login = () => {

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const model = Schema.Model({
    username: Schema.Types.StringType().isRequired('Bạn chưa nhập tên tài khoản.'),
    password: Schema.Types.StringType().isRequired('Bạn chưa nhập mật khẩu.')
  });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setLoading(true);
    const data = new FormData(formRef.current.root);
    const config = {
      method: 'post',
      url: 'https://kanbox.vn/wp-json/jwt-auth/v1/token',
      data : data,
    };

    const response = await axios(config)
      .then(function (response) {
          return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    setLoading(false);
    setCookies('user', response , { maxAge: 60 * 6 * 24 });
  };

  return (
    <Grid>
      <Container>
        <Row>
          <Col>
            <Form 
              model={model} 
              ref={formRef}
            >
              <Form.Group>
                <Form.ControlLabel>Tên đăng nhập</Form.ControlLabel>
                <Form.Control name='username' value={EventTarget.value} placeholder='Nhập tên tài khoản'></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Mật khẩu</Form.ControlLabel>
                <Form.Control name='password' value={EventTarget.value} placeholder='Nhập mật khẩu'></Form.Control>
              </Form.Group>
              <Form.Group>
                <Button appearance="primary" onClick={handleSubmit}>
                  {
                    loading ? <Loader /> : ''
                  }
                  Đăng nhập</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Grid>
  )
}

export default Login