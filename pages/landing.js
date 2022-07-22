import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import ArowBackIcon from '@rsuite/icons/ArowBack'
import EmailFillIcon from '@rsuite/icons/EmailFill'
import styles from '../styles/HomePage.module.css'
import Link from 'next/link' 
import HTMLReactParser from 'html-react-parser'
import ServicesSubmitForm from '../components/handleSubmitServices'
import { Container, Row, Col, Button, Modal } from 'rsuite'
import { features, ServicesBox } from './api/services'
import { HomePageSeo } from './api/HeaderSeo'

// Images 
export default function Home() {
  const [open, setOpen] = useState(false);  
  const [service, setService] = useState(''); 
 
  const handleOpen = (service) => {
     setService(service);
     setOpen(true)
  };
  const handleClose = () => setOpen(false);
  return (
    <>
    <div className={styles.container}>
      <Head>
        { HTMLReactParser(HomePageSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
      </Head>
      <main className={styles.main}>
        <div className={styles.x_section}>
            <Container>
              <Row>
                <Col xs={24} md={10} className={styles.x_order_2}>
                  <h1 className={styles.title}>
                    Đưa công việc 
                    kinh doanh 
                    lên internet 
                  </h1>
                  <p className={styles.description}>
                    Thông qua dịch vụ thiết kế website và kho dữ liệu mẫu nội dung số để mở rộng kinh doanh trên internet hiệu quả.
                  </p>
                  <Button 
                    className={styles.x_black_button}
                    onClick={() => { handleOpen('Đăng ký thiết kế website - Trang chủ') }}
                  >
                    <EmailFillIcon width={34} heigh={34}/>
                     ĐĂNG KÝ TƯ VẤN
                  </Button>
                </Col>
                <Col xs={24} md={14} className={styles.x_order_1}>
                  <div className={styles.x_decoration_images}>
                    <div className={styles.x_decoation_1}>
                      <Image alt='layout' src="/layout/decoration-01.svg" width={250} height={236}/>
                    </div>
                    <div className={styles.x_decoation_0}>
                      <Image alt='layout' src="/layout/decoration-0-01.svg" width={390} height={411}/>
                    </div>
                    <Image alt='layout' src="/layout/layoutFrames.png" width={436} height={517}/>
                  </div>
                </Col>
              </Row>
            </Container>
        </div>
        <div className='rs-grid-container'>
          <hr className={styles.x_seperator}/>
        </div>
        <div className={styles.x_section}>
            <Container>
              <Row>
                <Col xs={24}>
                  <h3 className={styles.x_title}>Công cụ Digital Content</h3>
                </Col>
                {
                  ServicesBox.map((val , index) => {
                      return(
                        <Col xs={24} md={12} lg={8} key={index}>
                            <Link href={val.link}>
                              <a>
                                <div className={styles.x_services_box}>
                                    <span className={styles.x_service_icon}>
                                      <Image alt='layout' src={val.image} width={60} height={60}/></span>
                                    <h4 className={styles.x_services_box_title}>{val.title}</h4>
                                    <p className={styles.x_services_box_content}>{val.content}</p>
                                </div>
                              </a>
                            </Link> 
                        </Col>
                      )
                  })
                }
              </Row>
          </Container>
        </div>

        <div className={styles.x_section}>
            <Container>
              <Row>
                <Col xs={24}>
                  <h3 className={styles.x_title_no_margin}>Sản phẩm & Dịch vụ cho bạn</h3>
                  <div style={{maxWidth: '640px', margin: 'auto'}}>
                  <p style={{textAlign: 'center', fontSize: '14px', margin: '1.25rem 0 2.75rem 0rem'}} className={styles.description}>Chúng tôi cung cấp các sản phẩm mẫu hỗ trợ các nội dung số để bạn có thể đưa thông tin doanh nghiệp và sản phẩm của mình lên mạng Internet một cách nhanh chóng và dễ dàng. Điều này giúp bạn gia tăng hiệu quả hoạt động với chi phí thấp nhất</p>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className={styles.x_creeper_box + ' ' + styles.x_creeper_box_1}>
                       <div className={styles.x_creeper_box_section}>
                          <h4 className={styles.x_creeper_title}> Thiết kế website</h4>
                          <p className={styles.x_creeper_content}>Dịch vụ tạo website nhanh theo mẫu, thiết kế website cho doanh nghiệp quản trị nội dung bằng website có sẵn, tối ưu chi phí thiết lập ban đầu.</p>
                          <Link href="/dich-vu/thiet-ke-website-tron-goi-cho-doanh-nghiep">
                            <a>
                              <Button className={styles.x_creeper_button}>
                                <ArowBackIcon color={"white"} className={styles.x_rotate_180deg} width={24} height={24}/>
                              </Button>
                            </a>
                          </Link>
                        </div>
                        <div className={styles.x_creeper_image_1}>
                          <Image alt='layout' src={'/layout/design_1.svg'} width={563} height={413}/>
                        </div>
                    </div>
                    <div className={styles.x_creeper_box + ' '  + styles.x_creeper_box_3}>
                        <div className={styles.x_creeper_box_section}>
                          <h4 className={styles.x_creeper_title}>Quản trị website</h4>
                          <p className={styles.x_creeper_content}>Chúng tôi cung cấp các sản phẩm mẫu hỗ trợ các nội dung số để bạn có thể đưa thông tin doanh nghiệp và sản phẩm của mình lên mạng Internet một cách nhanh chóng và dễ dàng</p>
                          <Link href="/dich-vu/giai-phap-quan-tri-noi-dung-website-cho-doanh-nghiep">
                            <a>
                              <Button className={styles.x_creeper_button}>
                                  <ArowBackIcon color={"white"} className={styles.x_rotate_180deg} width={24} height={24}/>
                              </Button>
                            </a>
                          </Link>
                        </div>
                        <div className={styles.x_creeper_image_3}>
                          <Image alt='layout' src={'/layout/design_3-01.svg'} width={600} height={631}/>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className={styles.x_creeper_box + ' ' + styles.x_creeper_box_2}>
                        <div className={styles.x_creeper_box_section}>
                          <h4 className={styles.x_creeper_title}>Online Marketing</h4>
                          <p className={styles.x_creeper_content}>Hỗ trợ xây dựng các chiến dịch quảng cáo, quảng bá thương hiệu, nghiên cứu, phân tích dữ liệu từ khóa cạnh tranh, tư vấn hỗ trợ.</p>
                          <Link href="/dich-vu/giai-phap-marketing-online-cho-doanh-nghiep">
                            <a>
                                <Button className={styles.x_creeper_button}>
                                  <ArowBackIcon color={"white"} className={styles.x_rotate_180deg} width={24} height={24}/>
                                </Button>
                            </a>
                          </Link>
                        </div>
                        <div className={styles.x_creeper_image_4}>
                          <Image alt='layout' src={'/layout/design_4-01.svg'} width={600} height={631}/>
                        </div>
                    </div>
                    <div className={styles.x_creeper_box + ' ' + styles.x_creeper_box_4}>
                        <div className={styles.x_creeper_box_section}>
                            <h4 className={styles.x_creeper_title}>CRM cho doanh nghiệp</h4>
                            <p className={styles.x_creeper_content}>Chúng tôi cung cấp các giải pháp CRM trọn gói cho doanh nghiệp, xây dựng hệ thống quản trị dữ liệu doanh nghiệp, quản lý hệ thống bán hàng cho doanh nghiệp vừa và nhỏ.</p>
                            <Link href="/dich-vu/dich-vu-trien-khai-crm-cho-doanh-nghiep">
                              <a>
                                <Button className={styles.x_creeper_button}>
                                  <ArowBackIcon color={"white"} className={styles.x_rotate_180deg} width={24} height={24}/>
                                </Button>
                              </a>
                           </Link>
                        </div>
                        <div className={styles.x_creeper_image_2}>
                          <Image alt='layout' src={'/layout/design_2-01.svg'} width={600} height={631}/>
                        </div>
                    </div>
                </Col>
              </Row>
            </Container>
        </div>

        <div className={styles.x_section}>
            <Container>
              <Row>
                <Col xs={24}>
                  <h3 className={styles.x_title_no_margin}>Tại sao chọn chúng tôi?</h3>
                  <div style={{maxWidth: '640px', margin: 'auto'}}>
                  <p style={{textAlign: 'center', fontSize: '14px', margin: '1.25rem 0 2.75rem 0rem'}} className={styles.description}>Sản phẩm & dịch vụ của chúng tôi hướng đến sự tiện dụng và dễ dàng để doanh nghiệp tiếp cận khách hàng trên internet mà vẫn đảm bảo chất lượng và hiệu quả</p>
                  </div>
                </Col>
                {
                  features.map((val, index) => {
                    return(
                      <Col xs={24} md={8} key={index}>
                        <div className={styles.x_features_box}>
                              <span className={styles.x_features_box_icon}><Image alt='layout' src={val.image} width={60} height={60} /></span>
                              <h4 className={styles.x_features_box_title}>{val.title}</h4>
                              <p className={styles.x_features_box_content}>{val.content}</p>
                        </div>
                    </Col>
                    )
                  })
                }
              </Row>
            </Container>
        </div>

        <div className={styles.x_section}>
          <span className={styles.lBox_1}>
            <Image alt='layout' src="/layout/l-box-01.svg" width={400} height={329}/>
          </span>
            <Container>
              <Row>
                <Col xs={24} md={16}>
                  <h3 className={styles.x_title_no_margin_left}>Dịch vụ thiết kế website chuyên nghiệp, cấu trúc chuẩn SEO với nhiều tiện ích</h3>
                    <div style={{maxWidth: '640px', margin: 'auto'}}>
                  </div>
                  <p className={styles.description}>Đáp ứng tối đa trải nghiệm của người dùng và tạo cảm giác thích thú và sáng tạo trong quá trình duyệt web
Website có cấu trúc code HTML thân thiện chuẩn SEO. Dễ cập nhật thông tin lên các thẻ hình ảnh và Công cụ đo lường và kiểm soát nội dung hiệu quả.</p>
                </Col>
                <Col xs={24} md={12}>
                  <Link href={'/giao-dien'}>
                  <a>
                    <Button className={styles.x_black_button}>
                      XEM GIAO DIỆN MẪU
                    </Button>
                  </a>
                  </Link>
                </Col>
              </Row>
            </Container>
        </div>
      </main>
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