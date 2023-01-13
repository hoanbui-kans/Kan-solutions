import { useRef, useState } from 'react'
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  RadioGroup, 
  Radio, 
  SelectPicker, 
  TagPicker,
  Divider,
  Message,
  Loader,
  Schema,
  Breadcrumb,
  toaster  } from 'rsuite'
import styles from '../styles/page.module.css'
import { IoPaperPlaneSharp } from "react-icons/io5";
import HTMLReactParser from 'html-react-parser';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

const Recruitment = () => {
  const formRef = useRef();
  const contact_json = `${ROOT_URL}contact-form-7/v1/contact-forms/2201/feedback`;
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState('');
  const [time, setTime] = useState('');
  const [skill, setSkill] = useState([]);
  const [formValue, setFormValue] = useState({
    fullname: '',
    birth: '',
    email: '',
    phone: '',
    year: '',
    file_cv: ''
  });

  
  const model = Schema.Model({
    'fullname': Schema.Types.StringType().isRequired('Bạn chưa nhập tên của bạn.'),
    'phone': Schema.Types.StringType().isRequired('Bạn chưa nhập số điện thoại.'),
    'email': Schema.Types.StringType().isRequired('Bạn chưa nhập địa chỉ Email.'),
  });

  const handleSubmit = async () => {
    setLoading(true);
    let formData = new FormData();
    let list_skill = '';
    skill.length > 0 ? list_skill = skill.toString() : '';
    formData.append('text-131', formValue.fullname);
    formData.append('date-718', formValue.birth);
    formData.append('email-65', formValue.email);
    formData.append('tel-51', formValue.phone);
    formData.append('number-367', formValue.year);
    formData.append('text-179', formValue.file_cv);
    // Another Field
    formData.append('text-132', position); // Vị trí tuyển dụng
    formData.append('text-135', time); // Thời gian làm việc
    formData.append('text-136', list_skill); // Kỹ năng làm việc

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
      
      console.log(type)
      toaster.push(<Message showIcon type={type}>{response.message}</Message>);
    } else {
      toaster.push(<Message type='error'>Đã có lỗi xảy ra, xin vui lòng thử lại</Message>);
    }
    setLoading(false);
    setFormValue({
      fullname: '',
      birth: '',
      email: '',
      phone: '',
      year: '',
      file_cv: ''
    });
    setPosition('');
    setTime('');
    setSkill([]);
  };

  const data = [
    {
      "label": "Thiết kế đồ họa",
      "value": "Thiết kế đồ họa",
      "role": "Master"
    },
    {
      "label": "Nhân viên sale",
      "value": "Nhân viên sale",
      "role": "Master"
    },
    {
      "label": "Lập trình viên",
      "value": "Lập trình viên",
      "role": "Master"
    },
  ]

  const dataPicker = [
    {
      "label": "Html",
      "value": "Html",
      "role": "Master"
    },
    {
      "label": "Css",
      "value": "Css",
      "role": "Master"
    },
    {
      "label": "Php",
      "value": "Php",
      "role": "Master"
    },
    {
      "label": "Javascript",
      "value": "Javascript",
      "role": "Master"
    },
    {
      "label": "NodeJs",
      "value": "NodeJs",
      "role": "Master"
    },
    {
      "label": "NextJs",
      "value": "NextJs",
      "role": "Master"
    },
    {
      "label": "React Native",
      "value": "React Native",
      "role": "Master"
    },
    {
      "label": "GatsBy",
      "value": "GatsBy",
      "role": "Master"
    },
    {
      "label": "Wordpress",
      "value": "Wordpress",
      "role": "Master"
    },
  ];

  return (
    <>
      <div className={'x_breadcum_container'}>
          <Container>
              <Row>
                  <Col xs={24}>
                    <Breadcrumb className={'x_breadcumb'}>
                      <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                      <Breadcrumb.Item active>Tuyển dụng</Breadcrumb.Item>
                    </Breadcrumb> 
                  </Col>
              </Row>
          </Container>  
      </div>  
      <section className={styles.x_recruiment_section}>
        <Container>
            <Row>
            <Col xs={24}>
                <div className={styles.x_recruiment_form}>
                  <Form
                      fluid
                      ref={formRef}
                      onSubmit={handleSubmit}
                      onChange={setFormValue}
                      formValue={formValue}
                      model={model}
                    >
                      
                    <Row>
                          <Col xs={24}>
                            <Form.Group controlId="radioList">
                              <h3 className={styles.x_recruiment_title}>Nội dung chi tiết</h3>
                              <Form.ControlLabel>
                                Lựa chọn vị trí mà bạn muốn ứng tuyển, có thể liên hệ trực tiếp với chúng tôi để tham gia phỏng vấn.
                              </Form.ControlLabel>
                            </Form.Group>
                            <Divider />
                          </Col>
                          <Col xs={24}>
                            <Form.Group>
                              <h3 className={styles.x_recruiment_title}>Thông tin cá nhân <span style={{color: 'red'}}>*</span></h3>
                                  <Form.ControlLabel>
                                    Điền đầy đủ thông tin của bạn.
                                  </Form.ControlLabel>
                              </Form.Group>
                            <Divider />
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Group>
                              <Form.ControlLabel>
                                  Họ và tên <span style={{color: 'red'}}>*</span>
                              </Form.ControlLabel>
                              <Form.Control className={styles.x_input_margin} name='fullname' type="text" style={{width: '100%'}}/>
                            </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Group>
                              <Form.ControlLabel>
                                  Ngày tháng/ năm sinh <span style={{color: 'red'}}>*</span>
                              </Form.ControlLabel>
                              <Form.Control className={styles.x_input_margin} name='birth' type="date" style={{width: '100%'}}/>
                            </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Group>
                              <Form.ControlLabel>
                                  Địa chỉ Email <span style={{color: 'red'}}>*</span>
                              </Form.ControlLabel>
                              <Form.Control className={styles.x_input_margin} name='email' type="email" style={{width: '100%'}}/>
                            </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Group>
                              <Form.ControlLabel>
                                  Số điện thoại <span style={{color: 'red'}}>*</span>
                              </Form.ControlLabel>
                              <Form.Control className={styles.x_input_margin} name='phone' type="phone" style={{width: '100%'}}/>
                            </Form.Group>
                          </Col>
                          <Col xs={24}>
                            <Divider />
                          </Col>
                          <Col xs={24} md={12}>
                              <Form.Group>
                              <h3 className={styles.x_recruiment_title}>Vị trí <span style={{color: 'red'}}>*</span></h3>
                                <Form.ControlLabel>
                                  Vị trí mà bạn muốn ứng tuyển.
                                </Form.ControlLabel>
                              </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                              <Form.Group>
                                <SelectPicker onChange={(e) => {setPosition(e)} } value={position} name='position' data={data} appearance="default" placeholder="Vị trí ứng tuyển" searchable={false} style={{width: '100%'}} />
                              </Form.Group>
                          </Col>
                          <Col xs={24}>
                            <Divider />
                          </Col>
                          <Col xs={24} md={12}>
                              <Form.Group>
                                <h3 className={styles.x_recruiment_title}>Thời gian</h3>
                                <Form.ControlLabel>
                                  Chọn thời gian làm việc.
                                </Form.ControlLabel>
                              </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Group>
                              <RadioGroup name="time" onChange={(e) => { setTime(e) }} value={time}>
                                <Radio value="Full-time">Full-time</Radio>
                                <Radio value="Part-time">Part-time</Radio>
                                <Radio value="Thực tập sinh">Thực tập sinh</Radio>
                              </RadioGroup>
                            </Form.Group>
                          </Col>
                          <Col xs={24}>
                            <Divider />
                          </Col>
                          <Col xs={24} md={12}>
                              <Form.Group>
                                <h3 className={styles.x_recruiment_title}>Các kỹ năng</h3>
                                <Form.ControlLabel>
                                  Lựa chọn 1-2 kỹ năng hiện có của bạn, chúng tôi sẽ xem xét yêu cầu tuyển dụng
                                  các kỹ năng không nhất thiết phải có trong profile này, nhưng là yếu tố để bảo đảm chúng tôi có thể hỗ trợ bạn phát triển tốt hơn
                                </Form.ControlLabel>
                              </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                              <Form.Group>
                                <TagPicker onChange={(e) => {setSkill(e)}} value={skill} name='skills' placeholder='Thêm các kỹ năng' data={dataPicker}  trigger={['Enter', 'Space', 'Comma']} style={{width: '100%'}}/>
                              </Form.Group>
                          </Col>
                          <Col xs={24}>
                            <Divider />
                          </Col>
                          <Col xs={24} md={12}>
                              <Form.Group>
                                <h3 className={styles.x_recruiment_title}>Kinh nghiệm</h3>
                                <Form.ControlLabel>
                                  Số năm làm việc của bạn
                                </Form.ControlLabel>
                              </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Group>
                              <Form.Control type="number" name='year' min={0} placeholder={'Kinh nghiệm làm việc'} style={{width: '100%'}}/>
                            </Form.Group>
                          </Col>
                          <Col xs={24}>
                            <Divider />
                          </Col>
                          <Col xs={24} md={12}>
                              <Form.Group>
                                <h3 className={styles.x_recruiment_title}>File CV</h3>
                                <Form.ControlLabel>
                                  Lựa chọn tải lên file CV bằng đường dẫn
                                </Form.ControlLabel>
                              </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                              <Form.Group>
                                <Form.Control placeholder='https://www.topcv.vn/...' name='file_cv' type="text" style={{width: '100%'}}/>
                              </Form.Group>
                          </Col>
                          <Col xs={24}>
                            <Divider />
                          </Col>
                          <Col xs={24}>
                            <Button type='submit' className={styles.x_recruiment_button} appearance="primary">
                                {
                                  loading ? 
                                    <Loader size='sm'/> :
                                    <IoPaperPlaneSharp size={16}/>
                                }
                              Gửi thông tin
                            </Button>
                          </Col>
                    </Row>
                  </Form>
                </div>
            </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Recruitment