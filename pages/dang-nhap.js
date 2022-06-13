import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Grid, Container, Row, Col, Form, Button, Schema, Loader, Checkbox } from 'rsuite'
import { setCookies } from 'cookies-next';
import Link from 'next/link'
import axios from 'axios';
import styles from '../styles/account.module.css';
import { IoHomeOutline } from "react-icons/io5";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"

const Login = () => {

  const { data: session } = useSession();
  const [formValues, setFormValue] = useState({
    username: 'admin',
    password: 'Caoanh123@'
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const model = Schema.Model({
    username: Schema.Types.StringType().isRequired('Bạn chưa nhập tên tài khoản.'),
    password: Schema.Types.StringType().isRequired('Bạn chưa nhập mật khẩu.')
  });

  const handleSubmit = async () => {
    // if (!formRef.current.check()) {
    //   return;
    // }
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      username: formValues.username,
      password: formValues.password,
      callbackUrl: `${window.location.origin}`,
    })
    setLoading(false);
    if (res?.error) {
      setError(res.error);
    } else {
      setError(false);
    }
  }

 if (session) {
    console.log(session)
    return (
      <>
        Signed in as <br />
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
                  <Form.Control name='username' value={formValues.username} onChange={(e) => setFormValue({...formValues, username:e})} placeholder='Nhập tên tài khoản'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Mật khẩu</Form.ControlLabel>
                  <Form.Control name='password' value={formValues.password} onChange={(e) => setFormValue({...formValues, password:e})} placeholder='Nhập mật khẩu'></Form.Control>
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