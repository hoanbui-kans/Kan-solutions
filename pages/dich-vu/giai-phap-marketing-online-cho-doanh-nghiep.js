import { useState } from 'react'
import { Container, Row, Col, Button, Modal } from 'rsuite' 
import { ServicesMarketingOnline } from '../api/HeaderSeo'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import Image from 'next/image'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import styles from '../../styles/services/marketingonline.module.css'
import ServicesSubmitForm from '../../components/handleSubmitServices'

const Marketing = () => {

  const [open, setOpen] = useState(false);  
  const [service, setService] = useState(''); 
 
  const handleOpen = (service) => {
     setService(service);
     setOpen(true)
  };
  const handleClose = () => setOpen(false);

  
  return (
    <>
      <Head>
          { HTMLReactParser(ServicesMarketingOnline.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
      </Head>
      
      <div className={styles.x_marketing_banner_section}>
          <Container>
              <Row className='x_flex_center'>
                <Col xs={24} md={12}>
                  <div className={styles.x_margin_bottom}>
                    <h3 className={styles.x_marketing_banner_title}>DỊCH VỤ QUẢNG CÁO</h3>
                    <p className={styles.x_marketing_banner_description}>Mỗi ngày, khách hàng đều tìm kiếm những doanh nghiệp giống như của bạn trên Google Tìm Kiếm. Tiếp cận với họ qua Google Ads, và chỉ trà phí cho mỗi lượt nhấp chuột vào rang web của bạn hoặc khi khách hàng gọi điện đến doanh nghiệp của bạn.</p>
                    <Button 
                      onClick={() => { handleOpen('Đăng ký tư vấn dịch vụ marketing') }}
                      className={styles.x_adsButton}>
                        Tư vấn miễn phí
                    </Button>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <Image src="/ads_display.png" alt="Giải pháp marketing online" width={525} height={400}/>
                </Col>
            </Row> 
          </Container>
      </div>
      <div className={styles.x_section}>
            <Container>
              <div className={styles.x_marketing_section}>
                <Row className='x_flex_center'>
                    <Col xs={24}>
                      <h3 className={styles.x_marketing_title}>Thu được những kết quả hữu ích với bạn</h3>
                    </Col>
                    <Col xs={24} md={12}>
                        <Image src="/female_shopping-01.svg" alt="Giải pháp marketing online" width={525} height={400}/>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_webite_manager_featured_container}>
                          <ul className={styles.x_webite_manager_featured_list_ul}>
                            <li>
                              <div className={styles.x_webite_manager_featured}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> THÚC ĐẨY LƯỢT TRUY CẬP VÀO TRANG WEB</h4>
                                <p>Tăng doanh số bán hàng trực tuyến, lượt đặt hàng hoặc lượt đăng ký vào danh sách gửi thư bằng cách sử dụng quảng cáo trực tuyến hướng mọi người đến trang web của bạn.</p>
                              </div>
                            </li>
                            <li>
                              <div className={styles.x_webite_manager_featured}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> TĂNG SỐ LƯỢNG CUỘC GỌI ĐIỆN THOẠI</h4>
                                <p>Tăng số lượng cuộc gọi điện thoại từ khách hàng bằng cách sử dụng quảng cáo có hiển thị số điện thoại của bạn và nút nhấp để gọi.</p>
                              </div>
                            </li>
                            <li>
                              <div className={styles.x_webite_manager_featured}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> TĂNG SỐ LƯỢT GHÉ QUA CỬA HÀNG</h4>
                                <p>Thu hút nhiều khách hàng ghé đến cửa hàng hơn bằng cách sử dụng quảng cáo chỉ đường đến doanh nghiệp của bạn trên bản đồ.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                    </Col>
                </Row>  
              </div>
              <div className={styles.x_marketing_section}>
                <Row className='x_flex_center'>
                    <Col xs={24}>
                      <h3 className={styles.x_marketing_title}>Dịch vụ quảng cáo Google Ads</h3>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_webite_manager_featured_container}>
                          <ul className={styles.x_webite_manager_featured_list_ul}>
                            <li>
                              <div className={styles.x_webite_manager_featured}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> THÚC ĐẨY LƯỢT TRUY CẬP VÀO TRANG WEB</h4>
                                <p>Tăng doanh số bán hàng trực tuyến, lượt đặt hàng hoặc lượt đăng ký vào danh sách gửi thư bằng cách sử dụng quảng cáo trực tuyến hướng mọi người đến trang web của bạn.</p>
                              </div>
                            </li>
                            <li>
                              <div className={styles.x_webite_manager_featured}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> TĂNG SỐ LƯỢNG CUỘC GỌI ĐIỆN THOẠI</h4>
                                <p>Tăng số lượng cuộc gọi điện thoại từ khách hàng bằng cách sử dụng quảng cáo có hiển thị số điện thoại của bạn và nút nhấp để gọi.</p>
                              </div>
                            </li>
                            <li>
                              <div className={styles.x_webite_manager_featured}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> TĂNG SỐ LƯỢT GHÉ QUA CỬA HÀNG</h4>
                                <p>Thu hút nhiều khách hàng ghé đến cửa hàng hơn bằng cách sử dụng quảng cáo chỉ đường đến doanh nghiệp của bạn trên bản đồ.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Image src="/female_shopping_2.svg" alt="Giải pháp marketing online" width={525} height={400}/>
                    </Col>
                </Row>  
              </div>
          </Container>      
      </div>
      <div className={styles.x_section}>
            <Container>
              <Row>
                <Col md={24}>
                    <div className={styles.x_banner_web_mannager}>
                      <div className={styles.x_banner_web_manager_section}>
                        <h2 className={styles.x_website_manager_title}>
                            Quản trị website chuyên nghiệp để gia tăng 
                            giá trị thương hiệu trên internet
                        </h2>
                        <Button 
                          className={styles.x_banner_web_mannager_button}
                          onClick={() => { handleOpen('Đăng ký tư vấn dịch vụ marketing') }}
                        >
                            Bấm vào đây
                        </Button>
                      </div>
                    </div>
                </Col>
              </Row>  
         </Container>   
    </div>
    <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Đăng ký tư vấn dịch vụ quảng cáo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Marketing