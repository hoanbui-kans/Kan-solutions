import { useRef, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Schema, Loader, toaster, Message, SelectPicker, RadioGroup, Radio } from 'rsuite'
import Link from 'next/link'
import styles from '../../styles/account.module.css';
import Image from 'next/image';
import axios from 'axios'
import { IoHomeOutline } from "react-icons/io5";
import { locales } from '../api/locales'
import { getSession, useSession } from 'next-auth/react';
import { IoPaperPlane } from "react-icons/io5";
import { DVHCVN } from '../api/Dvhcvn'
import Router from 'next/router';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Login = ({user_info, nonce}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    firstname: user_info.firstname ? user_info.firstname : '',
    lastname: user_info.lastname ? user_info.lastname : '',
    phone: user_info.phone ? user_info.phone : '',
    email: user_info.email ? user_info.email : '',
    gender: user_info.gender ? user_info.gender : '',
    billing_city: user_info.billing_city ? user_info.billing_city : '',
    billing_district: user_info.billing_district ? user_info.billing_district : '',
    billing_ward: user_info.billing_ward ? user_info.billing_ward : '',
    billing_address: user_info.billing_address ? user_info.billing_address : '',
  });
  const nonce_key = nonce ? nonce : '';
  const user_login = user_info ? user_info.user_login : '';
  // Tinh
  const [dataTinh, setDataTinh] = useState([]);
  const [tinh, setTinh] = useState(formValue.billing_city);
  // Huyen
  const [dataHuyen, setDataHuyen] = useState([]);
  const [huyen, setHuyen] = useState(formValue.billing_district);
  // Xa
  const [dataXa, setDataXa] = useState([]);
  const [xa, setXa] = useState(formValue.billing_ward);

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
  }, [true])

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
    'firstname': Schema.Types.StringType().isRequired('Bạn chưa nhập họ của bạn.'),
    'lastname': Schema.Types.StringType().isRequired('Bạn chưa nhập tên của bạn.'),
    'phone': Schema.Types.StringType().isRequired('Bạn chưa nhập số điện thoại.'),
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

    if(!formRef.current.check()){
        return toaster.push(<Message showIcon type={'warning'}>Các trường thông tin chưa hợp lệ</Message>);
    }

    setLoading(true);
    let formData = new FormData();
    formData.append('user_login', user_login);
    formData.append('nonce', nonce_key);
    formData.append('firstname', formValue.firstname);
    formData.append('lastname', formValue.lastname);
    formData.append('phone', formValue.phone);
    formData.append('email', formValue.email);
    formData.append('gender', formValue.gender);
    formData.append('billing_city', tinh);
    formData.append('billing_district', huyen);
    formData.append('billing_ward', xa);
    formData.append('billing_address', formValue.billing_address);

    const URL =  rootURL + 'user-info/update';
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
        Router.push('/quan-ly');
      }
    }
  }

  return (
    <section className={styles.x_account_container}>
       <span className={styles.x_neumorphic}>
            <Image alt='layout' src={'/layout/decorations-01.svg'} width={800} height={800}/>
      </span>
      <Container className={styles.x_container}>
        <Row>
          <Col xs={24}>
            <div className={styles.x_login + ' ' + styles.x_user_fill_info}>
              <Link href = '/'>
                <a className={styles.x_back_home}>
                  <IoHomeOutline size={20}/>
                  Trở về trang chủ
                </a>
              </Link>

              <h1 className={styles.x_account_update_title}>Cập nhật thông tin của bạn trước khi bắt đầu</h1>
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
                        <Form.Control name="firstname" value={formValue.firstname} placeholder='Nhập họ của bạn...'/>
                      </Form.Group>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Group className={styles.x_form_group}>
                        <Form.ControlLabel>Nhập tên của bạn</Form.ControlLabel>
                        <Form.Control name="lastname" value={formValue.lastname} placeholder='Nhập tên của bạn...'/>
                      </Form.Group>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Group controlId="radioList" className={styles.x_form_group}>
                      <Form.ControlLabel>Giới tính</Form.ControlLabel>
                        <RadioGroup name="gender" inline value={formValue.gender} onChange={(e) => { setFormValue({...formValue, gender: e})} }>
                          <Radio value="male">Nam</Radio>
                          <Radio value="female">Nữ</Radio>
                          <Radio value="orther">Khác</Radio>
                        </RadioGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Group className={styles.x_form_group}>
                        <Form.ControlLabel>Số điện thoại</Form.ControlLabel>
                        <Form.Control name="phone" value={formValue.phone} placeholder='Nhập số điện thoại...'/>
                      </Form.Group>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Group className={styles.x_form_group}>
                        <Form.ControlLabel>Địa chỉ Email</Form.ControlLabel>
                        <Form.Control disabled name="email" value={formValue.email} placeholder='Nhập địa chỉ Email...'/>
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
                          defaultValue={formValue.billing_city}
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
                          defaultValue={formValue.billing_district}
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
                          defaultValue={formValue.billing_ward}
                          data={dataXa} 
                          placeholder='Nhập xã/ Phường/ Thị trấn...' 
                          onChange={HandleChangeWard}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={24}>
                      <Form.Group className={styles.x_form_group}>
                        <Form.ControlLabel>Địa chỉ chi tiết</Form.ControlLabel>
                        <Form.Control name="billing_address" value={formValue.billing_address} placeholder='Nhập địa chỉ...'/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className={styles.x_form_group}>
                      <Button type='submit' className={styles.x_update_button}>
                        {
                          loading ? <Loader size={16}/> : <IoPaperPlane size={16}/>
                        }
                        Cập nhật tài khoản
                      </Button>
                  </Form.Group>
              </Form>
              <p style={{margin: 0}}><small className={styles.x_privacy_description}>Thông tin tài khoản của bạn là bắt buộc, <Link href="/chinh-sach-bao-mat/">xem chính sách bảo mật</Link> của chúng tôi.</small></p>
              <p style={{margin: 0}}><small className={styles.x_privacy_description}>@ { new Date().getFullYear() } Kan Solution</small></p>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';
  const URL =  rootURL + 'user-info/detail';
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
      user_info: response ? response.user : '',
  }}
}