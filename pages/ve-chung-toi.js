import React from 'react'
import { Grid, Row, Col, Timeline } from 'rsuite'
import Image from 'next/image'
import styles from '../styles/about.module.css'

const AboutUs = () => {
  return (
    <div className={styles.x_about_us_section}>
      <Grid className={'x-container'}>
          <Row className={styles.x_flex_center}>
            <Col xs={24} md={12}>
              <Image src={'/layout/multipe_screen.png'} width={600} height={400}/>
            </Col>
            <Col xs={24} md={12}>
              <h3 >Về Kan Solution</h3>
              <p>
                Bạn thắc mắc vì sao website bạn đầu tư thiết kế website rất nhiều tiền, cũng đổ tiền quảng cáo với ngân sách khủng nhưng hiệu quả bán hàng không được như ý, thậm chí không bằng các website nhìn rất xấu
              </p>
              <p>
              Website thành công không chỉ dựa vào yếu tố đẹp, mà nó còn đòi hỏi nhiều yếu tố từ nội dung, cấu trúc code, nội dung, tuổi thọ, tốc độ, các liên kết khác. Bạn cần hiểu rõ thế mạnh của mình để có thể xây dựng chiến lược lâu dài cho website
              </p>
            </Col>
          </Row>
          <Row className={styles.x_flex_center}>
            <Col xs={24}>
              <h3>Về Kan Solution</h3>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.x_feature_box}>
                <span className={styles.x_feature_}><Image src={'/icons/trophy_light.svg'} width={45} height={45}/></span>
                <h3 className={styles.x_feature_title}>Giá trị</h3>
                <p className={styles.x_feature_content}>
                  Thông qua hai điểm máu chốt là sự phù hợp và dễ sử dụng. Tận lực xây dựng giải pháp tốt trong từng giai đoạn phát triển của doanh nghiệp
                </p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.x_feature_box}>
                <span className={styles.x_feature_}><Image src={'/icons/chart_alt_light.svg'} width={45} height={45}/></span>
                <h3 className={styles.x_feature_title}>Tầm nhìn</h3>
                <p className={styles.x_feature_content}>
                  Tập trung vào các giải pháp giúp doanh nghiệp tiếp cận, sử dụng hiệu quả các sản phẩm số và internet
                </p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.x_feature_box}>
                <span className={styles.x_feature_}><Image src={'/icons/world_2_light.svg'} width={45} height={45}/></span>
                <h3 className={styles.x_feature_title}>Sứ mệnh</h3>
                <p className={styles.x_feature_content}>
                  Công ty cung cấp giải pháp số hóa và internet uy tín. Kho dữ liệu tham khảo trong cộng đồng kinh doanh
                </p>
              </div>
            </Col>
          </Row>
          <Row className={styles.x_flex_timeline}>
            <Col xs={24}>
              <h3>Thông tin hoạt động</h3>
            </Col>
            <Col xs={12} md={24} className={styles.x_timeline_content}>
              <div className={styles.x_timeline}>
                  <div className={styles.x_timeline_item}>
                    <span className={styles.x_timebox_icon}><Image src={'/icons/Send_fill_black.svg'} width={45} height={45}/></span>
                    <div className={styles.x_timeline_content}>
                      <h4 className={styles.x_timeline_title}>Năm 2013 - Gia nhập</h4>
                      <p>Gia nhập ngành thiết kế website cùng người bạn, cùng sáng lập công ty chuyên về thiết kế website cho doanh nghiệp</p>
                    </div>
                  </div>
                  <div className={styles.x_timeline_item}>
                    <span className={styles.x_timebox_icon}><Image src={'/icons/3d_box_fill.svg'} width={45} height={45}/></span>
                      <div className={styles.x_timeline_content}>
                        <h4 className={styles.x_timeline_title}>Năm 2017 - Thành lập Kan Solutions</h4>
                        <p>Gia nhập ngành thiết kế website cùng người bạn, cùng sáng lập công ty chuyên về thiết kế website cho doanh nghiệp</p>
                      </div>
                    </div>
                  <div className={styles.x_timeline_item}>
                    <span className={styles.x_timebox_icon}><Image src={'/icons/Folder_copy_duotone.svg'} width={45} height={45}/></span>
                    <div className={styles.x_timeline_content}>
                      <h4 className={styles.x_timeline_title}>Năm 2019 - Hợp tác – Mở rộng</h4>
                      <p>Gia nhập ngành thiết kế website cùng người bạn, cùng sáng lập công ty chuyên về thiết kế website cho doanh nghiệp</p>
                    </div>
                  </div>
              </div>
            </Col>
            <span className={styles.x_neumorphic}>
              <Image src={'/layout/decorations-01.svg'} width={500} height={500}/>
            </span>
          </Row>
      </Grid>
    </div>
  )
}

export default AboutUs