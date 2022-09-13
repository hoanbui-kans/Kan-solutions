import { useState } from 'react'
import { Row, Col, Breadcrumb, Container, Button, Modal } from 'rsuite'
import Image from 'next/image'
import styles from '../styles/about.module.css'
import EmailFillIcon from '@rsuite/icons/EmailFill'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import { AboutUsSeo } from './api/HeaderSeo'
import Link from 'next/link'
import ServicesSubmitForm from '../components/handleSubmitServices'

const AboutUs = () => {
  const [open, setOpen] = useState(false);  
  const [service, setService] = useState(''); 

  const handleOpen = (service) => {
      setService(service);
      setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const QuestionSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
        "@type": "Question",
        "name": "Phân tích yêu cầu",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "<p>Yêu cầu của khách hàng bắt đầu từ vấn đề cần giải pháp. Chúng tôi hướng đến giải quyết vấn đề của khách hàng</p>"
        }
      },{
        "@type": "Question",
        "name": "Thống nhất hợp đồng dịch vụ",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "<p>Một giải pháp hợp lý khi giải quyết được vấn đề trong nguồn lực hợp lý, hiệu quả, đảm bảo tiến độ và ngân sách phù hợp</p>"
        }
      },{
        "@type": "Question",
        "name": "Triển khai thực hiện dịch vụ",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "<p>Đội ngũ Kan Solutions làm việc dựa trên giải pháp và sự sáng tạo. Làm việc chuyên nghiệp, tận tậm để đảm bảo tiến độ.</p>"
        }
      },{
        "@type": "Question",
        "name": "Khách hàng phản hồi và chỉnh sửa",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "<p>Phản hồi và điều chỉnh trên cơ sở sự hài lòng của khách hàng Ba thành phần phản hồi: Cấu trúc, thiết kế, nội dung</p>"
        }
      },{
        "@type": "Question",
        "name": "Hướng dẫn bàn giao sản phẩm",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "<p>Bàn giao sản phẩm sau khi khách hàng hài lòng và thanh lý hợp đồng. Hướng dẫn và đào tạo sử dụng, quản trị hiệu quả</p>"
        }
      }
    ]
  };

  return (
    <>
       <Head>
        { HTMLReactParser(AboutUsSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(QuestionSchema)}} />
      </Head>
      <div className={'x_breadcum_container'}>
        <section>
            <Container>
                <Row>
                    <Col xs={24}>
                      <Breadcrumb className={'x_breadcumb'}>
                        <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item active>về chúng tôi</Breadcrumb.Item>
                      </Breadcrumb> 
                    </Col>
                </Row>
            </Container>
        </section>   
      </div>  
      <div className={styles.x_about_us_section}>
      <span className={styles.x_neumorphic}>
            <Image alt='layout' src={'/layout/decorations-01.svg'} width={800} height={800}/>
      </span>
      <section className={styles.x_about_section_one}>
        <Container>
          <Row className={'x_flex_center'}>
              <Col xs={24} md={12}>
                <Image alt='layout' src={'/layout/real-mockup.png'} width={800} height={395}/>
              </Col>
              <Col xs={24} md={12}>
                <h3 className={styles.x_about_title}>Về Kan Solution</h3>
                <p>
                  Bạn thắc mắc vì sao website bạn đầu tư thiết kế website rất nhiều tiền, cũng đổ tiền quảng cáo với ngân sách khủng nhưng hiệu quả bán hàng không được như ý, thậm chí không bằng các website nhìn rất xấu
                </p>
                <p className={styles.x_about_description}>
                Website thành công không chỉ dựa vào yếu tố đẹp, mà nó còn đòi hỏi nhiều yếu tố từ nội dung, cấu trúc code, nội dung, tuổi thọ, tốc độ, các liên kết khác. Bạn cần hiểu rõ thế mạnh của mình để có thể xây dựng chiến lược lâu dài cho website
                </p>
                <Button 
                  className={styles.x_black_button} 
                  onClick={() => { handleOpen('Đăng ký tư vấn dịch vụ từ trang giới thiệu') }}>
                    <EmailFillIcon 
                      width={16} 
                      height={16}
                    />
                     ĐĂNG KÝ TƯ VẤN
                  </Button>
              </Col>
            </Row>
         </Container>
      </section>
      <section className={styles.x_about_section_one}>
        <Container>
            <Row className={styles.x_flex_center}>
              <Col xs={24} md={8}>
                <div className={styles.x_feature_box}>
                  <span className={styles.x_feature_}><Image alt='layout' src={'/icons/trophy_light.svg'} width={45} height={45}/></span>
                  <h3 className={styles.x_feature_title}>Giá trị</h3>
                  <p className={styles.x_feature_content}>
                    Thông qua hai điểm máu chốt là sự phù hợp và dễ sử dụng. Tận lực xây dựng giải pháp tốt trong từng giai đoạn phát triển của doanh nghiệp
                  </p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className={styles.x_feature_box}>
                  <span className={styles.x_feature_}><Image alt='layout' src={'/icons/chart_alt_light.svg'} width={45} height={45}/></span>
                  <h3 className={styles.x_feature_title}>Tầm nhìn</h3>
                  <p className={styles.x_feature_content}>
                    Tập trung vào các giải pháp giúp doanh nghiệp tiếp cận, sử dụng hiệu quả các sản phẩm số và internet
                  </p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className={styles.x_feature_box}>
                  <span className={styles.x_feature_}><Image alt='layout' src={'/icons/world_2_light.svg'} width={45} height={45}/></span>
                  <h3 className={styles.x_feature_title}>Sứ mệnh</h3>
                  <p className={styles.x_feature_content}>
                    Công ty cung cấp giải pháp số hóa và internet uy tín. Kho dữ liệu tham khảo trong cộng đồng kinh doanh
                  </p>
                </div>
              </Col>
            </Row>
       </Container>
     </section>
     <section className={styles.x_about_section_one}>
        <Container>
            <Row className={styles.x_flex_timeline}>
              <Col xs={24}>
                <h3 className={styles.x_about_title}>Thông tin hoạt động</h3>
              </Col>
              <Col xs={24} md={14}>
                <div className={styles.x_timeline}>
                    <div className={styles.x_timeline_item}>
                      <span className={styles.x_year_counter}>
                          Năm 2013
                      </span>
                      <div className={styles.x_timeline_content}>
                        <span className={styles.x_timebox_icon}>
                          <Image alt='layout' src={'/icons/Send_fill_black.svg'} width={45} height={45}/>
                        </span>
                        <h4 className={styles.x_timeline_title}>Gia nhập</h4>
                        <p>Gia nhập ngành thiết kế website cùng người bạn, cùng sáng lập công ty chuyên về thiết kế website cho doanh nghiệp</p>
                      </div>
                    </div>
                    <div className={styles.x_timeline_item}>
                        <span className={styles.x_year_counter}>
                            Năm 2017
                        </span>
                        <div className={styles.x_timeline_content}>
                          <span className={styles.x_timebox_icon}>
                            <Image alt='layout' src={'/icons/3d_box_fill.svg'} width={45} height={45}/>
                          </span>
                          <h4 className={styles.x_timeline_title}>Thành lập Kan Solutions</h4>
                          <p>Gia nhập ngành thiết kế website cùng người bạn, cùng sáng lập công ty chuyên về thiết kế website cho doanh nghiệp</p>
                        </div>
                      </div>
                    <div className={styles.x_timeline_item}>
                      <span className={styles.x_year_counter}>
                            Năm 2019
                      </span>
                      <div className={styles.x_timeline_content}>
                        <span className={styles.x_timebox_icon}>
                          <Image alt='layout' src={'/icons/Folder_copy_duotone.svg'} width={45} height={45}/>
                        </span>
                        <h4 className={styles.x_timeline_title}>Hợp tác – Mở rộng</h4>
                        <p>Gia nhập ngành thiết kế website cùng người bạn, cùng sáng lập công ty chuyên về thiết kế website cho doanh nghiệp</p>
                      </div>
                    </div>
                </div>
              </Col>
            </Row>
        </Container>
      </section>
      <section>
        <Container>
            <Row className={styles.x_flex_timeline}>
              <Col xs={24}>
                <h3 className={styles.x_about_title}>Quy trình dịch vụ</h3>
              </Col>
              <Col xs={24}>
                <Row className={styles.x_flex}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_step_working_item}>
                          <span className={styles.x_step_working_icon}>01</span>
                          <div className={styles.x_step_content}>
                            <h4 className={styles.x_step_title}>Phân tích yêu cầu</h4>
                            <p>Yêu cầu của khách hàng bắt đầu từ vấn đề cần giải pháp. Chúng tôi hướng đến giải quyết vấn đề của khách hàng</p>
                          </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_step_working_item}>
                          <span className={styles.x_step_working_icon}>02</span>
                            <div className={styles.stepne_content}>
                              <h4 className={styles.x_step_title}>Thống nhất hợp đồng dịch vụ</h4>
                              <p>Một giải pháp hợp lý khi giải quyết được vấn đề trong nguồn lực hợp lý, hiệu quả, đảm bảo tiến độ và ngân sách phù hợp</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_step_working_item}>
                          <span className={styles.x_step_working_icon}>03</span>
                          <div className={styles.x_step_content}>
                            <h4 className={styles.x_step_title}>Triển khai thực hiện dịch vụ</h4>
                            <p>Đội ngũ Kan Solutions làm việc dựa trên giải pháp và sự sáng tạo. Làm việc chuyên nghiệp, tận tậm để đảm bảo tiến độ.</p>
                          </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_step_working_item}>
                          <span className={styles.x_step_working_icon}>04</span>
                          <div className={styles.x_step_content}>
                            <h4 className={styles.x_step_title}>Khách hàng phản hồi và chỉnh sửa</h4>
                            <p>Phản hồi và điều chỉnh trên cơ sở sự hài lòng của khách hàng Ba thành phần phản hồi: Cấu trúc, thiết kế, nội dung</p>
                          </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_step_working_item}>
                          <span className={styles.x_step_working_icon}>05</span>
                          <div className={styles.x_step_content}>
                            <h4 className={styles.x_step_title}>Hướng dẫn bàn giao sản phẩm</h4>
                            <p>Bàn giao sản phẩm sau khi khách hàng hài lòng và thanh lý hợp đồng. Hướng dẫn và đào tạo sử dụng, quản trị hiệu quả</p>
                          </div>
                        </div>
                    </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className={styles.x_about_banner}>
                  <div className={styles.x_about_banner_content}>
                    <h2 className={styles.x_banner_title}>Thiết kế Website chuyên nghiệp cùng ưu đãi hàng trăm banner miễn phí</h2>
                    <Link href="/giao-dien">
                      <a>
                        <Button className={styles.x_black_button} style={{margin: 'auto'}}>
                          Thông tin chi tiết
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
        </Container>
      </section>
    </div>
    <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Đăng ký tư vấn các dịch vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AboutUs