import { useState, useRef } from 'react' 
import axios from 'axios'
import {  Button, Form, Input, Loader, Schema, Message, toaster } from 'rsuite'
import styles from '../styles/page.module.css'
import { IoPaperPlane } from "react-icons/io5"

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON;

const FormTuVan = ({title}) => {
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
    formData.append('textarea-937', title + '.&#13;&#10;' + formValue.textarea);

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
  return (
    <>
     <Form 
        className={styles.x_help_form} 
        fluid
        ref={formRef} 
        onSubmit={handleSubmit}
        model={model} 
        onChange={setFormvalue}
        formValue={formValue}
        > 
        <Form.Group className={styles.x_service_form_group}>
            <Form.ControlLabel>Tên của bạn <span style={{color: 'red'}}>*</span></Form.ControlLabel>
            <Form.Control name='text' value={EventTarget.value} placeholder='Nhập tên của bạn...' type='text' />
        </Form.Group>
        <Form.Group className={styles.x_service_form_group}>
            <Form.ControlLabel>Số điện thoại</Form.ControlLabel>
            <Form.Control name='tel' type='text' value={EventTarget.value} placeholder={'Nhập số điện thoại'}/>
        </Form.Group>
        <Form.Group className={styles.x_service_form_group}>
            <Form.ControlLabel>Địa chỉ Email <span style={{color: 'red'}}>*</span></Form.ControlLabel>
            <Form.Control name='email' value={EventTarget.value} placeholder='Nhập địa chỉ Email...' type='email' />
        </Form.Group>
        <Form.Group className={styles.x_service_form_group}>
            <Form.ControlLabel>Nội dung yêu cầu</Form.ControlLabel>
            <Input rows={6} value={EventTarget.value} as="textarea" name='content' onChange={(e) => setFormvalue( {...formValue, textarea: e})} placeholder='Nhập nội dung cần hỗ trợ...'/>
        </Form.Group>
        <Form.Group className={styles.x_service_form_group}>
            <Button type='submit' className={styles.x_contact_form_button}>
                {
                loading ? <Loader size={22}/> : <IoPaperPlane size={16}/>
                }
                Gửi thông tin</Button>
        </Form.Group>
    </Form>
    </>
  )
}

export default FormTuVan