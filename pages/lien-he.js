import { useRef, useState } from 'react'
import { Grid, Container, Row, Col, Form, Button, Input, Schema, Loader, toaster, Message  } from 'rsuite'
import { IoPaperPlane, IoHomeOutline } from "react-icons/io5";
import styles from '../styles/page.module.css'
import axios from 'axios';
import Link from 'next/link';

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON;
console.log(ROOT_URL);
const Contact = () => {

  const contact_json = `${ROOT_URL}contact-form-7/v1/contact-forms/1701/feedback`;
  const [loading, setLoading] = useState(false);
  const [formValue, setFormvalue] = useState({
    text: '',
    tel: '',
    email: '',
    textarea: '',
  });
  const formRef = useRef();
  const model = Schema.Model({
    'text': Schema.Types.StringType().isRequired('Bạn chưa nhập tên tài khoản.'),
    'tel': Schema.Types.StringType().isRequired('Bạn chưa nhập mật khẩu.'),
    'email': Schema.Types.StringType().isRequired('Bạn chưa nhập tên tài khoản.'),
  });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setLoading(true);

    let formData = new FormData(formRef.current.root);

    formData.append('text-115', formValue.text);
    formData.append('tel-12', formValue.tel);
    formData.append('email-974', formValue.email);
    formData.append('textarea-937', formValue.textarea);

    const config = {
      method: 'post',
      url: contact_json,
      data : formData,
    };

    const response = await axios(config).then((res) => {
      return res.data
    }).catch(function (error) {
      console.log(error);
    });

    
    if(response){
      let type = 'success';
      if(response.invalid_fields){
        type = 'warning';
        response.invalid_fields.map((val) => {
          setTimeout(() => {
            toaster.push(<Message showIcon type='error'>{val.message}</Message>);
          }, 1000);
        })
      }
      toaster.push(<Message showIcon type={type}>{response.message}</Message>);
    } else {
      toaster.push(<Message type='error'>Đã có lỗi xảy ra, xin vui lòng thử lại</Message>);
    }
    setLoading(false);
  }

  return (
      <Grid className={'x-container'}>
       <Link href = '/'>
        <a className={styles.x_back_home}>
          <IoHomeOutline size={20}/>
          Trở về trang chủ
        </a>
      </Link>
        <div className={styles.x_background}>
        </div>
        <Container className={styles.x_container_form}>
          <Row className={styles.x_flex + ' ' + styles.x_flex_center}>
            <Col xs={24} md={12}>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.x_form_wrapper}>
                <h1 className={styles.x_contact_title}>Liên hệ chúng tôi</h1>
                <Form 
                  fluid 
                  ref={formRef} 
                  onSubmit={handleSubmit}
                  model={model} 
                  onChange={setFormvalue}
                  formValue={formValue}
                >
                    <Form.Group>
                      <Form.ControlLabel>Tên của bạn</Form.ControlLabel>
                      <Form.Control name='text' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.ControlLabel>Số điện thoại</Form.ControlLabel>
                      <Form.Control name='tel' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.ControlLabel>Địa chỉ Email</Form.ControlLabel>
                      <Form.Control name='email'  type='email' value={EventTarget.value} placeholder={'Nhập tên của bạn'}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.ControlLabel>Nhập nội dung của bạn</Form.ControlLabel>
                      <Input name='textarea' as='textarea' value={EventTarget.value} placeholder={'Nhập tên của bạn'} rows={8} ></Input>
                    </Form.Group>
                    <Form.Group>
                      <Button type='submit' className={styles.x_contact_form_button}>
                        {
                          loading ? <Loader size={22}/> : <IoPaperPlane size={22}/>
                        }
                        Gửi thông tin</Button>
                    </Form.Group>
                  </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </Grid>
  )
}

export default Contact