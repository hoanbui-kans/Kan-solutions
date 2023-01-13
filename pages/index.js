import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, Rate, Divider } from 'rsuite';
import styles from '../styles/home.module.css';
import Image from 'next/image';
import 
{ 
  IoCheckmarkCircle,
  IoBrowsersOutline,
  IoCall,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { GD_Box } from './giao-dien';
import { Navigation, Pagination, EffectFade } from 'swiper';
import { BlogStyleTwo } from '../components/blog-templates/BlogContent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Testionimal } from './api/services';
import { FormLienHe } from './lien-he';
import Link from 'next/link';

// import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeTwo = () => {
  const [open, setOpen] = useState(false);  
  const [service, setService] = useState(''); 
 
  const handleOpen = (service) => {
     setService(service);
     setOpen(true)
  };

  return (
   <>
    <section className={styles.x_hero_banner}>
        <Container className={styles.x_container}>
            <Row>
              <Col xs={24} md={12}>
                  <div className={styles.x_hero_banner_content}>
                      <h1 className={styles.x_hero_title}>
                        Giải pháp quản lý xây dựng website cá nhâ<nav></nav>
                      </h1>
                      <ul className={styles.x_hero_banner_feature}>
                            <li> <p><IoCheckmarkCircleSharp color={'#2ecc71'} size={16}/> Xây dựng kênh bán hàng chủ động, đầy đủ tính năng</p></li>
                            <li> <p><IoCheckmarkCircleSharp color={'#2ecc71'} size={16}/> Đa dạng hóa kênh tiếp thị của bạn</p></li>
                            <li> <p><IoCheckmarkCircleSharp color={'#2ecc71'} size={16}/> Quản lý xuất nhập kho, chăm sóc khách hàng</p></li>
                            <li> <p><IoCheckmarkCircleSharp color={'#2ecc71'} size={16}/> Chủ động quản lý dòng tiền</p></li>
                      </ul>
                      <div className={styles.x_call_out_hero}>
                          <Link legacyBehavior href="/dich-vu/tao-website-lading-page-tu-dong">
                            <a>
                              <Button className={styles.x_focused_button}>
                                  <IoBrowsersOutline size={22}/> TẠO WEBSITE MIỄN PHÍ
                              </Button>
                            </a>
                          </Link>
                          <Button 
                            onClick={() => { handleOpen('Đăng ký thiết kế website - Trang chủ') }}
                            className={styles.x_nonFocused_button}>
                              <IoCall size={22}/>TƯ VẤN
                          </Button> 
                      </div>
                  </div>
              </Col>
              <Col xs={24} md={12}>
                    <div className={styles.x_banner_deccoration}>
                          <span className={styles.x_happy_business}>
                              <Image 
                                src="/design.svg" 
                                alt="Quản lý web bán hàng hiệu quả" 
                                width={575} 
                                height={391}
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
                      <h3 className={styles.x_main_box_secondary}>DỊCH VỤ</h3>
                      <h2 className={styles.x_main_box_primary}>Giải pháp hàng đầu</h2>
                      <p className={styles.x_main_box_description}>Chúng tôi sẽ cung cấp những giải pháp xây dựng Website thương hiệu để giúp bạn kinh doanh thành công trên nhiều lĩnh vực</p>
                      <span className={styles.x_vector}>
                        <Image  placeholder='blurDataURL' src={'/home/Vector.svg'} width={80} height={130} alt=""/>
                      </span>
                  </div>
            </Col>
            <Col xs={24} md={16}>
               <Row>
                  <Col xs={24} md={8}>
                      <div className={styles.x_secondary_box}>
                          <span className={styles.x_secondary_box_icon}>
                            <Image placeholder='blurDataURL' src="/home/shop.svg" alt="Website bán hàng" width={40} height={40} />
                          </span>
                          <h2 className={styles.x_secondary_box_title}>Website miễn phí</h2>
                          <p className={styles.x_secondary_box_description}>Giải pháp bán hàng online với website miễn phí tích hợp đầy đủ tính năng bán hàng mạnh mẽ</p>
                      </div>
                </Col>
                <Col xs={24} md={8}>
                      <div className={styles.x_secondary_box}>
                          <span className={styles.x_secondary_box_icon}>
                            <Image placeholder='blurDataURL' src="/home/cards.svg" alt="Quản lý thanh toán" width={40} height={40} />
                          </span>
                          <h2 className={styles.x_secondary_box_title}>Quản lý thanh toán</h2>
                          <p className={styles.x_secondary_box_description}>Kết nối, quản lý thanh toán tự động, vận chuyển bảo mật cao phù hợp với thị trường Việt Nam</p>
                      </div>
                </Col>
                <Col xs={24} md={8}>
                      <div className={styles.x_secondary_box}>
                          <span className={styles.x_secondary_box_icon}>
                            <Image placeholder='blurDataURL' src="/home/favorite-chart.svg" alt="Marketing online" width={40} height={40} />
                          </span>
                          <h2 className={styles.x_secondary_box_title}>Marketing online</h2>
                          <p className={styles.x_secondary_box_description}>Hỗ trợ mạnh mẽ liên kết mạng xã hội, quảng cáo sản phẩm, quản lý kho hàng hiệu quả</p>
                      </div>
                </Col>
              </Row>          
            </Col>
          </Row>
        </Container>
    </section>
    <section className={styles.x_features}>
          <Container>
              <Row className="x_flex_center">
                <Col xs={24} md={12}>
                  <div className={styles.x_features_image}>
                    <Image placeholder='blurDataURL' src="/home/features.svg" width={500} height={400} alt=""/>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                   <div className={styles.x_features_box}>
                      <h3 className={styles.x_main_box_secondary}>TẠI SAO CHỌN CHÚNG TÔI</h3>
                      <h2 className={styles.x_main_box_primary}>Chúng tôi mang lại cho bạn trải nghiệm tốt nhất và hoàn toàn miễn phí</h2>
                      <ul className={styles.x_features_icon_list}>
                        <li>
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Website với nhiều tính năng, tốc độ mạnh mẽ</p>
                        </li>
                        <li>
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Quản lý dễ dàng, xây dựng nội dung tùy biến theo nhiều chủ đề</p>
                        </li>
                        <li>
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Chi phí hợp lý, đạt hiệu quả ngay lần đầu sử dụng tiết kiệm thời gian</p>
                        </li>
                        <li>
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Di chuyển, nâng cấp, tạo website riêng nhanh chóng</p>
                        </li>
                        <li>
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Giải pháp xây dựng thương hiệu riêng dành cho doanh nghiệp</p>
                        </li>
                        <li>
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Cộng đồng sử dụng rộng lớn</p>
                        </li>
                      </ul>
                      <Link legacyBehavior href="/dang-ky">
                            <a>
                              <Button className={styles.x_focused_button} style={{marginTop: '15px', marginRight: '15px'}}>
                                  ĐĂNG KÝ NGAY
                              </Button>
                            </a>
                      </Link>
                      <a href="tel:0392193639">
                        <Button className={styles.x_ViewAll_button} style={{marginTop: '15px', marginRight: '0px'}}>
                           TƯ VẤN DOANH NGHIỆP
                        </Button>
                      </a>
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
                    <h3 className={styles.x_main_box_secondary}>GIAO DIỆN MẪU</h3>
                    <h2 className={styles.x_main_box_primary}>250+ Mẫu giao diện bán hàng tiêu chuẩn</h2>
                    <p>Mẫu giao diện bán hàng miễn phí đầy đủ chức năng cập nhật thường xuyên</p>
                  </div>
            </Col>
               <Col xs={24} md={12} lg={8}>
                   <div className={styles.x_themes_banner}>
                      <div className={styles.x_themes_banner_content}>
                        <h2 className={styles.x_main_box_primary}>Xây dựng website bán hàng đầy đủ chức năng</h2>
                        <Link legacyBehavior href="/dang-ky">
                            <a>
                              <Button className={styles.x_focused_button} style={{marginTop: '15px', marginRight: '0px'}}>
                                  ĐĂNG KÝ NGAY
                              </Button>
                            </a>
                        </Link>
                      </div>
                   </div>
                </Col>
                <Col xs={24}>
                    <Link legacyBehavior href="/giao-dien">
                          <a style={{textAlign: 'center', display: 'block'}}>
                            <Button className={styles.x_ViewAll_button} style={{marginBottom: '15px', marginTop: '5px', marginRight: '0px'}}>
                                XEM TẤT CẢ
                            </Button>
                          </a>
                    </Link>
                </Col>
          </Row>
        </Container>
    </section>
    <Divider />
    <section className={styles.x_themes_section}>
        <Container>
          <Row>
            <Col xs={24}>
                  <div className={styles.x_themes_content}>
                    <h3 className={styles.x_main_box_secondary}>Bio link kênh bán hàng</h3>
                    <h2 className={styles.x_main_box_primary}>150+ Mẫu bán hàng dành cho cá nhân - KOL</h2>
                    <p>Tạo Bio website bán hàng miễn phí cho KOL, fanpage facebook, Instagram,...</p>
                  </div>
            </Col>
              <Col xs={24}>
                  <Link legacyBehavior href="/giao-dien">
                        <a style={{textAlign: 'center', display: 'block'}}>
                          <Button className={styles.x_ViewAll_button} style={{marginBottom: '15px', marginTop: '5px', marginRight: '0px'}}>
                              XEM TẤT CẢ
                          </Button>
                        </a>
                  </Link>
              </Col>
          </Row>
        </Container>
    </section>
    <section className={styles.x_testionimal}>
      <Container>
          <Row>
              <Col xs={24}>
                <div className={styles.x_themes_testionimal}>
                  <h3 className={styles.x_main_box_secondary}>TESTIMONIAL</h3>
                  <h2 className={styles.x_main_box_primary}>Nhận xét từ khách hàng</h2>
                </div>
              </Col>
              <Swiper
                spaceBetween={30}
                effect={"fade"}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper"
              
              >
                {
                  Testionimal.map((val, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className={styles.x_testionimal_container}>
                            <Row className={'x_flex_center'}>
                              <Col xs={24} md={12}>
                              <div className={styles.x_mockup}>
                                <div className={styles.x_testionimal_thumbnail}>
                                    <Image placeholder='blurDataURL' src={val.image} alt={val.title} width={554} height={346} />
                                </div>
                              </div>
                              </Col>
                              <Col xs={24} md={12}>
                                <div className={styles.x_testionimal_content}>
                                    <span className={styles.x_qoute}>
                                        <Image placeholder='blurDataURL' src='/home/qoute.svg' width={34} height={34} alt=""/>
                                      </span>
                                    <Rate readOnly size="xs" defaultValue={val.rating} allowHalf />
                                    <h3 className={styles.x_testionimal_title}>{val.title}</h3>
                                    <p className={styles.x_testionimal_description}>{val.content}</p>
                                </div>
                              </Col>
                            </Row>
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
          </Row>
      </Container>
    </section>
    <section className={styles.x_partner}>
        <Container>
          <Row>
            <Col xs={24}>
            <Swiper
                  spaceBetween={30}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    552: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    992: {
                      slidesPerView: 4,
                    },
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                
                >
                   <SwiperSlide>
                      <div className={styles.x_partner_content}>
                        <div className={styles.x_partner_icon}>
                          <Image 
              placeholder='blurDataURL' src="/home/WordPress.svg" width={200} height={80} alt="wordpress"/>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={styles.x_partner_content}>
                          <div className={styles.x_partner_icon}>
                              <Image 
                                placeholder='blurDataURL' 
                                src="/home/wpmu-dev.svg" 
                                width={200} height={80} 
                                alt="wpmu dev"/>
                          </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={styles.x_partner_content}>
                        <div className={styles.x_partner_icon}>
                          <Image 
                              placeholder='blurDataURL' 
                              src="/home/woocommerce.svg" 
                              width={200} height={80} alt="wordpress"/>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={styles.x_partner_content}>
                        <div className={styles.x_partner_icon}>
                          <Image 
                            placeholder='blurDataURL' 
                            src="/home/onepay.svg" width={160} height={80} alt="onepay"/>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className={styles.x_partner_content}>
                        <div className={styles.x_partner_icon}>
                          <Image 
                              placeholder='blurDataURL' 
                              src="/home/momo.svg" width={80} height={80} alt="momo"/>
                        </div>
                      </div>
                    </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
        </Container>
    </section>
    <section className={styles.x_form_contact_section}>
      <Container>
          <Row>
              <Col xs={24} md={12}>
                  <div>
                    <Image placeholder='blurDataURL' src="/home/form.webp" width={800} height={860} alt="Liên hệ Kanbox"/>
                  </div>
              </Col>
              <Col xs={24} md={12}>
                <div className={styles.x_themes_testionimal}>
                  <h3 className={styles.x_main_box_secondary}>LIÊN HỆ CHÚNG TÔI</h3>
                  <h2 className={styles.x_main_box_primary}>Giúp chúng tôi cải thiện chất lượng dịch vụ</h2>
                  <p>Chúng tôi dành phần lớn thời gian để chăm sóc khách hàng và cải thiện dịch vụ</p>
                </div>
                <div className={styles.x_form_contact}>
                  <FormLienHe />
                </div>
              </Col>
          </Row>
      </Container>
    </section>
    <Divider />
    <section className={styles.x_blog_home}>
      <Container>
          <Row>
              <Col xs={24}>
                <div className={styles.x_blog_home_content}>
                  <h3 className={styles.x_main_box_secondary}>TIN TỨC MỚI</h3>
                  <h2 className={styles.x_main_box_primary}>Blog Kan Solution</h2>
                </div>
                <div className={styles.x_form_contact}>
                <Swiper
                  spaceBetween={30}
                  navigation={true}
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    552: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                  }}
                  modules={[EffectFade, Navigation]}
                  className="postsSwiper"
                
                >
                  {/* {
                    PostsAPI.map((val, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <BlogStyleTwo data={val}/>
                        </SwiperSlide>
                      )
                    })
                  } */}
                </Swiper>
                </div>
                <Col xs={24}>
                    <Link legacyBehavior href="/bai-viet">
                          <a style={{textAlign: 'center', display: 'block'}}>
                            <Button className={styles.x_ViewAll_button} style={{marginTop: '15px', marginRight: '0px'}}>
                                XEM TẤT CẢ
                            </Button>
                          </a>
                    </Link>
                </Col>
              </Col>
          </Row>
      </Container>
    </section>
      {/* <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Đăng ký dịch vụ thiết kế Website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
      <Modal open={open_ads} onClose={handleClose_ads} overflow={false} backdrop="static" size={'sm'} className="ads_tiktok">
        <Modal.Body style={{padding: 0}}>
            <Button className="close_ads" onClick={handleClose_ads}><IoCloseOutline color={'#fff'} size={22}/></Button>
            <Link href="/dang-ky">
                  <a style={{paddingTop: '100%', display: 'block'}}></a>
            </Link>
        </Modal.Body>
      </Modal> */}
    </>
  )
}

export default HomeTwo