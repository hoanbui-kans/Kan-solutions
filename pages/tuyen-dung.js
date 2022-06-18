import { useRef, useState, useEffect } from 'react'
import { 
  Grid, 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  model, 
  RadioGroup, 
  Radio, 
  Input ,
  SelectPicker, 
  TagPicker,
  InputNumber,
  Divider,
  Message,
  Loader,
  toaster  } from 'rsuite'
import styles from '../styles/page.module.css'
import { IoPaperPlaneSharp } from "react-icons/io5";
import { RecruitmentSeo } from './api/HeaderSeo';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';

const Recruitment = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    fullname: '',
    birth: '',
    email: '',
    phone: '',
    postion: '',
    year: '',
    time: '',
    skill: '',
    file_cv: ''
  });

  useEffect(() => {
    console.log(formValue);
  }, [formValue])

  const handleSubmit = () => {
    setLoading(!loading);
    console.log(formValue);
    if (!formRef.current.check()) {
      toaster.push(<Message type="error">Error</Message>);
      return;
    }
    toaster.push(<Message type="success">Success</Message>);
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
      <Head>
        { HTMLReactParser(RecruitmentSeo) }
      </Head>
      <section className={styles.x_recruiment_section}>
      <Grid>
        <Container>
          <Row>
            <Col xs={24}>
                <Form
                    fluid
                    ref={formRef}
                    onSubmit={handleSubmit}
                    onChange={setFormValue}
                    onCheck={setFormError}
                    formValue={formValue}
                    model={model}
                  >
                  <Col className={styles.x_padding} xs={24}>
                    <Form.Group controlId="radioList">
                      <h3 className={styles.x_recruiment_title}>Nội dung chi tiết</h3>
                      <Form.ControlLabel>
                        Lựa chọn vị trí mà bạn muốn ứng tuyển, có thể liên hệ trực tiếp với chúng tôi để tham gia phỏng vấn.
                      </Form.ControlLabel>
                      <Divider />
                    </Form.Group>
                  </Col>
                  <Form.Group>
                      <Row>
                        <Col className={styles.x_padding} xs={24}>
                          <h3 className={styles.x_recruiment_title}>Thông tin cá nhân *</h3>
                          <Form.ControlLabel>
                            Điền đầy đủ thông tin của bạn.
                          </Form.ControlLabel>
                          <Divider />
                        </Col>
                        <Col className={styles.x_padding} xs={24} md={12}>
                          <Form.ControlLabel>
                              Họ và tên.
                          </Form.ControlLabel>
                          <Input className={styles.x_input_margin} name='fullname' type="text" style={{width: '100%'}}/>
                        </Col>
                        <Col className={styles.x_padding} xs={24} md={12}>
                          <Form.ControlLabel>
                              Ngày tháng/ năm sinh.
                          </Form.ControlLabel>
                          <Input className={styles.x_input_margin} name='birth' type="date" style={{width: '100%'}}/>
                        </Col>
                        <Col className={styles.x_padding} xs={24} md={12}>
                          <Form.ControlLabel>
                              Địa chỉ Email *
                          </Form.ControlLabel>
                          <Input className={styles.x_input_margin} name='email' type="text" style={{width: '100%'}}/>
                        </Col>
                        <Col className={styles.x_padding} xs={24} md={12}>
                          <Form.ControlLabel>
                              Số điện thoại
                          </Form.ControlLabel>
                          <Input className={styles.x_input_margin} name='phone' type="text" style={{width: '100%'}}/>
                        </Col>
                        <Col className={styles.x_padding} xs={24}>
                          <Divider />
                        </Col>
                      </Row>
                  </Form.Group>

                  <Form.Group>
                      <Row>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <h3 className={styles.x_recruiment_title}>Vị trí *</h3>
                            <Form.ControlLabel>
                              Vị trí mà bạn muốn ứng tuyển.
                            </Form.ControlLabel>
                        </Col>
                        <Col xs={24} md={12} className={styles.x_padding}>
                          <SelectPicker name='position' data={data} appearance="default" placeholder="Vị trí ứng tuyển" searchable={false} style={{width: '100%'}} />
                        </Col>
                        <Col className={styles.x_padding} xs={24}>
                          <Divider />
                        </Col>
                      </Row>
                  </Form.Group>

                  <Form.Group>
                      <Row>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <h3 className={styles.x_recruiment_title}>Thời gian *</h3>
                            <Form.ControlLabel>
                              Chọn thời gian làm việc.
                            </Form.ControlLabel>
                        </Col>
                        <Col xs={24} md={12} className={styles.x_padding}>
                          <RadioGroup name="time">
                            <Radio value="Full-time">Full-time</Radio>
                            <Radio value="Part-time">Part-time</Radio>
                            <Radio value="Thực tập sinh">Thực tập sinh</Radio>
                          </RadioGroup>
                        </Col>
                        <Col className={styles.x_padding} xs={24}>
                          <Divider />
                        </Col>
                      </Row>
                  </Form.Group>

                  <Form.Group>
                      <Row>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <h3 className={styles.x_recruiment_title}>Các kỹ năng *</h3>
                            <Form.ControlLabel>
                              Lựa chọn 1-2 kỹ năng hiện có của bạn, chúng tôi sẽ xem xét yêu cầu tuyển dụng
                              các kỹ năng không nhất thiết phải có trong profile này, nhưng là yếu tố để bảo đảm chúng tôi có thể hỗ trợ bạn phát triển tốt hơn
                            </Form.ControlLabel>
                        </Col>
                        <Col xs={24} md={12} className={styles.x_padding}>
                          <TagPicker name='skills' placeholder='Thêm các kỹ năng' data={dataPicker}  trigger={['Enter', 'Space', 'Comma']} style={{width: '100%'}}/>
                        </Col>
                        <Col className={styles.x_padding} xs={24}>
                          <Divider />
                        </Col>
                      </Row>
                  </Form.Group>

                  <Form.Group>
                      <Row>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <h3 className={styles.x_recruiment_title}>Kinh nghiệm *</h3>
                            <Form.ControlLabel>
                              Số năm làm việc của bạn
                            </Form.ControlLabel>
                        </Col>
                        <Col xs={24} md={12} className={styles.x_padding}>
                          <InputNumber name='year' min={0} placeholder={'Kinh nghiệm làm việc'} style={{width: '100%'}}/>
                        </Col>
                        <Col className={styles.x_padding} xs={24}>
                          <Divider />
                        </Col>
                      </Row>
                  </Form.Group>

                  <Form.Group>
                      <Row>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <h3 className={styles.x_recruiment_title}>File CV *</h3>
                            <Form.ControlLabel>
                              Lựa chọn tải lên file CV
                            </Form.ControlLabel>
                        </Col>
                        <Col xs={24} md={12} className={styles.x_padding}>
                          <Input name='file_cv' type="file" style={{width: '100%'}}/>
                        </Col>
                        <Col className={styles.x_padding} xs={24}>
                          <Divider />
                        </Col>
                      </Row>
                  </Form.Group>

                  <Form.Group>
                    <Col xs={24} className={styles.x_padding}>
                      <Button type='submit' className={styles.x_recruiment_button} appearance="primary">
                          {
                            loading ? 
                              <Loader size='sm'/> :
                              <IoPaperPlaneSharp size={16}/>
                          }
                        Gửi thông tin
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
            </Col>
          </Row>
        </Container>
      </Grid>
    </section>
    </>
  )
}

export default Recruitment