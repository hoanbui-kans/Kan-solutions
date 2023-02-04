import { useState, useRef } from 'react'
import { Form, Button , Message, Schema, Loader, toaster, List, Panel, Row, Col } from 'rsuite'
import { IoPaperPlane } from "react-icons/io5"
import styles from '../styles/page.module.css'
import axios from 'axios'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Price, Separator } from '../pages/giao-dien/[slug]';

const ThemesSubmitForm = ({title, selectedService, lastPrice}) => {
  const formRef = useRef();
  const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON
  const contact_json = `${ROOT_URL}contact-form-7/v1/contact-forms/2236/feedback`;
  const [loading, setLoading] = useState(false);
  const [formValue, setFormvalue] = useState({
    fullname: '',
    tel: '',
    email: '',
  });

  const model = Schema.Model({
    'fullname': Schema.Types.StringType().isRequired('Bạn chưa nhập họ và tên.'),
    'tel': Schema.Types.StringType().isRequired('Bạn chưa nhập số điện thoại.'),
    'email': Schema.Types.StringType().isEmail('Địa chỉ Email không hợp lệ').isRequired('Bạn chưa nhập địa chỉ Email.'),
  });

  const handleSubmitServices = async () => {
    let textareaContent = '';
    selectedService.map((val) => {
        textareaContent += `${val.service ? val.service : ''} - giá: ${val.price ? Separator(val.price) : ''}đ | &#10;&#13;`;
    });
    textareaContent += `Tổng: ${lastPrice.sale_price ? Separator(lastPrice.sale_price) : Separator(lastPrice.regular_price)}đ`;

    if (!formRef.current.check()) {
      return;
    }
    setLoading(true);

    let formData = new FormData(formRef.current.root);

    formData.append('text-124', formValue.fullname);
    formData.append('tel-351', formValue.tel);
    formData.append('email-397', formValue.email);
    formData.append('text-125', title);
    formData.append('textarea-328', textareaContent);

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
    })
  }

  return (
    <>
      <div className={styles.x_submit_service_form}>
        <Row>
            <Col xs={24} md={12}>
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
                    <Form.Control name='tel' type='text' value={EventTarget.value} placeholder={'Nhập số điện thoại'}/>
                </Form.Group>
                <Form.Group className={styles.x_service_form_group}>
                    <Form.ControlLabel>
                        Địa chỉ Email <span style={{color: 'red'}}>*</span>
                    </Form.ControlLabel>
                    <Form.Control name='email' type='text' value={EventTarget.value} placeholder={'Nhập tên của bạn'}/>
                </Form.Group>
                <Form.Group className={styles.x_service_form_group}>
                        <Button type='submit' className={styles.x_contact_form_button}>
                            { loading ? <Loader size={22}/> : <IoPaperPlane size={16}/> }
                            Đăng ký 
                        </Button>
                    </Form.Group>
                </Form>
            </Col> 
            <Col xs={24} md={12}>
                <Panel bordered header="Đơn giá xây dựng website">
                    <List>
                        {
                            selectedService.length > 0 ? 
                            selectedService.map((item, index) => (
                                <List.Item key={index} index={index}>
                                    <Row>
                                        <Col xs={16}>
                                            <IoCheckmarkCircleSharp color="green" style={{marginRight: 7}}/>  
                                            <span>{item.service}</span>
                                        </Col>
                                        <Col xs={8}>
                                            <div className='smaller_price'>
                                                { item.price ? Separator(item.price): ''}đ
                                            </div>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )) : ''
                        }
                        <List.Item index={selectedService.length + 1} style={{background: '#fff'}}>
                            <div className='total_price' style={{fontSize: 16, textAlign: 'center'}}>
                                Tổng: <strong>{ lastPrice.sale_price ? Separator(lastPrice.sale_price) : Separator(lastPrice.regular_price) }đ</strong>
                            </div>
                        </List.Item>
                    </List>
                </Panel>
            </Col>
        </Row>
    </div>
    </>
  )
}

export default ThemesSubmitForm