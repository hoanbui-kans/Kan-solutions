import { useRef, useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Input, Schema, Loader, toaster, Message, Breadcrumb  } from 'rsuite'
import { IoPaperPlane } from "react-icons/io5"
import styles from '../styles/page.module.css'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { ContactUsSeo } from './api/HeaderSeo'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'
const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

export const FormLienHe = () => {
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
    'text': Schema.Types.StringType().isRequired('Bạn chưa nhập tên của bạn.'),
    'tel': Schema.Types.StringType().isRequired('Bạn chưa nhập số điện thoại.'),
    'email': Schema.Types.StringType().isRequired('Bạn chưa nhập địa chỉ Email.'),
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
      if(response.status != 'mail_sent'){
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
    setFormvalue({
      text: '',
      tel: '',
      email: '',
      textarea: '',
    })
  }
  return(
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
            <Form.Control name='text' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}/>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Số điện thoại</Form.ControlLabel>
            <Form.Control name='tel' type='text' value={EventTarget.value} placeholder={'Nhập số điện thoại'}/>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Địa chỉ Email</Form.ControlLabel>
            <Form.Control name='email'  type='email' value={EventTarget.value} placeholder={'Nhập địa chỉ Email'}/>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Nhập nội dung của bạn</Form.ControlLabel>
            <Input name='textarea' as='textarea' value={formValue.textarea} placeholder={'Nhập nội dung cần tư vấn'} rows={8} onChange={(e) => setFormvalue( {...formValue, textarea: e})} />
          </Form.Group>
          <Form.Group>
            <Button type='submit' className={styles.x_contact_form_button}>
              {
                loading ? <Loader size={22}/> : <IoPaperPlane size={22}/>
              }
              Gửi thông tin</Button>
          </Form.Group>
    </Form>
  )
}
const Contact = () => {

  return (
    <>
      <Head>
        {HTMLReactParser(ContactUsSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content"))}
      </Head>
      <div className={'x_breadcum_container'}>
        <Container>
            <Row>
                <Col xs={24}>
                  <Breadcrumb className={'x_breadcumb'}>
                    <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active>Liên hệ</Breadcrumb.Item>
                  </Breadcrumb> 
                </Col>
            </Row>
        </Container>
      </div>  
      <section className={styles.x_contact_container}>
        <Container className={styles.x_container_form}>
          <Row className={'x_flex_center'}>
            <Col xs={24}>
                <div className={styles.x_content_map}>
                  { HTMLReactParser('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.268197538069!2d106.75064021473545!3d10.790759031546003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175278cfb60e4d1%3A0x2321e9b8bba9c98e!2sCentana%20Th%E1%BB%A7%20Thi%C3%AAm%20Apartment!5e0!3m2!1svi!2s!4v1655535718770!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')}
                </div>
            </Col>
            <Col xs={24} md={12}>
              <h1 className={styles.x_contact_title}>Liên hệ chúng tôi</h1>
              <p>Bạn cần được tư vấn, khiếu nại, hoặc có thông tin góp ý, xin vui lòng điền vào mẫu để chúng tôi có thể phản hồi bạn sớm nhất có thể.</p>
              <ul className={styles.x_footer_address_list}>
                      <li>
                        <div className={styles.x_contact_list}>
                          <span className={styles.x_footer_icon}>
                            <Image alt='layout' src={'/icons/Pin_fill.svg'} width={30} height={30}/>
                          </span>
                          <div>
                            <p>
                              <strong className={styles.x_footer_focused}> 
                                Địa chỉ: 
                              </strong>
                            </p>
                            <p>Tầng 4 Block A Centana Thủ Thiêm, quận 2, TP. HCM</p>
                          </div>
                        </div>
                        </li>
                        <li>
                        <div className={styles.x_contact_list}>
                          <span className={styles.x_footer_icon}>
                              <Image alt='layout' src={'/icons/Phone_fill.svg'} width={30} height={30}/>
                          </span>
                          <div>
                            <p>
                              <strong className={styles.x_footer_focused}>
                              Hotline: 
                              </strong>
                            </p>
                            <p>  
                              <a href={'tel:0392193639'}>
                                039 219 3639
                              </a>
                            </p>
                          </div>
                        </div>
                        </li>
                        <li>
                        <div className={styles.x_contact_list}>
                          <span className={styles.x_footer_icon}>
                              <Image alt='layout' src={'/icons/Message_alt.svg'} width={30} height={30}/>
                          </span>
                          <div>
                            <p>
                              <strong className={styles.x_footer_focused}>
                                Email: 
                              </strong>
                            </p>
                            <p> 
                              <a href={'mailto:info@kanbox.vn'}>
                                info@kanbox.vn
                              </a>
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.x_form_wrapper}>
                <FormLienHe />
              </div>
            </Col>
          </Row>
        </Container>
    </section>
    </>
  )
}

export default Contact