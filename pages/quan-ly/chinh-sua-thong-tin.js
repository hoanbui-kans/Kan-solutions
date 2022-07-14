import { useState, useRef, useEffect } from 'react'
import { Panel, Container, Row, Col, Button, Form, Schema, Loader, toaster, Message, SelectPicker, RadioGroup, Radio, DatePicker, Divider, Sidenav  } from 'rsuite'
import { DVHCVN } from '../api/Dvhcvn'
import { locales } from '../api/locales'
import { signIn } from 'next-auth/react'
import { IoLogoFacebook, IoLogoGoogle, IoPaperPlane } from "react-icons/io5";
import axios from 'axios'
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav'
import { getSession } from 'next-auth/react';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const UserEditor = ({user_infor, nonce}) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const user_login = user_infor ? user_infor.user_login : '';
  const nonce_key = nonce ? nonce : '';

  const[formValue, setFormValue] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    billing_address: ''
  })
  useEffect(() => {
    console.log(formValue);
  }, [formValue])
  // Tinh
  const [dataTinh, setDataTinh] = useState([]);
  const [tinh, setTinh] = useState('');
  // Huyen
  const [dataHuyen, setDataHuyen] = useState([]);
  const [huyen, setHuyen] = useState('');
  // Xa
  const [dataXa, setDataXa] = useState([]);
  const [xa, setXa] = useState('');
  const [gender, setGender] = useState('');
  useEffect(() => {
    console.log(gender)
  }, [gender])
  // Update DataTinh OnLoad 
  useEffect(() => {
    const new_city = () => {
      let cities = [{
        "label": "Nhập tỉnh/ thành phố",
        "value": "",
        "role": "Master"
      }];
      DVHCVN.map((val, index) => {
        cities[index] = {
          "label": val.name,
          "value": val.name,
          "role": "Master"
        };
      })
      setDataTinh(cities)
    }
    new_city();
  }, [])

  // Update huyen 
  useEffect(() => {
    setDataXa([]);
    const new_district = () => {
      DVHCVN.map((val, index) => {
        if(val.name == tinh){
          let districts = [];
          val.level2s.map((val, index)=>{
                districts[index] = {
                  "label": val.name,
                  "value": val.name,
                  "role": "Master"
                };
          })
          setDataHuyen(districts)
        }
      })
    }
    new_district();
  }, [tinh])

  // Update Xa
  useEffect(() => {
    const new_wards = () => {
      DVHCVN.map((val, index) => {
        if(val.name == tinh){
          val.level2s.map((val, index)=>{
              if(val.name == huyen) {
                let wards = [];
                val.level3s.map((val, index) => {
                  wards[index] = {
                    "label": val,
                    "value": val,
                    "role": "Master"
                  };
                })
                setDataXa(wards)
              }
          })
        }
      })
    }
    new_wards();
  }, [huyen])

  const formRef = useRef();

  const model = Schema.Model({
    'text': Schema.Types.StringType().isRequired('Bạn chưa nhập tên của bạn.'),
    'tel': Schema.Types.StringType().isRequired('Bạn chưa nhập số điện thoại.'),
    'email': Schema.Types.StringType().isRequired('Bạn chưa nhập địa chỉ Email.'),
  });

  const HandleChangeCity = (value) => {
    setTinh(value);
  }

  const HandleChangeDistrict = (value) => {
    setHuyen(value);
  }  
  
  const HandleChangeWard = (value) => {
    setXa(value);
  }

  const handleUpdateUser = async () => {
    setLoading(true);

    let formData = new FormData();
    formData.append('user_login', user_login);
    formData.append('nonce', nonce_key);
    formData.append('firstname', formValue.firstname);
    formData.append('lastname', formValue.lastname);
    formData.append('birth', formValue.birth);
    formData.append('phone', formValue.phone);
    formData.append('email', formValue.email);
    formData.append('gender', gender);
    formData.append('billing_city', tinh);
    formData.append('billing_district', huyen);
    formData.append('billing_ward', xa);
    formData.append('billing_address', formValue.billing_address);

    const URL =  rootURL + 'user-infor/detail';
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    
    const response = await axios.post( URL, formData , config ).then((res) => {
      return res.data
    }).catch(function (error) {
      console.log(error);
    });

    if(response){
      setLoading(false);
      if(response.error){
        toaster.push(<Message showIcon type={'warning'}>{response.message}</Message>);
      } else {
        toaster.push(<Message showIcon type={'success'}>{response.message}</Message>);
      }
    }
    console.log(response)
  }


  return (
   <>
    <section className={styles.x_edit_profile_section}>
      <Container>
        <Row>
              <Col xs={24} md={!expanded ? 2 : 6}>
                  <div>
                      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
                          <Sidenav.Body>
                          <UserNav expanded={expanded}/>
                          <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                          </Sidenav.Body>
                      </Sidenav>
                  </div>
              </Col>
              <Col xs={24} md={!expanded ? 22 : 18}>
                <Row>
                  <Col md={16} xs={24}>
                    <Panel header="Chỉnh sửa tài khoản" bordered style={{background: 'white'}} className={'x_panel_account'}>
                      <Form
                          fluid
                          ref={formRef}
                          formValue={formValue}
                          onChange={setFormValue}
                          onSubmit={handleUpdateUser}
                          model={model}
                        >
                          <Row>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Nhập họ của bạn</Form.ControlLabel>
                                <Form.Control name="firstname" value={EventTarget.value} placeholder='Nhập họ của bạn...'/>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Nhập tên của bạn</Form.ControlLabel>
                                <Form.Control name="lastname" value={EventTarget.value} placeholder='Nhập tên của bạn...'/>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group controlId="radioList" className={styles.x_form_group}>
                              <Form.ControlLabel>Giới tính</Form.ControlLabel>
                                <RadioGroup name="gender" inline onChange={(e) => { setGender(e)} }>
                                  <Radio value="male">Nam</Radio>
                                  <Radio value="female">Nữ</Radio>
                                  <Radio value="orther">Khác</Radio>
                                </RadioGroup>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                  <Form.ControlLabel>Ngày sinh</Form.ControlLabel>
                                  <DatePicker name="birth" style={{width: '100%'}}/>
                                </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Số điện thoại</Form.ControlLabel>
                                <Form.Control name="phone" value={EventTarget.value} placeholder='Nhập số điện thoại...'/>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Địa chỉ Email</Form.ControlLabel>
                                <Form.Control name="email" value={EventTarget.value} placeholder='Nhập địa chỉ Email...'/>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Tỉnh/ Thành phố</Form.ControlLabel>
                                <SelectPicker 
                                  locale={locales.Picker} 
                                  style={{width: '100%'}} 
                                  name="billing_city" 
                                  data={dataTinh} 
                                  placeholder='Nhập thành phố...' 
                                  onChange={HandleChangeCity}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Quận/ Huyện</Form.ControlLabel>
                                <SelectPicker 
                                  locale={locales.Picker} 
                                  style={{width: '100%'}} 
                                  name="billing_district" 
                                  data={dataHuyen} 
                                  placeholder='Nhập quận/ Huyện...' 
                                  onChange={HandleChangeDistrict}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Quận/ Huyện</Form.ControlLabel>
                                <SelectPicker 
                                  locale={locales.Picker} 
                                  style={{width: '100%'}} 
                                  name="billing_ward" 
                                  data={dataXa} 
                                  placeholder='Nhập xã/ Phường/ Thị trấn...' 
                                  onChange={HandleChangeWard}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Địa chỉ chi tiết</Form.ControlLabel>
                                <Form.Control name="billing_address" value={EventTarget.value} placeholder='Nhập địa chỉ...'/>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className={styles.x_form_group}>
                              <Button type='submit' className={styles.x_update_button}>
                                {
                                  loading ? <Loader size={22}/> : <IoPaperPlane size={22}/>
                                }
                                Chỉnh sửa thông tin
                              </Button>
                          </Form.Group>
                      </Form>
                      </Panel>
                      <Divider />
                      <Panel header="thay đổi mật khẩu" bordered style={{background: 'white'}} className={'x_panel_account'}>
                        <Form
                            fluid
                          >
                            <Row>
                              <Col xs={24} md={12}>
                                  <Form.Group className={styles.x_form_group}>
                                    <Form.ControlLabel>Nhập mật khẩu mới</Form.ControlLabel>
                                    <Form.Control type="password" name="newpassword" value={EventTarget.value} placeholder='Nhập mật khẩu mới...'/>
                                  </Form.Group>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Group className={styles.x_form_group}>
                                    <Form.ControlLabel>Nhập lại mật khẩu mới</Form.ControlLabel>
                                    <Form.Control type="password" name="renewpassword" value={EventTarget.value} placeholder='Nhập lại mật khẩu mới...'/>
                                  </Form.Group>
                              </Col>
                            </Row>
                            <Form.Group className={styles.x_form_group}>
                                <Button type='submit' className={styles.x_change_password_button}>Đổi mật khẩu</Button>
                            </Form.Group>
                        </Form>
                      </Panel>
                  </Col>
                  <Col md={8} xs={24}>
                      <Panel header="Kết nối mạng xã hội" bordered style={{background: 'white'}} className={'x_panel_account'}>
                        <div className={styles.x_social_login}> 
                          <Button className={styles.x_facebook_login} onClick={() => signIn("facebook")} style={{width: '100%', marginBottom: '15px'}}>
                            <IoLogoFacebook size={24}/> Kết nối với facebook
                          </Button>
                          <Button className={styles.x_google_login} onClick={() => signIn("google")} style={{width: '100%'}}>
                            <IoLogoGoogle size={24}/> Kết nối với google
                          </Button>
                        </div>
                     </Panel>
                  </Col>
              </Row>
            </Col>
        </Row>
      </Container>
    </section>
  </>
  )
}

export default UserEditor

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';
  const URL =  rootURL + 'user-infor/detail';
  const config = {
    headers: {
      'Authorization':  `Bearer ${token}`
    }
  }

  const response = await axios.post( URL, false , config ).then((res) => {
    return res.data
  }).catch(function (error) {
  });
  // Pass data to the page via props
  return { props: { 
      nonce: response ? response.nonce : '',
      user_infor: response ? response.user.data : '',
  }}
}