import { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Schema, toaster, Message, SelectPicker} from 'rsuite'
import { DVHCVN } from '../api/Dvhcvn'
import { locales } from '../api/locales'
import { signIn } from 'next-auth/react'
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import axios from 'axios'
import styles from '../../styles/account.module.css'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const UserEditor = ({data}) => {


  const[formValue, setFormValue] = useState({
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

  const handleUpdateUser = () => {
    console.log('update')
  }
  return (
   <>
    <section className={styles.x_edit_profile_section}>
      <Container>
        <Row>
          <Col md={18} xs={24}>
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
                      <Form.Group>
                        <Form.ControlLabel>Nhập họ của bạn</Form.ControlLabel>
                        <Form.Control name="firstname" value={EventTarget.value} placeholder='Nhập họ của bạn...'/>
                      </Form.Group>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Group>
                        <Form.ControlLabel>Nhập tên của bạn</Form.ControlLabel>
                        <Form.Control name="lastname" value={EventTarget.value} placeholder='Nhập tên của bạn...'/>
                      </Form.Group>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Group>
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
                      <Form.Group>
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
                      <Form.Group>
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
                  </Row>
                  <Form.Group>
                      <Button type='submit'>Chỉnh sửa thông tin</Button>
                  </Form.Group>
            </Form>
          </Col>
          <Col md={6} xs={24}>
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

export async function getServerSideProps() {

  const res = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=7').then((resonse) => resonse.data);

  // Pass data to the page via props
  return { props: { 
    bai_viet: res.posts,
    danh_muc: res.terms,
    max_num_pages: res.max_num_pages
 }}
}