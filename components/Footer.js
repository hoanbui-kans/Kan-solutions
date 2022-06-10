import React from 'react'
import styles from '../../styles/footer.module.css'
import { Container, Row, Col, Grid, Form, Button  } from 'rsuite'
import { listServices } from '../../pages/api/services'
import Image from 'next/image'
import Link from 'next/link'
import ArrowRightIcon from '@rsuite/icons/ArrowRight';

const Footer = () => {
  return (
    <div className={styles.x_footer_container}>
        <Grid className="x-container">
          <Container>
            <Row>
              <Col xs={24} md={8}>
                  <div className={styles.x_footer_content}>
                    <h3 className={styles.x_footer_title}>Về chúng tôi</h3>
                    <strong>CÔNG TY TNHH GIẢI PHÁP KAN</strong>
                    <p className={styles.x_footer_description}>Chuyên cung cấp dịch vụ, sản phẩm và giải pháp chuyển đổi, số hóa nội dung doanh nghiệp. Giới thiệu sản phẩm dịch vụ của doanh nghiệp lên môi trường internet qua thiết kế website, banner quảng cáo...</p>
                  </div>
                </Col>
                <Col xs={24} md={8}>
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
              <Col xs={24} md={8}>
                <div className={styles.x_footer_content}>
                      <h3 className={styles.x_footer_title}>Nhận tin tức mới</h3>
                      <p className={styles.x_email_message}>Nhận nội dung cập nhật từ website, những thông tin cần thiết để giúp mở phát triển doanh nghiệp</p>
                      <Form className={styles.x_footer_form}>
                        <Form.Control name='email' className={styles.x_form_newsletter} value={EventTarget.value} placeholder={'Nhập địa chỉ Email...'}></Form.Control>
                        <Button className={styles.x_newsletter_button}>
                            <span className={styles.x_newsletter_ico}>
                              <Image alt='layout' src={'/icons/Send_fill.svg'} width={24} height={24} />
                            </span>
                            Gửi đi
                        </Button>
                      </Form>
                </div>
              </Col>
              <Col xs={24}>
              <h3 className={styles.x_footer_title}>Thông tin liên hệ</h3>
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
                            0945 93 84 89
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
                            info@kanbox.vn
                          </div>
                        </div>
                      </li>
                    </ul>
              </Col>
            </Row>
          </Container>
        </Grid>
    </div>
  )
}

export default Footer