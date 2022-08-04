import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Divider, Modal  } from 'rsuite'
import styles from '../../styles/services/webdesign.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import { ServicesCreateWebsite } from '../api/HeaderSeo'
import { HostingTable } from '../api/services'
import { IoCheckmarkOutline, IoShapesSharp, IoCheckmarkCircle } from "react-icons/io5";
import { useState } from 'react'
import ServicesSubmitForm from '../../components/handleSubmitServices'
import { themesAPI } from '../api/HomeAPI'
import { GD_Box } from '../giao-dien'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper'; 
import aos from 'aos';

// import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "aos/dist/aos.css";

const CreateWordpress = () => {
 
 const [open, setOpen] = useState(false);  
 const [service, setService] = useState(''); 

 const handleOpen = (service) => {
    setService(service);
    setOpen(true)
 };

    useEffect(() => {
        aos.init({
        offset: 100,
        duration: 800,
        easing: 'ease-in-out-sine',
        delay: 0,
        mirror: false
        });
    }, [true]);

 const handleClose = () => setOpen(false);
  return (
    <>
    <Head>
        { HTMLReactParser(ServicesCreateWebsite.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
    </Head>
    <div className={styles.x_wordpress_section}>
        <section className={styles.x_banner}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_banner_content}>
                            <h3 
                            data-aos="fade-up"
                            className={styles.x_section_secondary_title}>Miễn phí xây dựng thương hiệu của bạn</h3>
                            <h1 
                            data-aos="fade-up"
                            className={styles.x_primary_title}>Tiếp cận các khách hàng tiềm năng của bạn trên internet</h1>
                            <p 
                            data-aos="fade-up"
                            style={{marginBottom: 25}}>Chúng tôi cung cấp cho bạn giải pháp xây dựng Website bán hàng nhanh chóng với đầy đủ tính năng nâng cao phù hợp với thị trường Việt Nam, giúp cửa hàng, hộ kinh doanh có thể tiếp làm quen với công nghệ web để tạo một kênh tiếp thị sản phẩm của mình đến khách hàng</p>
                            <Link href="/giao-dien">
                                <a>
                                    <Button data-aos="fade-up" className={styles.x_register_button}>DÙNG THỬ MIỄN PHÍ</Button>
                                </a>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_banner_image} data-aos="fade-left">
                            <Image alt="thiết kế website tự động" src={'/services-image/web-design-wordpress.webp'} width={742} height={557}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className={styles.x_page_builder}>
            <Container>
                <Row>
                    <Col xs={24} md={10}>
                        <div className={styles.x_builer_image} data-aos="fade-right">
                            <Image src={'/services-image/page-builder.webp'} height={482} width={716} alt="Pagebuild tạo website"/>
                        </div>
                    </Col>
                    <Col xs={24} md={14}>
                        <div className={styles.x_builer_content}>
                           <h3 data-aos="fade-up">Tạo website nhanh chóng</h3>
                           <h2 data-aos="fade-up">Website kéo thả dễ dàng</h2>
                           <p data-aos="fade-up">Chúng tôi mang đến cho bạn hệ thống tạo website với tính năng tạo trang kéo thả nhanh chóng và tối ưu nhất</p>
                            <div className={styles.x_features_page_builder}>
                                <Row>
                                    <Col xs={24} md={8}>
                                        <div 
                                        data-aos="fade-right"
                                        className={styles.x_features_page_builder_content}>
                                            <div className={styles.x_features_page_builder_icon}>
                                                <Image src={'/services-image/pieces.svg'} height={40} width={40} alt="" />
                                            </div>
                                            <div className={styles.x_features_page_builder_description}>
                                                <h3>Không giới hạn trang</h3>
                                                <p>Khả năng tích hợp tạo website, landing page, online Bio mạnh mẽ, không giới hạn</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <div 
                                        data-aos="fade-up"
                                        className={styles.x_features_page_builder_content}>
                                            <div className={styles.x_features_page_builder_icon}>
                                                <Image src={'/services-image/editor.svg'} height={40} width={40} alt="" />
                                            </div>
                                            <div className={styles.x_features_page_builder_description}>
                                                <h3>Cập nhật thường xuyên</h3>
                                                <p>Thường xuyên cập nhật, tích hợp nhiều module cho website của bạn</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={8}>
                                         <div 
                                         data-aos="fade-left"
                                         className={styles.x_features_page_builder_content}>
                                            <div className={styles.x_features_page_builder_icon}>
                                                <Image src={'/services-image/payment-builder.svg'} height={40} width={40} alt="" />
                                            </div>
                                            <div className={styles.x_features_page_builder_description}>
                                                <h3>Tối ưu chi phí</h3>
                                                <p>Giải pháp bán hàng online với website tích hợp đầy đủ tính năng giúp tối ưu tối đa chi phí</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className={styles.x_page_builder}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_builer_content}>
                            <h3 data-aos="fade-up">Bộ lọc sản phẩm đa dạng</h3>
                            <h2 data-aos="fade-up">Giao diện sản phẩm tối ưu đẹp mắt</h2>
                            <p data-aos="fade-up">Giao diện bán hàng đẹp mắt, chuyên nghiệp, phù hợp với thị hiếu mua hàng của người Việt Nam</p>
                            <ul className={styles.x_payment_list}>
                                <li data-aos="fade-up"><p>Hệ thống bộ lọc chi tiết theo nhóm hàng</p></li>
                                <li data-aos="fade-up"><p>Giao diện hiển thị chuyên nghiệp</p></li>
                                <li data-aos="fade-up"><p>Quản lý tồn kho đơn giản</p></li>
                            </ul>
                            <Link href="/dang-ky">
                                <a>
                                    <Button data-aos="fade-up" className={styles.x_register_button}>ĐĂNG KÝ MIỄN PHÍ</Button>
                                </a>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_builer_image} data-aos="fade-left">
                            <Image src={'/services-image/filter-products.webp'} height={484} width={835} alt="Pagebuild tạo website"/>
                        </div>
                    </Col>
                </Row>
          </Container>
        </section>

        <section className={styles.x_page_builder}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div 
                        data-aos="fade-right"
                        className={styles.x_builer_image}>
                            <Image src={'/services-image/payment.webp'} height={454} width={711} alt="Pagebuild tạo website"/>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_builer_content}>
                            <h3 data-aos="fade-up">Tối ưu vận chuyển, thanh toán</h3>
                            <h2 data-aos="fade-up">Thanh toán dễ dàng cho khách hàng của bạn</h2>
                            <p data-aos="fade-up">Chúng tôi mang đến cho bạn hệ thống tạo website với tính năng tạo trang kéo thả nhanh chóng và tối ưu nhất</p>
                            <ul className={styles.x_payment_list}>
                                <li data-aos="fade-up"><p>Hệ thống tự tính toán giá giao hàng theo tùy chỉnh</p></li>
                                <li data-aos="fade-up"><p>Thanh toán online nhanh chóng qua đối tác</p></li>
                                <li data-aos="fade-up"><p>Quản lý đơn hàng dễ dàng</p></li>
                            </ul>
                            <Link href="/dang-ky">
                                <a>
                                    <Button 
                                        data-aos="fade-up"
                                        className={styles.x_register_button}>ĐĂNG KÝ MIỄN PHÍ
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    </Col>
                </Row>
          </Container>
        </section>

        <section className={styles.x_page_builder}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_builer_content}>
                            <h3 data-aos="fade-up">Tối ưu tốc độ</h3>
                            <h2 data-aos="fade-up">Tối ưu tốc độ tự động</h2>
                            <p data-aos="fade-up">Trang web được tối ưu tốc độ tự động trên hệ thống của Kanbox mà không cầ sử dụng cache dữ liệu, thuận tiện sử dụng cho người dùng</p>
                            <ul className={styles.x_payment_list}>
                                <li data-aos="fade-up"><p>Code được nén tự động</p></li>
                                <li data-aos="fade-up"><p>Hình ảnh tự động nén với khung hình và định dạng</p></li>
                                <li data-aos="fade-up"><p>Tiết kiệm tối đa thời gian tải trang, chuẩn seo</p></li>
                            </ul>
                            <Link href="/dang-ky">
                                <a>
                                    <Button data-aos="fade-up" className={styles.x_register_button}>ĐĂNG KÝ MIỄN PHÍ</Button>
                                </a>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div 
                            className={styles.x_builer_image} 
                            data-aos="fade-left">
                            <Image src={'/services-image/page-speed.webp'} height={513} width={723} alt="Pagebuild tạo website"/>
                        </div>
                    </Col>
                </Row>
          </Container>
        </section>

        <section className={styles.x_hosting_section}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24}>
                        <div className={styles.x_hosting_title}>
                            <h3 data-aos="fade-up" className={styles.x_section_secondary_title}>Gói dịch vụ</h3>
                            <h2 data-aos="fade-up" className={styles.x_primary_title}>Dành cho thành viên</h2>
                        </div>
                        <div className={styles.x_hosting_table_container}>
                            <Row>
                                 {
                                    HostingTable.map((val, index) => {
                                        return(
                                            <Col xs={24} md={12} lg={8} key={index}>
                                                <div className={styles.x_hosting} data-aos="fade-up">
                                                    <div className={styles.x_hosting_header}>
                                                        <h3>{val.name}</h3>
                                                        <p>{val.price} /Tháng</p>
                                                        <Button className={styles.x_hosting_button} onClick={() => { handleOpen('Dịch vụ hosting ' + val.name) }}>Đăng ký</Button>
                                                    </div>
                                                    <div className={styles.x_hosting_features}>
                                                        <ul>
                                                            {
                                                                val.checklist.map((val, index) => {
                                                                    return( 
                                                                        <li key={index}>
                                                                            <span className={styles.x_hosting_check}>
                                                                                <IoCheckmarkOutline color='white'/>
                                                                            </span>
                                                                            {val}
                                                                        </li>
                                                                    )
                                                                })    
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    })
                                 }       
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <section className={styles.x_services_container}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24}>
                        <div className={styles.x_hosting_title} >
                            <h3 className={styles.x_section_secondary_title} data-aos="fade-up">Mẫu website đa dạng ngành nghề</h3>
                            <h2 className={styles.x_primary_title} data-aos="fade-up">Giao diện chuẩn - đa dạng - đầy đủ tính năng</h2>
                        </div>
                        <div 
                        data-aos="fade-up"
                        className={styles.x_hosting_table_container}>
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
                                modules={[Navigation, Pagination]}
                                className="layoutSwiper"
                                >
                                {
                                themesAPI.map((val) => {
                                    return(
                                        <SwiperSlide key={val.ID}>
                                            <GD_Box data={val} price={true}/>
                                        </SwiperSlide>
                                    )
                                    })
                                }
                            </Swiper>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <section className={styles.x_services_container}>
            <Container>
                <Row>
                    <Col xs={24}>
                        <div className={styles.x_supporter}>
                            <h3 
                            data-aos="fade-up"
                            className={styles.x_section_secondary_title}>Lựa chọn dịch vụ</h3>
                            <h2 
                            data-aos="fade-up"
                            className={styles.x_primary_title}>Xây dựng thương hiệu riêng cho bạn</h2>
                            <div className={styles.services}>
                                <Row>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div 
                                        data-aos="fade-right"
                                        className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image alt="Website Landing Page" src={'/icons/landing-page.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Landing Page</h3>
                                            <h2 className={styles.x_services_content_main_title}>Xây dựng kênh quảng bá sản phẩm nhanh</h2>
                                            <Button 
                                            className={styles.x_services_button}
                                            onClick={() => { handleOpen('Đăng ký dịch vụ thiết kế Website Landing Page') }}>
                                                Đăng ký tư vấn
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div 
                                        data-aos="fade-up"
                                        className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image alt="Website Doanh Nghiệp" src={'/icons/content.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Doanh Nghiệp</h3>
                                            <h2 className={styles.x_services_content_main_title}>Xây dựng thương hiệu doanh nghiệp</h2>
                                            <Button 
                                                className={styles.x_services_button}
                                                onClick={() => { handleOpen('Đăng ký dịch vụ thiết kế Website Doanh nghiệp') }}>
                                                Đăng ký tư vấn
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div 
                                        data-aos="fade-left"
                                        className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image alt="Website Thương Mại" src={'/icons/laptop.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Thương Mại</h3>
                                            <h2 className={styles.x_services_content_main_title}>Mở rộng quy mô phân phối sản phẩm</h2>
                                            <Button 
                                                className={styles.x_services_button}
                                                onClick={() => { handleOpen('Đăng ký dịch vụ thiết kế Website Thương Mại') }}>
                                                Đăng ký tư vấn
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </div>
    <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Đăng ký dịch vụ thiết kế Website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CreateWordpress