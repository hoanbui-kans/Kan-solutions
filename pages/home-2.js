import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, ButtonGroup } from 'rsuite';
import TypeAnimation from 'react-type-animation';
import styles from '../styles/HomePage2.module.css';
import Image from 'next/image';
import Link from 'next/link';
import aos from 'aos';
import { IoCheckmarkCircle, IoPersonCircle, IoCall, IoCheckmarkOutline } from "react-icons/io5";
import axios from 'axios';
import { GD_Box } from './giao-dien';
import "aos/dist/aos.css";

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const HomeTwo = ({gd}) => {
  const [posts, setPosts] = useState(gd);

  useEffect(() => {
    aos.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-out-sine',
      delay: 0,
      mirror: false
    });
  }, [])

  return (
   <>
    <section className={styles.x_hero_banner}>
        <Container className={styles.x_container}>
            <Row>
              <Col xs={24} md={12}>
                  <div className={styles.x_hero_banner_content}>
                      <h1 className={styles.x_hero_title} data-aos="fade-right">Giải pháp quản lý xây dựng <br />
                          <TypeAnimation
                            style={{display: 'block'}}
                            cursor={true}
                            sequence={[
                              'thương hiệu kinh doanh',
                              4000,
                              'cửa hàng trực tuyến',
                              4000,
                              'chiến lược tiếp thị',
                              4000,
                            ]}
                            className={styles.x_wrapper_text}
                            wrapper="span"
                            repeat={Infinity}
                          />
                      </h1>
                      <ul className={styles.x_hero_banner_feature}>
                            <li data-aos="fade-right"> <p><IoCheckmarkOutline size={16}/> Xây dựng kênh bán hàng chủ động, đầy đủ tính năng</p></li>
                            <li data-aos="fade-left"> <p><IoCheckmarkOutline size={16}/> Kênh tiếp thị đa dạng</p></li>
                            <li data-aos="fade-right"> <p><IoCheckmarkOutline size={16}/> Quản lý xuất nhập kho, chăm sóc khách hàng</p></li>
                            <li data-aos="fade-left"> <p><IoCheckmarkOutline size={16}/> Chủ động quản lý dòng tiền</p></li>
                      </ul>
                      <div className={styles.x_call_out_hero}>
                          <Button data-aos="fade-up" className={styles.x_focused_button}>
                                <IoPersonCircle size={22}/>  ĐĂNG KÝ MIỄN PHÍ
                          </Button>
                          <Button data-aos="fade-up" className={styles.x_nonFocused_button}>
                              <IoCall size={22}/>TƯ VẤN
                          </Button> 
                      </div>
                  </div>
              </Col>
              <Col xs={24} md={12}>
                    <div className={styles.x_banner_deccoration}>
                          <span data-aos="fade-left" className={styles.x_happy_business}>
                              <Image 
                                src="/home/hero-banner.webp" 
                                alt="Quản lý web bán hàng hiệu quả" 
                                width={413} 
                                height={402}
                                priority
                              />
                          </span>
                    </div>
              </Col>
            </Row>
        </Container>
    </section>
    <section className={styles.x_our_service}>
        <Container>
          <Row>
            <Col xs={24} md={8}>
                  <div className={styles.x_main_box}>
                      <h3 className={styles.x_main_box_secondary} data-aos="fade-down">DỊCH VỤ</h3>
                      <h2 className={styles.x_main_box_primary} data-aos="fade-up">Giải pháp hàng đầu</h2>
                      <p className={styles.x_main_box_description} data-aos="fade-left">Chúng tôi sẽ cung cấp những giải pháp xây dựng thương hiệu để giúp bạn kinh doanh thành công</p>
                      <span className={styles.x_vector} data-aos="fade-right">
                        <Image src={'/home/Vector.svg'} width={80} height={130} alt=""/>
                      </span>
                  </div>
            </Col>
            <Col xs={24} md={16}>
               <Row>
                  <Col xs={24} md={8}>
                      <div className={styles.x_secondary_box} data-aos="fade-down">
                          <span className={styles.x_secondary_box_icon}>
                            <Image src="/home/shop.svg" alt="Website bán hàng" width={40} height={40} />
                          </span>
                          <h2 className={styles.x_secondary_box_title}>Website bán hàng</h2>
                          <p className={styles.x_secondary_box_description}>Giải pháp bán hàng online với website tích hợp đầy đủ tính năng bán hàng mạnh mẽ</p>
                      </div>
                </Col>
                <Col xs={24} md={8}>
                      <div className={styles.x_secondary_box} data-aos="fade-up">
                          <span className={styles.x_secondary_box_icon}>
                            <Image src="/home/cards.svg" alt="Quản lý thanh toán" width={40} height={40} />
                          </span>
                          <h2 className={styles.x_secondary_box_title}>Quản lý thanh toán</h2>
                          <p className={styles.x_secondary_box_description}>Kết nối, quản lý thanh toán tự động, bảo mật cao phù hợp với thị trường Việt Nam</p>
                      </div>
                </Col>
                <Col xs={24} md={8}>
                      <div className={styles.x_secondary_box} data-aos="fade-down">
                          <span className={styles.x_secondary_box_icon}>
                            <Image src="/home/favorite-chart.svg" alt="Marketing online" width={40} height={40} />
                          </span>
                          <h2 className={styles.x_secondary_box_title}>Marketing online</h2>
                          <p className={styles.x_secondary_box_description}>Hỗ trợ mạnh mẽ liên kết mạng xã hội, quảng cáo sản phẩm của bạn nhanh chóng và hiệu quả</p>
                      </div>
                </Col>
              </Row>          
            </Col>
          </Row>
        </Container>
    </section>
    <section className={styles.x_features}>
          <Container>
              <Row>
                <Col xs={24} md={12}>
                  <Image src="/home/features.svg" width={500} height={400} alt=""/>
                </Col>
                <Col xs={24} md={12}>
                   <div className={styles.x_features_box}>
                      <h3 className={styles.x_main_box_secondary} data-aos="fade-down">TẠI SAO CHỌN CHÚNG TÔI</h3>
                      <h2 className={styles.x_main_box_primary} data-aos="fade-up">Chúng tôi mang lại cho bạn trải nghiệm tốt nhất</h2>
                      <ul className={styles.x_features_icon_list}>
                        <li data-aos="fade-left">
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Website với tính năng mạnh mẽ</p>
                        </li>
                        <li data-aos="fade-right">
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Quản lý dễ dàng</p>
                        </li>
                        <li data-aos="fade-left">
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Chi phí hợp lý</p>
                        </li>
                      </ul>
                      <Button data-aos="fade-up" className={styles.x_focused_button}>
                              ĐĂNG KÝ NGAY
                      </Button>
                    </div>         
                </Col>
              </Row>
          </Container>                  
    </section>
    <section className={styles.x_themes_section}>
        <Container>
          <Row>
            <Col xs={24}>
                  <div className={styles.x_themes_content}>
                    <h3 className={styles.x_main_box_secondary} data-aos="fade-down">GIAO DIỆN MẪU</h3>
                    <h2 className={styles.x_main_box_primary} data-aos="fade-up">50+ Mẫu giao diện</h2>
                  </div>
            </Col>
              {
                  posts.map((val) => {
                      return(
                        <Col xs={24} md={12} lg={8} key={val.ID} data-aos="fade-up">
                            <GD_Box data={val} price={false}/>
                        </Col>
                      )
                  })
              }
               <Col xs={24} md={12} lg={8}>
                   <div className={styles.x_themes_banner}>
                    <h3 className={styles.x_main_box_secondary} data-aos="fade-down">DÙNG THỬ MIỄN PHÍ</h3>
                    <h2 className={styles.x_main_box_primary} data-aos="fade-up">Xây dựng website miễn phí 3 tháng</h2>
                    <p className={styles.x_main_box_description} data-aos="fade-right">Đăng ký thành viên từ <strong className={styles.x_badge_theme}>2,5 triệu/ năm</strong></p>
                    <Button data-aos="fade-up" className={styles.x_focused_button} style={{marginTop: '15px'}}>
                        ĐĂNG KÝ NGAY
                    </Button>
                   </div>
                </Col>
          </Row>
        </Container>
    </section>
    </>
  )
}

export default HomeTwo

export async function getServerSideProps(context) {

  const res = await axios.get(rootURL + 'giao-dien/giao-dien-mau?perpage=5').then((resonse) => resonse.data);
  // Pass data to the page via props
  return { props: { 
    gd: res.posts
 }}
}