import React from 'react'
import { Grid, Container, Row, Col, Button, Divider } from 'rsuite' 
import Image from 'next/image'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import { ServicesMarketingOnline } from '../api/HeaderSeo'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import styles from '../../styles/services/marketingonline.module.css'
const Marketing = () => {

  return (
    <>
      <Head>
          { HTMLReactParser(ServicesMarketingOnline) }
      </Head>
      
      <div className={styles.x_marketing_banner_section}>
        <Grid>
            <Container>
                <Row className='x_flex_center'>
                  <Col xs={24} md={12}>
                    <div className={styles.x_margin_bottom}>
                      <h3 className={styles.x_marketing_banner_title}>DỊCH VỤ QUẢNG CÁO</h3>
                      <p className={styles.x_marketing_banner_description}>Mỗi ngày, khách hàng đều tìm kiếm những doanh nghiệp giống như của bạn trên Google Tìm Kiếm. Tiếp cận với họ qua Google Ads, và chỉ trà phí cho mỗi lượt nhấp chuột vào rang web của bạn hoặc khi khách hàng gọi điện đến doanh nghiệp của bạn.</p>
                      <Button className={styles.x_adsButton}>Tư vấn miễn phí</Button>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <Image src="/ads_display.png" alt="Giải pháp marketing online" width={525} height={400}/>
                  </Col>
              </Row> 
            </Container>
        </Grid>
      </div>
      <div className={styles.x_section}>
        <Grid className={'x_container'}>
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
        </Grid>
      </div>
      <div className={styles.x_section}>
        <Grid className={'x_container'}>
            <Container>
              <Row>
                <Col md={24}>
                    <div className={styles.x_banner_web_mannager}>
                      <div className={styles.x_banner_web_manager_section}>
                        <h2 className={styles.x_website_manager_title}>
                            Quản trị website chuyên nghiệp để gia tăng 
                            giá trị thương hiệu trên internet
                        </h2>
                        <Button className={styles.x_banner_web_mannager_button}>
                            Bấm vào đây
                        </Button>
                      </div>
                    </div>
                </Col>
              </Row>  
            </Container>      
        </Grid>
    </div>
    </>
  )
}

export default Marketing