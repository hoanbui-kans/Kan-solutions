import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/page.module.css'
import { Container, Row, Col } from 'rsuite'
const ErrorPage = () => {
  return <>
      <section className={styles.x_404_section}>
        <Container>

          <Row>
            <Col xs={24}>
              <div className={styles.x_404_image}>
                  <Image src="/post-layout/404.svg" width={500} height={400} alt=""/>
              </div>
              <h1 style={{textAlign: 'center'}}>Lỗi 404, Không tìm thấy trang này</h1>
              <p style={{textAlign: 'center'}}>Không có kết quả tìm kiếm hoặc không có trang nào phù hợp với truy vấn của bạn</p>
              <Link
                href="/"
                style={{
                  textAlign: "center", 
                  margin:"auto", 
                  display:"inline-block",
                  padding: "15px 25px",
                  fontWeight: "bold",
                  background: "#407bff",
                  borderRadius: ".35rem",
                  color: "white",
                  marginTop: "35px"
                }}>
                  TRỞ VỀ TRANG CHỦ
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
  </>;
}

export default ErrorPage