import React from 'react'
import styles from '../styles/footer.module.css'
import { Container, Row, Col, Grid, Form, Button, Divider  } from 'rsuite'
import { listServices } from '../pages/api/services'
import Image from 'next/image'
import Link from 'next/link'
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import EmailMarketing from './page-component/EmailMarketing';

const Footer = () => {
  return (
    <>
      <div className={styles.x_footer_container}>
        <Grid className="x-container">
          <Container>
            <Row className={styles.x_flex}>
              <Col xs={24} md={8} className={styles.x_padding}>
                  <div className={styles.x_footer_content}>
                    <h3 className={styles.x_footer_title}>Về chúng tôi</h3>
                    <strong>CÔNG TY TNHH GIẢI PHÁP KAN</strong>
                    <p className={styles.x_footer_description}>Chuyên cung cấp dịch vụ, sản phẩm và giải pháp chuyển đổi, số hóa nội dung doanh nghiệp. Giới thiệu sản phẩm dịch vụ của doanh nghiệp lên môi trường internet qua thiết kế website, banner quảng cáo...</p>
                  </div>
                </Col>
                <Col xs={24} md={8} className={styles.x_padding}>
                <div className={styles.x_footer_content}>
                  <h3 className={styles.x_footer_title}>Dịch vụ</h3>
                    <ul className={styles.x_footer_services}>
                      {
                        listServices.map((val, index) => {
                          return(
                            <li key={index}>
                              <Link href={val.link}>
                                <a>
                                <ArrowRightIcon width={14} height={14}/>
                                {val.name}
                                </a>
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </Col>
              <Col xs={24} md={8} className={styles.x_padding}>
                <div className={styles.x_footer_content} >
                      <h3 className={styles.x_footer_title}>Nhận tin tức mới</h3>
                      <p className={styles.x_email_message}>Nhận nội dung cập nhật từ website, những thông tin cần thiết để giúp mở phát triển doanh nghiệp</p>
                      <EmailMarketing />
                </div>
              </Col>
              <Col xs={24}>
                <h3 className={styles.x_footer_title}>Thông tin liên hệ</h3>
              </Col>
              <Col xs={24}>
                    <ul className={styles.x_footer_address_list}>
                      <li>
                        <div className={styles.x_contact_list}>
                          <span className={styles.x_footer_icon}>
                            <Image alt='layout' src={'/icons/Pin_fill.svg'} width={20} height={20}/>
                          </span>
                          <div>
                            <strong className={styles.x_footer_focused}> 
                              Địa chỉ: 
                            </strong>
                            Tầng 4 Chung cư Centana Thủ Thiêm, quận 2, TP. HCM
                          </div>
                        </div>
                        </li>
                        <li>
                        <div className={styles.x_contact_list}>
                          <span className={styles.x_footer_icon}>
                              <Image alt='layout' src={'/icons/Phone_fill.svg'} width={20} height={20}/>
                          </span>
                          <div>
                            <strong className={styles.x_footer_focused}>
                            Hotline: 
                            </strong>
                            <a href={'tel:0945938489'}>
                              0945 93 84 89
                            </a>
                          </div>
                        </div>
                        </li>
                        <li>
                        <div className={styles.x_contact_list}>
                          <span className={styles.x_footer_icon}>
                              <Image alt='layout' src={'/icons/Message_alt.svg'} width={20} height={20}/>
                          </span>
                          <div>
                            <strong className={styles.x_footer_focused}>
                              Email: 
                            </strong>
                            <a href={'mailto:info@kanbox.vn'}>
                              info@kanbox.vn
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
              </Col>
            </Row>
          </Container>
        </Grid>
    </div>
    <div className={styles.x_bottom_footer}>
      <Grid className="x-container">
        <p>Copyright ©{ new Date().getFullYear()} KAN SOLUTIONS COMPANY LIMITED ® </p>
      </Grid>
    </div>
    </>
  )
}

export default Footer