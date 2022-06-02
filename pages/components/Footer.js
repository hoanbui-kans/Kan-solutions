import React from 'react'
import styles from '../../styles/footer.module.css'
import { Container, Row, Col, Grid, Form, Button  } from 'rsuite'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.x_footer_container}>
        <Grid className="x-container">
          <Container>
            <Row>
            <Col xs={12} md={8}>
                <div className={styles.x_footer_content}>
                  <h3 className={styles.x_footer_title}>Về chúng tôi</h3>
                  <p>Chuyên cung cấp dịch vụ, sản phẩm và giải pháp chuyển đổi, số hóa nội dung doanh nghiệp. Giới thiệu sản phẩm dịch vụ của doanh nghiệp lên môi trường internet qua thiết kế website, banner quảng cáo...</p>
                </div>
              </Col>
              <Col xs={12} md={5}>
                <div className={styles.x_footer_content}>
                  <h3 className={styles.x_footer_title}>Dịch vụ</h3>
                  <ul className={styles.x_footer_address_list}>
                    <li>
                      <p>Thiết kế website </p>
                    </li>
                    <li>
                      <p>Quản trị website</p>
                    </li>
                    <li>
                      <p>Chạy quảng cáo</p>
                    </li>
                    <li>
                      <p>Marketing Online</p>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={12} md={8}>
                <div className={styles.x_footer_content}>
                  <h3 className={styles.x_footer_title}>Thông tin liên hệ</h3>
                  <ul className={styles.x_footer_address_list}>
                    <li>
                      <p>
                        <strong><span className={styles.x_footer_icon}>
                          <Image src={'/icons/Pin_fill.svg'} width={30} height={30}/></span>Địa chỉ: 
                        </strong>
                        Tầng 4 Chung cư Centana Thủ Thiêm, quận 2, TP. HCM
                      </p>
                      </li>
                      <li>
                      <p>
                        <strong><span className={styles.x_footer_icon}>
                          <Image src={'/icons/Phone_fill.svg'} width={30} height={30}/></span>Hotline: 
                        </strong>
                        0945 93 84 89
                      </p>
                      </li>
                      <li>
                      <p>
                        <strong><span className={styles.x_footer_icon}>
                          <Image src={'/icons/Message_alt.svg'} width={30} height={30}/></span>Email: 
                        </strong>
                        info@kanbox.vn
                      </p>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className={styles.x_footer_content}>
                  <h3 className={styles.x_footer_title}>Nhận thông tin mới</h3>
                  <Form className={styles.x_footer_form}>
                    <Form.Control className={styles.x_form_newsletter} value={EventTarget.value} placeHolder={'Nhập địa chỉ Email...'}></Form.Control>
                    <Button className={styles.x_newsletter_button}>
                        <span className={styles.x_newsletter_ico}>
                          <Image src={'/icons/Send_fill.svg'} width={20} height={20} />
                        </span>
                        Gửi đi
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </Grid>
    </div>
  )
}

export default Footer