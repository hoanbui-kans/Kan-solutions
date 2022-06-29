import { useState, useRef, useEffect } from 'react'
import { Form, Button, Input , Message, Schema, Loader, toaster } from 'rsuite'
import { IoPaperPlane } from "react-icons/io5"
import styles from '../styles/page.module.css'
import axios from 'axios'

const ServicesSubmitForm = ({service}) => {
  const formRef = useRef();
  const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON
  const contact_json = `${ROOT_URL}contact-form-7/v1/contact-forms/1855/feedback`;
  const [loading, setLoading] = useState(false);
  const [formValue, setFormvalue] = useState({
    fullname: '',
    tel: '',
    email: '',
    service: service,
    textarea: '',
  });

  useEffect(() => {
    console.log(formValue)
  }, [formValue])

  const model = Schema.Model({
    'fullname': Schema.Types.StringType().isRequired('Bạn chưa nhập họ và tên.'),
    'tel': Schema.Types.StringType().isRequired('Bạn chưa nhập số điện thoại.'),
    'email': Schema.Types.StringType().isEmail('Địa chỉ Email không hợp lệ').isRequired('Bạn chưa nhập địa chỉ Email.'),
  });

  const handleSubmitServices = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setLoading(true);

    let formData = new FormData(formRef.current.root);

    formData.append('text-124', formValue.fullname);
    formData.append('tel-351', formValue.tel);
    formData.append('email-397', formValue.email);
    formData.append('text-125', formValue.service);
    formData.append('textarea-94', formValue.textarea);

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
      fullname: '',
      tel: '',
      email: '',
      service: service,
      textarea: '',
    })
  }

  return (
    <>
      <div className={styles.x_submit_service_form}>
          <Form 
              fluid
              ref={formRef} 
              onSubmit={handleSubmitServices}
              model={model} 
              onChange={setFormvalue}
              formValue={formValue}
          >
          <Form.Group className={styles.x_service_form_group}>
              <Form.ControlLabel>
                  Tên của bạn <span style={{color: 'red'}}>*</span>
              </Form.ControlLabel>
              <Form.Control name='fullname' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}/>
          </Form.Group>
          <Form.Group className={styles.x_service_form_group}>
              <Form.ControlLabel>
                  Số điện thoại <span style={{color: 'red'}}>*</span>
              </Form.ControlLabel>
              <Form.Control name='tel' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}/>
          </Form.Group>
          <Form.Group className={styles.x_service_form_group}>
              <Form.ControlLabel>
                  Địa chỉ Email <span style={{color: 'red'}}>*</span>
              </Form.ControlLabel>
              <Form.Control name='email' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}/>
          </Form.Group>
          <Form.Group className={styles.x_service_form_group}>
              <Form.ControlLabel>Nhập nội dung của bạn</Form.ControlLabel>
              <Input as="textarea" name='textarea' rows={5} value={formValue.textarea} placeholder={'Nhập nội dung cần tư vấn'} onChange={(e) => setFormvalue( {...formValue, textarea: e})}/>
          </Form.Group>
          <Form.Group className={styles.x_service_form_group}>
              <Button type='submit' className={styles.x_contact_form_button}>
                  { loading ? <Loader size={22}/> : <IoPaperPlane size={16}/> }
                  Đăng ký 
              </Button>
          </Form.Group>
      </Form>
    </div>
    </>
  )
}

export default ServicesSubmitForm