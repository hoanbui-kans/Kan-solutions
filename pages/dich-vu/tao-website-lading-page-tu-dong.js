import { Container, Row, Col, Button, Divider, Modal  } from 'rsuite'
import styles from '../../styles/services/webdesign.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import { ServicesCreateWebsite } from '../api/HeaderSeo'
import { HostingTable } from '../api/services'
import { IoCheckmarkOutline, IoShapesSharp } from "react-icons/io5";
import { useState } from 'react'
import ServicesSubmitForm from '../../components/handleSubmitServices'
import Carousel from "react-multi-carousel";
import axios from 'axios'
import { GD_Box } from '../giao-dien'
import "react-multi-carousel/lib/styles.css";

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;
const CreateWordpress = ({gd}) => {
 
 const [open, setOpen] = useState(false);  
 const [service, setService] = useState(''); 

 const handleOpen = (service) => {
    setService(service);
    setOpen(true)
 };

 const handleClose = () => setOpen(false);

 const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

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
                            <h3 className={styles.x_section_secondary_title}>Tối ưu chi phí vận hành</h3>
                            <h1 className={styles.x_primary_title}>Tạo Website bán hàng, dịch vụ của bạn bằng wordpress</h1>
                            <Link href='/giao-dien'>
                                <a>
                                    <Button className={styles.x_call_to_action}> <IoShapesSharp size={16}/>DÙNG THỬ MIỄN PHÍ</Button>
                                </a>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_banner_image}>
                            <Image alt="thiết kế website tự động" src={'/layout/wordpress-banner.svg'} width={500} height={500}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className={styles.x_why_choose}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_why_choose_content}>
                            <h3 className={styles.x_section_secondary_title}>Tạo lập miễn phí</h3>
                            <h2 className={styles.x_primary_title}>Miễn phí tạo trang và hàng trăm giao diện chất lượng cao</h2>
                            <ul className={styles.x_features}>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Không giới hạn trang</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Cập nhật miễn phí và liên tục</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Giấy phép theo hệ thống</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Tích hợp quản lý dữ liệu, báo cáo hệ thống</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Tài liệu sử dụng</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>SEO toàn trang</p></li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Image alt="thiết kế website wordpress" src={'/layout/web_creation-01.svg'} width={800} height={600}/>
                    </Col>
                </Row>
            </Container>
        </section>
        <Divider/>
        <section className={styles.x_why_choose}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_supporter}>
                            <h3 className={styles.x_section_secondary_title}>Hỗ trợ 24/7</h3>
                            <h2 className={styles.x_primary_title}>Hỗ trợ tận tâm, nhiệt tình với công việc, đổi mới công nghệ</h2>
                            <ul className={styles.x_features}>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Lỗi hệ thống</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Nhắn tin trực tuyến</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Bảo mật hệ thống</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Phản hồi nhanh chóng</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Diễn đàn hỗ trợ</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Quản lý bằng CRM</p></li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Image alt="hỗ trợ xây dựng webiste wordpress" src={'/layout/helper-01.svg'} width={800} height={600}/>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className={styles.x_hosting_section}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24}>
                        <div className={styles.x_hosting_title}>
                            <h3 className={styles.x_section_secondary_title}>Sử dụng dễ dàng</h3>
                            <h2 className={styles.x_primary_title}>Bảng giá tạo website wordpress</h2>
                        </div>
                        <div className={styles.x_hosting_table_container}>
                            <Row>
                                 {
                                    HostingTable.map((val, index) => {
                                        return(
                                            <Col xs={24} md={12} lg={8} key={index}>
                                                <div className={styles.x_hosting}>
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
        <Divider/>
        <section className={styles.x_services_container}>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24}>
                        <div className={styles.x_hosting_title}>
                            <h3 className={styles.x_section_secondary_title}>Mẫu website đa dạng ngành nghề</h3>
                            <h2 className={styles.x_primary_title}>Giao diện chuẩn - đa dạng - đầy đủ tính năng</h2>
                        </div>
                        <div className={styles.x_hosting_table_container}>
                            <Carousel responsive={responsive}>
                                {
                                    gd.map((val) => {
                                        return (
                                            <div style={{padding: '10px'}} key={val.ID}>
                                                <GD_Box price={false} data={val} />
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Divider/>
        <section className={styles.x_services_container}>
            <Container>
                <Row>
                    <Col xs={24}>
                        <div className={styles.x_supporter}>
                            <h3 className={styles.x_section_secondary_title}>Lựa chọn dịch vụ</h3>
                            <h2 className={styles.x_primary_title}>Xây dựng thương hiệu riêng cho bạn</h2>
                            <div className={styles.services}>
                                <Row>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div className={styles.x_services_content}>
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
                                        <div className={styles.x_services_content}>
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
                                        <div className={styles.x_services_content}>
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

export async function getServerSideProps(context) {

    const page = context.query ? context.query.pages : 1;
    const res = await axios.get(rootURL + 'giao-dien/giao-dien-mau?p=' + page).then((resonse) => resonse.data);
  
    // Pass data to the page via props
    return { props: { 
      gd: res.posts,
      nganh: res.nganh,
      danhmuc: res.danh_muc, 
      max_pages: res.max_pages
   }}
}