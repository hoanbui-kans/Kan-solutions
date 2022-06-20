import { useRef, useState } from 'react'
import { Grid, Container, Row, Col, Form, Button, Schema, Loader, Checkbox, Message, useToaster } from 'rsuite'
import Link from 'next/link'
import styles from '../styles/account.module.css';
import { IoHomeOutline } from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react"
import SocialButton from '../components/SocialButton';

const Login = () => {
  const toaster = useToaster();
  const { data: session } = useSession();
  const [formValues, setFormValue] = useState({
    username: '',
    password: ''
  });

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
    }).catch((error) => {
      console.log(error)
    })

    setLoading(false);

    if(res.error){
      toaster.push(
        <Message type='error' showIcon>Tên tài khoản hoặc mật khẩu không đúng</Message>, 
        { placement : 'topStart'}
      )
    }
  }

 if (session) {
    const userName = session.user.user_display_name;
    const userEmail = session.user.user_email;

    return (
      <>
       <Grid className={styles.x_account_container}>
          <Link href = '/'>
            <a className={styles.x_back_home}>
              <IoHomeOutline size={20}/>
              Trở về trang chủ
            </a>
          </Link>
          <Container>
            <Row>
              <Col xs={24}>
                <div className={styles.x_login + ' ' + styles.x_logged_form}>
                  <h1 className={styles.x_account_title}>Xin chào {userName}</h1>
                  <small>({userEmail})</small>
                  <p className={styles.x_greeting}>Bạn đã đăng nhập vào hệ thống của chúng tôi, hãy bắt đầu tạo website của bạn</p>
                    <Button className={styles.x_login_button + ' ' + styles.x_margin_bottom} appearance="primary" onClick={() => signOut()}>
                        Đăng xuất
                    </Button>
                  <SocialButton />
                </div>
              </Col>
            </Row>
          </Container>
        </Grid>
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
        <Row>
          <Col xs={24}>
            <div className={styles.x_login}>
              <h1  className={styles.x_account_title}>Đăng nhập</h1>
              <Form 
                fluid
                className={styles.x_login_form}
                model={model} 
                ref={formRef}
              >
                <Form.Group>
                  <Form.ControlLabel>Tên đăng nhập</Form.ControlLabel>
                  <Form.Control name='username' type='text' value={formValues.username} onChange={(e) => setFormValue({...formValues, username:e})} placeholder='Nhập tên tài khoản'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Mật khẩu</Form.ControlLabel>
                  <Form.Control name='password' type='password' value={formValues.password} onChange={(e) => setFormValue({...formValues, password:e})} placeholder='Nhập mật khẩu'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Checkbox value="A">Đăng nhập tự động</Checkbox>
                </Form.Group>
                <Form.Group>
                  <Button className={styles.x_login_button} appearance="primary" onClick={handleSubmit}>
                    {
                      loading ? <span className={styles.x_loading_icon}><Loader /> </span>: ''
                    }
                    Đăng nhập</Button>
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

export default Login