import { useState, useRef, Loader } from 'react'
import { Form, Button, Row, ColumnGroupProps, Input, Message, model, Schema } from 'rsuite'
import { IoPaperPlane } from "react-icons/io5"
import styles from '../styles/page.module.css'

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

const ServicesForm = ( {service} ) => {
  const formRef = useRef();
  const contact_json = `${ROOT_URL}contact-form-7/v1/contact-forms/1855/feedback`;
  const [loading, setLoading] = useState(false);
  const [formValue, setFormvalue] = useState({
    fullname: '',
    tel: '',
    email: '',
    service: service,
    textarea: '',
  });

  const model = Schema.Model({
    'fullname': Schema.Types.StringType().isRequired('Bạn chưa nhập họ và tên.'),
    'tel': Schema.Types.StringType().isRequired('Bạn chưa nhập số điện thoại.'),
    'email': Schema.Types.StringType().isEmail('Địa chỉ Email không hợp lệ').isRequired('Bạn chưa nhập địa chỉ Email.'),
  });

  const handleSubmit = async () => {
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
    <>
        <Form 
            fluid
            ref={formRef} 
            onSubmit={handleSubmit}
            model={model} 
            onChange={setFormvalue}
            formValue={formValue}
        >
        <Form.Group>
            <Form.ControlLabel>
                Tên của bạn <span style={{color: 'red'}}>*</span>
            </Form.ControlLabel>
            <Form.Control name='fullname' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.ControlLabel>
                Số điện thoại <span style={{color: 'red'}}>*</span>
            </Form.ControlLabel>
            <Form.Control name='tel' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.ControlLabel>
                Địa chỉ Email <span style={{color: 'red'}}>*</span>
            </Form.ControlLabel>
            <Form.Control name='email' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.ControlLabel>Nhập nội dung của bạn</Form.ControlLabel>
            <Input name='textarea' as='textarea' value={EventTarget.value} placeholder={'Nhập tên của bạn'} rows={8} ></Input>
        </Form.Group>
        <Form.Group>
            <Button type='submit' className={styles.x_contact_form_button}>
                { loading ? <Loader size={22}/> : <IoPaperPlane size={22}/> }
                Đăng ký 
            </Button>
        </Form.Group>
    </Form>
    </>
  )
}

export default ServicesForm