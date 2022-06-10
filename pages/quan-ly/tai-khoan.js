import React, { useState } from 'react'
import { Grid, Container, Row, Col, Navbar, Nav, Form, Button, ButtonToolbar } from 'rsuite'
import { IoLogOutOutline, IoSearchOutline, IoAlbumsOutline, IoAddSharp, IoLinkOutline, IoBookmarkOutline, IoCalendarClearOutline, IoCalendarOutline } from "react-icons/io5";
import axios from 'axios'
import styles from '../../styles/account.module.css'
import Link from 'next/link'
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/vi'
import dynamic from 'next/dynamic'

const Chart = dynamic(
  () => {
    return (  import('react-apexcharts') )
  },
  { ssr: false }
)

const rootURL = process.env.wp_json_enpoint;

const UserManager = ({data, token}) => {
  console.log(token);
  return (
    <>
    <div className={styles.x_app_header}>
        <Grid className={styles.x_app_container}>
            <Container>
                <Row>
                    <Col xs={24}>
                        <Navbar className={styles.x_app_nav}>
                            <Navbar.Brand className={styles.x_brand} as={'div'}>QUẢN LÝ TÀI KHOẢN</Navbar.Brand>
                                <Nav>
                                <Link href={'/quan-ly/home'}>
                                    <Nav.Item as={'span'}>Quản lý thông tin</Nav.Item>
                                </Link>
                                
                                <Nav.Item>Thông báo mới</Nav.Item>
                                <Nav.Item>Hướng dẫn sử dụng</Nav.Item>
                                <Nav.Menu title="Dịch vụ">
                                    <Nav.Item>Company</Nav.Item>
                                    <Nav.Item>Team</Nav.Item>
                                    <Nav.Menu title="Contact">
                                    <Nav.Item>Via email</Nav.Item>
                                    <Nav.Item>Via telephone</Nav.Item>
                                    </Nav.Menu>
                                </Nav.Menu>
                                </Nav>
                                <Nav pullRight>
                                <Nav.Item icon={<IoLogOutOutline />}>Đăng xuất</Nav.Item>
                                </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </Grid>
    </div>
    <section className={styles.x_app_section}>
        <Grid className={styles.x_app_container}>
            <Container>
                <Row className={styles.x_create_section}>
                    <Col xs={24} md={12} className={styles.x_padding}>
                        <Form>
                            <Form.Group className={styles.x_form_search_container}>
                                <Form.Control className={styles.x_search_page_input} name='s' value={EventTarget.value} placeholder='Tìm kiếm trang...'></Form.Control>
                                <Button className={styles.x_search_page_button}>
                                    <IoSearchOutline size={20}/>
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={24} md={12} className={styles.x_padding}>
                        <div className={styles.x_flex}>
                            <Col xs={12}>
                                <Link href={'/giao-dien-mau'}>
                                    <a className={styles.x_account_button}>
                                        <Button className={styles.x_outline_view}>
                                            <IoAlbumsOutline size={20}/>
                                            Xem mẫu giao diện
                                        </Button>
                                    </a>
                                </Link>
                            </Col>
                            <Col xs={12}>
                                <Link href={'/giao-dien-mau'}>
                                    <a className={styles.x_account_button}>
                                        <Button className={styles.x_outline_create}>
                                            <IoAddSharp size={20}/>
                                            Tạo trang mới
                                        </Button>
                                    </a>
                                </Link>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {
                        data ? 
                        data.map((val) => {
                            
                            const SiteIcon = val.site_icon && val.site_icon != 'empty' ? val.site_icon : '/icons/favicon.png'
                            const StoreAvaiable = parseInt(val.quota);
                            const DisplayAvaiableUpload = StoreAvaiable < 1000 ? StoreAvaiable + 'mb' : (StoreAvaiable/1000) + 'gb'
                            
                            const Uploaded = parseInt(val.upload);
                            const DisplayUploaded = Uploaded < 1000 ? Uploaded + 'mb' : (Uploaded/100) + 'gb'
                            const Remain = StoreAvaiable - Uploaded;

                            const expired = new Date(parseInt(val.get_expire, 10) * 1000);

                            const DateRegisted = moment(val.registered).format('LL');
                            const expiredDate = moment(expired).format('LL');

                            const chartValue = {
                                options: { 
                                    colors: ['#e74c3c', '#2d88e2'],
                                    legend: {
                                        position: 'bottom',
                                        horizontalAlign: 'center',
                                      },
                                dataLabels: {
                                    enabled: true,
                                    position: 'bottom',
                                    style:{
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        color: '#000'
                                    },
                                    background: {
                                        enabled: true,
                                        foreColor: '#333',
                                        padding: 4,
                                        borderRadius: 2,
                                    },
                                    dropShadow: {
                                        enabled: false,
                                        top: 1,
                                        left: 1,
                                        blur: 1,
                                        color: '#000',
                                        opacity: 0.45
                                    }
                                  },
                                  labels: ['Đã tải lên', 'Còn trống'],
                                  theme: {
                                    mode: 'light', 
                                    palette: 'palette1', 
                                    monochrome: {
                                        enabled: false,
                                        color: '#255aee',
                                        shadeTo: 'light',
                                        shadeIntensity: 0.65
                                    },
                                }
                                },
                                series: [Uploaded, Remain],
                            }
                            return(
                                <Col key={val.blog_id} xs={24} md={12} lg={8} className={styles.x_padding}>
                                    <div className={styles.x_blog}>
                                        <a className={styles.x_blog_link} target={'_blank'} rel="noreferrer" href={val.home}>
                                            <IoLinkOutline size={18} color='#999'/>
                                        </a>
                                        <div className={styles.x_blog_content}>
                                            <div className={styles.x_flex_blog_image}>
                                                <span className={styles.x_blog_favicon}>
                                                    <Image width={40} height={40} alt={val.blogname} src={ SiteIcon } />
                                                </span>
                                                <div className={styles.x_blog_flex_content}>
                                                    <a target={'_blank'} rel="noreferrer" href={val.home}><h3>{val.blogname}</h3></a>
                                                </div>
                                            </div>
                                            <div className={styles.x_flex_qouta}>
                                                <div className={styles.x_flex_qouta_content}>
                                                    <div>
                                                     <span>Giới hạn:</span><strong>{DisplayAvaiableUpload}</strong>
                                                    </div>
                                                </div>
                                                <div className={styles.x_flex_qouta_content}>
                                                    <div>
                                                    <span>Đã tải lên:</span><strong>{DisplayUploaded}</strong>
                                                    </div>
                                                </div>
                                                <div className={styles.x_flex_qouta_content}>
                                                        <div>
                                                            <span>Bài viết:</span><strong>{val.post_count}</strong>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className={styles.x_blog_meta}>
                                                <div>
                                                    <p className={styles.x_blog_meta_title}><IoCalendarClearOutline /> Ngày đăng ký:</p> 
                                                    <span className={styles.x_date_badge}>{ DateRegisted }</span>
                                                </div>
                                                <div>
                                                    <p className={styles.x_blog_meta_title}><IoCalendarOutline /> Hến hạn:</p>
                                                    <span className={styles.x_date_badge}>{expiredDate}</span>
                                                </div>
                                            </div>
                                            <div className={styles.x_blog_chart}>
                                                <Chart options={chartValue.options} labels={chartValue.labels} series={chartValue.series} type="donut" width="180" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        }) : 'Bạn chưa có trang nào, vui lòng tạo mới'
                    }
                </Row>
            </Container>
        </Grid>
    </section>
    </>
  )
}

export default UserManager

export const getServerSideProps = async ({ req, res }) => {
  const cookies = await getCookie('user', { req, res});
  const token = cookies ? JSON.parse(cookies).token : '';
  console.log(token);
  var config = {
    method: 'post',
    url:  `${rootURL}quan-ly/tai-khoan`,
    headers: { 
      'Authorization':  `Bearer ${token}`
    }
  };

  const response =  await axios(config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
    console.log(error);
    });

  return { props: {
      data:  response ? response : '',
      token: token ? token : 'Không có'
  }};
}