import React from 'react'
import { Grid, Container, Row, Col, Button, Divider } from 'rsuite' 
import { IoCheckmarkCircle, IoCaretForwardSharp }  from "react-icons/io5"
import styles from '../../styles/page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import { ServicesWebsiteManager } from '../api/HeaderSeo'

const WebsiteManager = () => {
  return (
    <>
      <Head>
        { HTMLReactParser(ServicesWebsiteManager) }
      </Head>
      <div className={styles.x_webite_manager_section}>
      <Grid className={'x_container'}>
          <Container>
            <Row>
              <Col xs={24}>
                  <div className={styles.x_position_relative}>
                      <div className={styles.x_website_manager_banner}>
                        <h3 className={styles.x_website_manager_banner_title}>
                          Dịch vụ quản trị website bao gồm các mảng công việc chính là bảo trì, vận hành kỹ thuật đảm bảo website luôn hoạt động ổn định và hiệu quả.
                        </h3>
                        <ul className={styles.x_website_manager_list}>
                          <li>
                            <p>
                                <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                Về cơ bản, quản trị website bao gồm:  Bảo trì kỹ thuật, tối ưu hóa server và code.
                            </p>
                          </li>
                          <li>
                              <p>
                                <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                Cập nhật, phát triển nội dung chuẩn SEO, đảm bảo website luôn có tính cập nhật và thân thiện với Google.
                            </p>
                        </li>
                        <li>
                              <p>
                                <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                Hỗ trợ các hoạt động kết nối social, quảng bá website trên môi trường internet.
                            </p>
                        </li>
                        </ul>
                    </div>  
                  </div>
              </Col>
            </Row>  
          </Container>      
      </Grid>
      <Grid className={'x_container'}>
          <Container>
            <Row>
              <Col md={24}>
                <h3 className={styles.x_website_manager_title}>Những vẫn đề bạn thường gặp sau khi đã xây dựng website làm cho website trở nên kém hiệu quả, không được người dùng và khách hàng biết đến thậm chí ảnh hưởng đến thương hiệu</h3>
              </Col>
            </Row>  
          </Container>      
      </Grid>
      <Grid className={'x_container'}>
          <Container>
            <Row>
              <Col md={24}>
                 <ul className={styles.x_website_manager_features_list}>
                  <li>
                    <div className={styles.x_website_manager_features}>
                      <div className={styles.x_website_manager_features_icon}>
                        <Image src={'/icons/Time_atack_light.svg'} width={45} height={45}/>
                      </div>
                      <div className={styles.x_website_manager_content}>
                        <h3>BẠN KHÔNG CÓ THỜI GIAN VÀ NHÂN SỰ ĐỂ CHĂM SÓC, VIẾT BÀI ĐỂ NÂNG THỨ HẠNG WEBSITE?</h3>  
                        <p>Hãy xem chúng tôi như đội ngũ nhân viên của bạn, chúng tôi sẽ làm việc dưới góc độ chuyên môn kỹ thuật và trao đổi với bạn những vấn đề về ngành nghề kinh doanh của bạn để website mang lại hiệu quả nhất</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.x_website_manager_features}>
                      <div className={styles.x_website_manager_features_icon}>
                        <Image src={'/icons/Chield_check_fill.svg'} width={45} height={45}/>
                      </div>
                      <div className={styles.x_website_manager_content}>
                        <h3>BẠN CẢM THẤY KHÓ HIỂU KHI MUỐN VẬN HÀNH MỘT WEBSITE HIỆU QUẢ</h3>  
                        <p>Ngoài việc hỗ trợ bạn thời gian đầu trong việc phát triển website, chúng tôi cũng hỗ trợ bạn hoặc nhân viên của bạn những vấn đề cốt lõi để có thể quản trị website tốt nhất trong tương lai một cách chủ động</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.x_website_manager_features}>
                      <div className={styles.x_website_manager_features_icon}>
                        <Image src={'/icons/Wallet_alt_fill.svg'} width={35} height={35}/>
                      </div>
                      <div className={styles.x_website_manager_content}>
                        <h3>BẠN CẢM THẤY TỐN KÉM RẤT NHIỀU TÀI NGUYÊN VÀ CHI PHÍ ĐỂ QUẢN TRỊ WEBSITE</h3>  
                        <p>Chúng tôi mang đến cho bạn giải pháp quản trị website lâu dài, phát triển ổn định với một mức chi phí bạn có thể không ngờ đến mà không cần thêm nguồn lực nào khác. Dịch vụ của chúng tôi chỉ có mức phí bằng 50% một nhân viên chuyên trách cho công việc này</p>
                      </div>
                    </div>
                  </li>
                 </ul>
              </Col>
              <Col>
                <Divider />
              </Col>
            </Row>  
          </Container>      
      </Grid>
      <Grid className={'x_container'}>
          <Container>
            <Row>
              <Col xs={24}>
                  <div className={styles.x_website_manager_why}>
                    <h2>TẠI SAO CẦN QUẢN TRỊ WEBSITE?</h2>
                    <p>Bạn cần đội ngũ nhân sự bên ngoài hỗ trợ xây dựng và phát triển website dưới góc nhìn của một chuyên gia kỹ thuật</p>
                  </div>
              </Col>
              <Col xs={24}>
                  <ul className={styles.x_website_manager_features_why}>
                    <li>
                      <p>
                        <span><IoCaretForwardSharp size={14}/></span>
                        Hỗ trợ xây dựng trang đích quảng cáo không tính phí mỗi khi có nhu cầu</p>
                    </li>
                    <li>
                      <p>
                        <span><IoCaretForwardSharp size={14}/></span>
                        Google sẽ ghi nhớ và gia tăng thứ hạng với website được cập nhật nội dung</p>
                    </li>
                    <li>
                      <p>
                        <span><IoCaretForwardSharp size={14}/></span>
                        Trang web được cập nhật nội dung mới, tự viết và với cấu trúc chuẩn SEO mang lại hiệu quả cáo</p>
                    </li>
                    <li>
                      <p>
                        <span><IoCaretForwardSharp size={14}/></span>
                        Website được làm tươi mới mỗi ngày về cả nội dung lẫn hình thức, các hình ảnh, banner và thông điệp</p>
                    </li>
                    <li>
                      <p>
                        <span><IoCaretForwardSharp size={14}/></span>
                        Tư vấn và chủ động nội dung website theo hướng tập trung vào từ khóa cần thiết giúp bạn dễ dàng tiếp cận khách hàng</p>
                    </li>
                    <li>
                      <p>
                        <span><IoCaretForwardSharp size={14}/></span>
                        Nâng cao khả năng kết nối của website với môi trường mạng như social, backlink, forum để nâng cao hiệu quả quảng cáo</p>
                    </li>
                  </ul>
              </Col>
            </Row>  
          </Container>      
      </Grid>
      <Grid className={'x_container'}>
          <Container>
            <Row>
              <Col md={24}>
                  <div className={styles.x_banner_web_mannager}>
                    <div>
                      <h2>
                          Quản trị website chuyên nghiệp để gia tăng giá trị thương hiệu trên internet
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

export default WebsiteManager