import React, { useRef, useState, useCallback } from 'react'
import { Grid, Container, Row, Col, Form, Button, Schema, Loader, Checkbox } from 'rsuite'
import { setCookies } from 'cookies-next';
import Link from 'next/link'
import axios from 'axios';
import styles from '../styles/account.module.css';
import { IoHomeOutline } from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
  const { data: session } = useSession()

  console.log(session);
  const REDIRECT_URI = 'https://localhost:3000/dang-nhap'

  const [profile, setProfile] = useState();
  const [provider, setProvider] = useState('')

  const facebookRef = useRef(null)

  const onLoginStart = useCallback(() => {
    alert('login start')
  }, [])

  const onLogoutFailure = useCallback(() => {
    alert('logout fail')
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success')
  }, [])

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
  
  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const handleSocialLogin = (user, err) => {
    console.log(user);
    console.log(err);
  };

 if (session) {
   console.log('session', session);
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <Grid className={styles.x_account_container}>
      <Link href = '/'>
        <a className={styles.x_back_home}>
          <IoHomeOutline size={20}/>
          Trở về trang chủ
        </a>
      </Link>
      <Container>
        <Row className={styles.x_flex}>
          <Col xs={24} md={12} className={styles.x_account_background_sections}>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.x_login}>
              <h1>Đăng nhập</h1>
              <Form 
                className={styles.x_login_form}
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
                  <Checkbox value="A">Đăng nhập tự động</Checkbox>
                </Form.Group>
                <Form.Group>
                  <Button appearance="primary" onClick={handleSubmit}>
                    {
                      loading ? <Loader /> : ''
                    }
                    Đăng nhập</Button>
                </Form.Group>
                
              </Form>

                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
                <button onClick={() => signIn("google")}>Sign in with Google</button>

            </div>
          </Col>
        </Row>
      </Container>
    </Grid>
  )
}

export default Login