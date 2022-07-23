import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, Rate, Divider } from 'rsuite';
import TypeAnimation from 'react-type-animation';
import styles from '../styles/HomePage2.module.css';
import Image from 'next/image';
import aos from 'aos';
import { IoCheckmarkCircle, IoPersonCircle, IoCall, IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import { GD_Box } from './giao-dien';
import { Navigation, Pagination, EffectFade } from 'swiper';
import { BlogStyleTwo } from '../components/blog-templates/BlogContent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Testionimal } from './api/services';
import { FormLienHe } from './lien-he';
import Link from 'next/link';
import { HomePageSeo } from './api/HeaderSeo'
import HTMLReactParser from 'html-react-parser'
import ServicesSubmitForm from '../components/handleSubmitServices'
import Head from 'next/head';
import { themesAPI, PostsAPI} from './api/HomeAPI';
// import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "aos/dist/aos.css";

const HomeTwo = () => {
  const [open, setOpen] = useState(false);  
  const [open_ads, setOpen_ads] = useState(false);  
  const [service, setService] = useState(''); 
 
  const handleOpen = (service) => {
     setService(service);
     setOpen(true)
  };

 const handleClose = () => setOpen(false);
 const handleClose_ads = () => setOpen_ads(false);

  useEffect(() => {
    aos.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-out-sine',
      delay: 0,
      mirror: false
    });
    setTimeout(() => {
      setOpen_ads(true);
    } , 3000)
  }, [true])

  return (
   <>
    <Head>
      { HTMLReactParser(HomePageSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
    </Head>
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
                              ' cửa hàng trực tuyến',
                              4000,
                              ' chiến lược tiếp thị',
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
                          <Link href="/dang-ky">
                            <a>
                              <Button data-aos="fade-up" className={styles.x_focused_button}>
                                  <IoPersonCircle size={22}/>  ĐĂNG KÝ MIỄN PHÍ
                              </Button>
                            </a>
                          </Link>
                          <Button 
                          data-aos="fade-up" 
                          onClick={() => { handleOpen('Đăng ký thiết kế website - Trang chủ') }}
                          className={styles.x_nonFocused_button}>
                              <IoCall size={22}/>TƯ VẤN
                          </Button> 
                      </div>
                  </div>
              </Col>
              <Col xs={24} md={12}>
                    <div className={styles.x_banner_deccoration}>
                          <span data-aos="fade-left" className={styles.x_happy_business}>
                              <Image 
                                src="/home/hero-banner-2.webp" 
                                alt="Quản lý web bán hàng hiệu quả" 
                                width={415} 
                                height={436}
                              />
                          </span>
                    </div>
              </Col>
            </Row>
        </Container>
    </section>
    <section className={styles.x_partner}>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <div className={styles.x_partner_content} data-aos="fade-left">
                    <div className={styles.x_partner_icon}>
                       <Image src="/home/WordPress.svg" width={200} height={80} alt="wordpress"/>
                    </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className={styles.x_partner_content} data-aos="fade-up">
                    <div className={styles.x_partner_icon}>
                       <Image src="/home/wpmu-dev.svg" width={200} height={80} alt="wpmu dev"/>
                    </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className={styles.x_partner_content} data-aos="fade-down">
                    <div className={styles.x_partner_icon}>
                       <Image src="/home/woocommerce.svg" width={200} height={80} alt="wordpress"/>
                    </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className={styles.x_partner_content} data-aos="fade-right">
                    <div className={styles.x_partner_icon}>
                       <Image src="/home/onepay.svg" width={160} height={80} alt="onepay"/>
                    </div>
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
                      <p className={styles.x_main_box_description} data-aos="fade-left">Chúng tôi sẽ cung cấp những giải pháp xây dựng Website thương hiệu để giúp bạn kinh doanh thành công trên nhiều lĩnh vực</p>
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
                          <p className={styles.x_secondary_box_description}>Kết nối, quản lý thanh toán tự động, vận chuyển bảo mật cao phù hợp với thị trường Việt Nam</p>
                      </div>
                </Col>
                <Col xs={24} md={8}>
                      <div className={styles.x_secondary_box} data-aos="fade-down">
                          <span className={styles.x_secondary_box_icon}>
                            <Image src="/home/favorite-chart.svg" alt="Marketing online" width={40} height={40} />
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
                    <Image src="/home/features.svg" data-aos="fade-down" width={500} height={400} alt=""/>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                   <div className={styles.x_features_box}>
                      <h3 className={styles.x_main_box_secondary} data-aos="fade-down">TẠI SAO CHỌN CHÚNG TÔI</h3>
                      <h2 className={styles.x_main_box_primary} data-aos="fade-up">Chúng tôi mang lại cho bạn trải nghiệm tốt nhất</h2>
                      <ul className={styles.x_features_icon_list}>
                        <li data-aos="fade-left">
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Website với nhiều tính năng, tốc độ mạnh mẽ</p>
                        </li>
                        <li data-aos="fade-right">
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Quản lý dễ dàng, xây dựng nội dung tùy biến theo nhiều chủ đề</p>
                        </li>
                        <li data-aos="fade-left">
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Chi phí hợp lý, đạt hiệu quả ngay lần đầu sử dụng tiết kiệm thời gian</p>
                        </li>
                        <li data-aos="fade-left">
                            <p><IoCheckmarkCircle color="#2ecc71" size={22}/>Di chuyển, nâng cấp, tạo website riêng nhanh chóng</p>
                        </li>
                      </ul>
                      <Link href="/dang-ky">
                            <a>
                              <Button data-aos="fade-up" className={styles.x_focused_button} style={{marginTop: '15px', marginRight: '0px'}}>
                                  ĐĂNG KÝ NGAY
                              </Button>
                            </a>
                      </Link>
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
                    <h2 className={styles.x_main_box_primary} data-aos="fade-up">250+ Mẫu giao diện</h2>
                  </div>
            </Col>
              {
                  themesAPI.map((val) => {
                      return(
                        <Col xs={24} md={12} lg={8} key={val.ID} data-aos="fade-up">
                            <GD_Box data={val} price={false}/>
                        </Col>
                      )
                  })
              }
               <Col xs={24} md={12} lg={8}>
                   <div className={styles.x_themes_banner}>
                      <div className={styles.x_themes_banner_content}>
                        <h3 className={styles.x_main_box_secondary} data-aos="fade-down">DÙNG THỬ MIỄN PHÍ</h3>
                        <h2 className={styles.x_main_box_primary} data-aos="fade-up">Xây dựng website miễn phí 3 tháng</h2>
                        <Link href="/dang-ky">
                            <a>
                              <Button data-aos="fade-up" className={styles.x_focused_button} style={{marginTop: '15px', marginRight: '0px'}}>
                                  ĐĂNG KÝ NGAY
                              </Button>
                            </a>
                        </Link>
                      </div>
                   </div>
                </Col>
                <Col xs={24}>
                    <Link href="/bai-viet">
                          <a style={{textAlign: 'center', display: 'block'}}>
                            <Button data-aos="fade-up" className={styles.x_ViewAll_button} style={{marginBottom: '15px', marginTop: '5px', marginRight: '0px'}}>
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
                  <h3 className={styles.x_main_box_secondary} data-aos="fade-down">TESTIMONIAL</h3>
                  <h2 className={styles.x_main_box_primary} data-aos="fade-left">Nhận xét từ khách hàng</h2>
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
                data-aos="fade-up"
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
                                    <Image src={val.image} alt={val.title} width={554} height={346} />
                                </div>
                              </div>
                              </Col>
                              <Col xs={24} md={12}>
                                <div className={styles.x_testionimal_content}>
                                    <span className={styles.x_qoute}>
                                        <Image src='/home/qoute.svg' width={34} height={34} alt=""/>
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
    <section className={styles.x_form_contact_section}>
      <Container>
          <Row>
              <Col xs={24} md={12}>
                  <div data-aos="fade-left">
                    <Image src="/home/form.webp" width={800} height={860} alt="Liên hệ Kanbox"/>
                  </div>
              </Col>
              <Col xs={24} md={12}>
                <div className={styles.x_themes_testionimal}>
                  <h3 className={styles.x_main_box_secondary} data-aos="fade-down">LIÊN HỆ CHÚNG TÔI</h3>
                  <h2 className={styles.x_main_box_primary} data-aos="fade-up">Giúp chúng tôi cải thiện chất lượng dịch vụ</h2>
                </div>
                <div className={styles.x_form_contact} data-aos="fade-right">
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
                  <h3 className={styles.x_main_box_secondary} data-aos="fade-down">TIN TỨC MỚI</h3>
                  <h2 className={styles.x_main_box_primary} data-aos="fade-up">Blog Kan Solution</h2>
                </div>
                <div className={styles.x_form_contact} data-aos="fade-right">
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
                  data-aos="fade-up"
                >
                  {
                    PostsAPI.map((val, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <BlogStyleTwo data={val}/>
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
                </div>
                <Col xs={24}>
                    <Link href="/bai-viet">
                          <a style={{textAlign: 'center', display: 'block'}}>
                            <Button data-aos="fade-up" className={styles.x_ViewAll_button} style={{marginTop: '15px', marginRight: '0px'}}>
                                XEM TẤT CẢ
                            </Button>
                          </a>
                    </Link>
                </Col>
              </Col>
          </Row>
      </Container>
    </section>
      <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Đăng ký dịch vụ thiết kế Website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
      <Modal open={open_ads} onClose={handleClose_ads} overflow={false} backdrop="static" size={'sm'} className="ads_tiktok">
        <Modal.Body>
            <Button className="close_ads" onClick={handleClose_ads}><IoCloseOutline color={'#fff'} size={22}/></Button>
            <Link href="/dang-ky">
                  <a style={{paddingTop: '100%', display: 'block'}}></a>
            </Link>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default HomeTwo