import React from 'react'
import { Grid, Container, Row, Col, Button, Divider, Whisper, Tooltip } from 'rsuite' 
import { IoCheckmarkCircle }  from "react-icons/io5"
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import { ServicesMarketingOnline } from '../api/HeaderSeo'
import { IoCheckmarkCircleSharp, IoCaretForwardSharp } from 'react-icons/io5'
import styles from '../../styles/page.module.css'
import { MarketingTable } from '../api/services'
const Marketing = () => {
  return (
    <>
      <Head>
          { HTMLReactParser(ServicesMarketingOnline) }
      </Head>
      <div className={styles.x_webite_manager_section}>
      <Grid className={'x_container'}>
          <Container>
            <div className={styles.x_marketing_section}>
              <Row className='x_flex_center'>
                  <Col xs={24} md={12}>
                    <h3>DỊCH VỤ QUẢNG CÁO</h3>
                    <p>Mỗi ngày, khách hàng đều tìm kiếm những doanh nghiệp giống như của bạn trên Google Tìm Kiếm. Tiếp cận với họ qua Google Ads, và chỉ trà phí cho mỗi lượt nhấp chuột vào rang web của bạn hoặc khi khách hàng gọi điện đến doanh nghiệp của bạn.</p>
                    <Button className={styles.x_adsButton}>Tư vấn miễn phí</Button>
                  </Col>
                  <Col xs={24} md={12}>
                      <Image src="/ads_display.png" alt="Giải pháp marketing online" width={525} height={400}/>
                  </Col>
              </Row> 
            </div>
            <Divider /> 
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
            <Divider />
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
            <Divider />
            <div className={styles.x_marketing_section}>
              <Row className='x_flex_center'>
                  <Col xs={24}>
                    <h3 className={styles.x_marketing_title}>Bảng giá dịch vụ</h3>
                  </Col>
                  <Col xs={24}>
                      <div className={styles.x_webite_manager_featured_container}>
                        <div className={styles.x_table_job}></div>
                        <div className={styles.x_table_column}>
                          <ul className={styles.x_webite_manager_featured_list}>
                            <li className={styles.x_featured_table_heading}>
                              <div className={styles.x_table_content_heading}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> Kan New</h4>
                                <strong>3.900.000/ Tháng</strong>
                                <Button className={styles.x_table_button}>Đăng ký</Button>
                              </div>
                            </li>
                            <li>
                              <div className={styles.x_table_content_heading}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> Kan AddPlus</h4>
                                <strong>5.900.000/ Tháng</strong>
                                <Button className={styles.x_table_button}>Đăng ký</Button>
                              </div>
                            </li>
                            <li>
                              <div className={styles.x_table_content_heading}>
                                <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> Kan Master</h4>
                                <strong>7.900.000/ Tháng</strong>
                                <Button className={styles.x_table_button}>Đăng ký</Button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    
                      <div className={styles.x_table_content_wrapper}>
                      {
                        MarketingTable.map((val, index) => {
                          return(
                            <div className={styles.x_table_content_table} key={index}>
                              <h5 className={styles.x_table_title}>{val.name}</h5>
                              <div className={styles.x_table_index}>
                                {
                                  val.data.map((valChild, indexChild) => {
                                    return(
                                    <div className={styles.x_table_row} key={indexChild}>
                                      <div className={styles.x_table_job}>
                                        <p><IoCaretForwardSharp size={8}/> {valChild.name}</p>
                                      </div>
                                      <div className={styles.x_table_column}>
                                        <ul className={styles.x_table_list}>
                                          {
                                            valChild.data.map((valServices, indexServices) => {
                                              return(
                                                  <li key={indexServices} className={indexServices == 0 ? styles.x_featured_table : ''}>
                                                    <Whisper
                                                      trigger="click"
                                                      placement={'top'}
                                                      controlId={`control-id-${indexServices}`}
                                                      speaker={
                                                        <Tooltip>{valChild.description}</Tooltip>
                                                      }
                                                    >
                                                      <Button appearance="subtle">{valServices}</Button>
                                                    </Whisper>
                                                  </li>
                                              )
                                            })
                                          }
                                          
                                        </ul>
                                      </div>
                                    </div>
                                    )
                                  })
                                }
                                </div>
                              </div>
                            )
                      })
                      }
                    </div>
                  </Col>
              </Row>  
            </div>
          </Container>      
      </Grid>
    </div>
    </>
  )
}

export default Marketing