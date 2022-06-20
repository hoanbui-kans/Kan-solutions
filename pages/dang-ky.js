import { useEffect, useRef, useState } from 'react'
import { Grid, Container, Row, Col, Form, Button, Schema, Loader, Checkbox, useToaster, Message, Toggle  } from 'rsuite'
import { IoHomeOutline} from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import Link from 'next/link'
import styles from '../styles/account.module.css';
import SocialButton from '../components/SocialButton';
import axios from 'axios';

const Register = () => {

  const router = useRouter();
  const { StringType } = Schema.Types;
  const rootURL = process.env.NEXT_PUBLIC_WP_JSON;
  const toaster = useToaster();

  const { data: session } = useSession();

  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
    autologin: false,
  }) 

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  const model = Schema.Model({
    username: StringType().isRequired('Bạn chưa nhập tên tài khoản.'),
    email: StringType().isEmail('Email nhập vào chưa chính xác.'),
    password: StringType().isRequired('Bạn chưa nhập mật khẩu.'),
    repassword: StringType().addRule((value, data) =>{
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'Nhập lại mật khẩu không đúng').isRequired('Bạn chưa nhập lại mật khẩu.'),
  });

  const handleAutologin = (checked) => {
    if(checked){
      toaster.push(
          <Message showIcon type="info">
            Đăng nhập tự động sau khi đăng ký thành công.
          </Message>, 
        { placement: 'topStart' } 
      ) 
    } else {
      toaster.push(
          <Message showIcon type="info">
            Chuyển hướng đến đăng nhập sau khi đăng ký thành công.
          </Message>, 
        { placement: 'topStart' } 
      )
    }
    setFormValues({...formValues, autologin: checked})
  }
  
  const handleSubmit = async () => {
    // Check validate form data
     if (!formRef.current.check()) {
       toaster.push(
          <Message showIcon type="error">
            Một hoặc nhiều trường nhập vào không hợp lệ, xin vui lòng thử lại.
          </Message>, 
        { placement: 'topStart' }
      ) 
      return;
    }
    // Đăng ký tài khoản
    setLoading(true);

    let data = new FormData();
    data.append('email', formValues.email);
    data.append('username', formValues.username);
    data.append('password', formValues.password);
    data.append('repassword', formValues.repassword);

      var config = {
        method: 'post',
        url: rootURL + 'create/user',
        data : data,
        headers: { 
          'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>'
        },
      };

      const Register = await axios(config).then((res) => {
          return res.data;
      }).catch(function (error) {
        console.log(error);
      });

      setLoading(false);

      if(Register && Register.code == 'success'){
      
        // Đăng nhập tự động
        if(formValues.autologin){
          toaster.push(
              <Message showIcon type="success">
                Đăng ký thành công, khởi tạo đăng nhập.
              </Message>, 
            { placement: 'topStart' }
          )
          const loginUser = await signIn('credentials', {
            redirect: false,
            username: Register.data.username,
            password: Register.data.password,
            callbackUrl: `${window.location.origin}`,
          })
        } else {
          toaster.push(
              <Message showIcon type="success">
                Đăng ký thành công, đang chuyển hướng đến đăng nhập.
              </Message>, 
            { placement: 'topStart' }
          )
          router.push('/dang-nhap/')
        }
      } else {
        toaster.push(
            <Message showIcon type="error">
              {Register ? Register.message : 'Đã có lỗi không mong muốn xảy ra, xui vui lòng liên hệ kỹ thuật để hỗ trợ!'}
            </Message>, 
          { placement: 'topStart' }
        )
      }
    }

 if (session) {
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
          <Col xs={24}>
            <div className={styles.x_login}>
              <h1 className={styles.x_account_title}>Đăng ký tài khoản</h1>
              <Form 
                fluid
                className={styles.x_login_form}
                formValue={formValues}
                onChange={setFormValues}
                onSubmit={handleSubmit}
                model={model} 
                ref={formRef}
              >
                <Form.Group>
                  <Form.ControlLabel>Địa chỉ Email</Form.ControlLabel>
                  <Form.Control name='email' type='email' value={EventTarget.value} placeholder='Nhập địa chỉ Email'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Tên đăng nhập</Form.ControlLabel>
                  <Form.Control name='username' type='text' value={EventTarget.value} placeholder='Nhập tên tài khoản'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Mật khẩu</Form.ControlLabel>
                  <Form.Control name='password' type='password' value={EventTarget.value} placeholder='Nhập mật khẩu'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Nhập lại mật khẩu</Form.ControlLabel>
                  <Form.Control name='repassword' type='password' value={EventTarget.value} placeholder='Nhập lại mật khẩu'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Toggle size="sm" defaultChecked={formValues.autologin} onChange={(checked) => { handleAutologin(checked) }}/> 
                  <label> Đăng nhập tự động sau khi đăng ký thành công</label>
                </Form.Group>
                <Form.Group>
                  <Button className={styles.x_login_button} appearance="primary" onClick={handleSubmit}>
                    {
                      loading ? <span className={styles.x_loading_icon}><Loader /> </span>: ''
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