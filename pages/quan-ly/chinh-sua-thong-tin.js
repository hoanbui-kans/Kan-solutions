import { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Schema, toaster, Message, SelectPicker, RadioGroup, Radio, DatePicker, Divider } from 'rsuite'
import { DVHCVN } from '../api/Dvhcvn'
import { locales } from '../api/locales'
import { signIn } from 'next-auth/react'
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import axios from 'axios'
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav'
import { getSession } from 'next-auth/react';
const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const UserEditor = ({token}) => {

  const[formValue, setFormValue] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    birth: '',
    phone: '',
    email: '',
    billing_city: '',
    billing_district: '',
    billing_ward: '',
    billing_address: ''
  })
  // Tinh
  const [dataTinh, setDataTinh] = useState([]);
  const [tinh, setTinh] = useState();
  // Huyen
  const [dataHuyen, setDataHuyen] = useState([]);
  const [huyen, setHuyen] = useState();
  // Xa
  const [dataXa, setDataXa] = useState([]);
  const [xa, setXa] = useState();

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
    const update_user_api = rootURL + 'update/user'
    let formData = new FormData();
    formData.append('firstname', formValue.firstname);
    formData.append('lastname', formValue.lastname);
    formData.append('gender', formValue.gender);
    formData.append('birth', formValue.birth);
    formData.append('phone', formValue.phone);
    formData.append('email', formValue.email);
    formData.append('billing_city', formValue.billing_city);
    formData.append('billing_district', formValue.billing_district);
    formData.append('billing_ward', formValue.billing_ward);
    formData.append('billing_address', formValue.billing_address);

    const config = {
      method: 'POST',
      url: 'https://kanbox.vn/wp-json/update/user',
      data : formData,
      headers: { 
        'Content-Type' : 'multipart/form-data; boundary=<calculated when request is sent>'
      }
    }
    const response = await axios(config).then((res) => {
      return res.data
    }).catch(function (error) {
      console.log(error);
    });
    console.log(response);
  }


  return (
   <>
       <div className={styles.x_app_header}>
        <Container>
            <Row>
                <Col xs={24}>
                    <UserNav />
                </Col>
            </Row>
        </Container>
    </div>
    <section className={styles.x_edit_profile_section}>
      <Container>
        <Row>
          <Col md={16} xs={24}>
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
                        <RadioGroup name="gender" inline>
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
                        <Form.Control name="lastname" value={EventTarget.value} placeholder='Nhập địa chỉ Email...'/>
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
                        <Form.Control name="address" value={EventTarget.value} placeholder='Nhập địa chỉ...'/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className={styles.x_form_group}>
                      <Button type='submit' color="blue">Chỉnh sửa thông tin</Button>
                  </Form.Group>
              </Form>
              <Divider />
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
                    <Button type='submit' color="blue">Đổi mật khẩu</Button>
                </Form.Group>
            </Form>
          </Col>
          <Col md={8} xs={24}>
            <p className={styles.x_social_title} style={{textAlign: 'left'}}>Kết nối với mạng xã hội</p>
            <div className={styles.x_social_login}> 
              <Button className={styles.x_facebook_login} onClick={() => signIn("facebook")} style={{width: '100%', marginBottom: '15px'}}>
                <IoLogoFacebook size={24}/> Kết nối với facebook
              </Button>
              <Button className={styles.x_google_login} onClick={() => signIn("google")} style={{width: '100%'}}>
                <IoLogoGoogle size={24}/> Kết nối với google
              </Button>
            </div>
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
  // Pass data to the page via props
  return { props: { 
      token: token
  }}
}