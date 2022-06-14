import { Grid, Container, Row, Col, Button } from 'rsuite'
import styles from '../../styles/services/wordpress.module.css'
import CheckIcon from '@rsuite/icons/Check'
import Image from 'next/image'
import Link from 'next/link'

const Wordpress = () => {
  return (
    <>
    <section className={styles.x_banner}>
        <Grid className='x-container'>
          <Container>
            <Row>
                <Col xs={24}>
                    <div className={styles.x_banner_content}>
                        <h3>Tối ưu chi phí vận hành</h3>
                        <h2>Tạo lập Webiste doanh nghiệp của bạn bằng wordpress</h2>
                        <Link href='/giao-dien-mau'>
                            <a>
                                <Button className={styles.x_call_to_action}>Click tạo trang</Button>
                            </a>
                        </Link>
                    </div>
                </Col>
            </Row>
           </Container>
        </Grid>
    </section>
    <section className={styles.x_why_choose}>
        <Grid className='x-container'>
          <Container>
            <Row className={styles.x_centered}>
                <Col xs={24} md={12}>
                    <div className={styles.x_why_choose_content}>
                        <h3>Tạo lập miễn phí</h3>
                        <h2>Miễn phí tạo trang và hàng trăm giao diện chất lượng cao</h2>
                        <ul className={styles.x_features}>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Không giới hạn trang</p></li>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Cập nhật miễn phí và liên tục</p></li>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Tích hợp quản lý dữ liệu, báo cáo hệ thống</p></li>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Tài liệu sử dụng</p></li>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>SEO toàn trang</p></li>
                        </ul>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <Image alt='layout' src={'/layout/web_creation-01.svg'} width={800} height={600}/>
                </Col>
            </Row>
           </Container>
        </Grid>
    </section>
    <section className={styles.x_why_choose}>
        <Grid className='x-container'>
          <Container>
            <Row className={styles.x_centered}>
                <Col xs={24} md={12}>
                    <div className={styles.x_supporter}>
                        <h3>Hỗ trợ 24/7</h3>
                        <h2>Hỗ trợ tận tâm, nhiệt tình với công việc</h2>
                        <ul className={styles.x_features}>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Lỗi hệ thống</p></li>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Nhắn tin trực tuyến</p></li>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Bảo mật hệ thống</p></li>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Phản hồi nhanh chóng</p></li>
                            <li><p><CheckIcon className={styles.x_features_icon} width={12} height={12}/>Diễn đàn hỗ trợ</p></li>
                        </ul>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <Image alt='layout' src={'/layout/helper-01.svg'} width={800} height={600}/>
                </Col>
            </Row>
           </Container>
        </Grid>
    </section>
    <section className={styles.x_services_container}>
        <Grid className='x-container'>
          <Container>
            <Row>
                <Col xs={24}>
                    <div className={styles.x_supporter}>
                        <h3 className={styles.services_title}>Lựa chọn dịch vụ</h3>
                        <h2 className={styles.services_main_title}>Xây dựng thương hiệu riêng cho bạn</h2>
                        <div className={styles.services}>
                            <Row>
                                <Col xs={24} md={8} className={styles.x_padding}>
                                    <div className={styles.x_services_content}>
                                        <h3 className={styles.x_services_content_title}>Website Landing Page</h3>
                                        <h2 className={styles.x_services_content_main_title}>Xây dựng kênh quảng bá sản phẩm nhanh</h2>
                                        <Button className={styles.x_services_button}>Đăng ký tư vấn</Button>
                                    </div>
                                </Col>
                                <Col xs={24} md={8} className={styles.x_padding}>
                                    <div className={styles.x_services_content}>
                                        <h3 className={styles.x_services_content_title}>Website Doanh Nghiệp</h3>
                                        <h2 className={styles.x_services_content_main_title}>Xây dựng thương hiệu doanh nghiệp</h2>
                                        <Button className={styles.x_services_button}>Đăng ký tư vấn</Button>
                                    </div>
                                </Col>
                                <Col xs={24} md={8} className={styles.x_padding}>
                                    <div className={styles.x_services_content}>
                                        <h3 className={styles.x_services_content_title}>Website Thương Mại</h3>
                                        <h2 className={styles.x_services_content_main_title}>Mở rộng quy mô phân phối sản phẩm</h2>
                                        <Button className={styles.x_services_button}>Đăng ký tư vấn</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
           </Container>
        </Grid>
    </section>
    <section className={styles.x_why_choose}>
        <Grid className='x-container'>
          <Container>
            <Row>
                <Col xs={24} md={12}>
                    <div className={styles.x_supporter}>
                        <h3>Đã có 100+ khách hàng sử dụng dịch vụ của chúng tôi</h3>
                    </div>
                </Col>
            </Row>
           </Container>
        </Grid>
    </section>
    </>
  )
}

export default Wordpress