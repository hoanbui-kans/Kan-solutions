import { useRef, useState } from 'react'
import { Grid, Container, Row, Col, Form, Button, Schema, Loader, Checkbox } from 'rsuite'
import Link from 'next/link'
import styles from '../styles/account.module.css';
import { IoHomeOutline} from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react"
import SocialButton from '../components/SocialButton';

const Register = () => {

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
     if (!formRef.current.check()) {
       return;
    }
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
      <div className={styles.x_background}>
      </div>
      <Link href = '/'>
        <a className={styles.x_back_home}>
          <IoHomeOutline size={20}/>
          Trở về trang chủ
        </a>
      </Link>
      <Container>
        <Row>
          <Col xs={24} md={12}>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.x_login}>
              <h1 className={styles.x_account_title}>Đăng ký tài khoản</h1>
              <Form 
                fluid
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
                  <Form.ControlLabel>Nhập lại mật khẩu</Form.ControlLabel>
                  <Form.Control name='re_password' value={formValues.password} onChange={(e) => setFormValue({...formValues, password:e})} placeholder='Nhập mật khẩu'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Checkbox value="A">Đăng nhập tự động</Checkbox>
                </Form.Group>
                <Form.Group>
                  <Button appearance="primary" onClick={handleSubmit}>
                    {
                      loading ? <Loader /> : ''
                    }
                    Đăng ký tài khoản</Button>
                </Form.Group>
                
              </Form>
              <SocialButton />
            </div>
          </Col>
        </Row>
      </Container>
    </Grid>
  )
}

export default Register