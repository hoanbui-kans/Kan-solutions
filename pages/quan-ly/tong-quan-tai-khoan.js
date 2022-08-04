import { useState } from 'react'
import { Container, Row, Col, Navbar, Nav, Form, Button, ButtonToolbar, Toggle, Sidenav } from 'rsuite'
import { IoLogOutOutline, IoSearchOutline, IoAlbumsOutline, IoAddSharp, IoLinkOutline, IoBookmarkOutline, IoCalendarClearOutline, IoCalendarOutline } from "react-icons/io5";
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/vi'
import dynamic from 'next/dynamic'
import { getSession } from 'next-auth/react';
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav';

const Chart = dynamic(
  () => {
    return ( import('react-apexcharts') )
  },
  { ssr: false }
)

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const BlogContent = ({data}) => {
    const SiteIcon = data.site_icon && data.site_icon != 'empty' ? data.site_icon : '/icons/favicon.png'
    const StoreAvaiable = parseInt(data.quota);
    const DisplayAvaiableUpload = StoreAvaiable < 1000 ? StoreAvaiable + 'mb' : (StoreAvaiable/1000) + 'gb'
    
    const Uploaded = parseInt(data.upload);
    const DisplayUploaded = Uploaded < 1000 ? Uploaded + 'mb' : (Uploaded/100) + 'gb'
    const Remain = StoreAvaiable - Uploaded;

    const expired = new Date(parseInt(data.get_expire, 10) * 1000);
    const current = new Date();
    const DateRegisted = moment(data.registered).format('LL');
    const expiredDate = moment(expired).format('LL');

    const expiredClass = current <= expired ? styles.x_danger : styles.x_success;

    const chartValue = {
        options: { 
            colors: ['#e74c3c', '#2d88e2'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                stroke: {
                    show: false,
                }
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
        <div className={styles.x_blog}>
            <a className={styles.x_blog_link} target={'_blank'} rel="noreferrer" href={data.home}>
                <IoLinkOutline size={18} color='#999'/>
            </a>
            <div className={styles.x_blog_content}>
                <div className={styles.x_flex_blog_image}>
                    <span className={styles.x_blog_favicon}>
                        <Image width={40} height={40} alt={data.blogname} src={ SiteIcon } />
                    </span>
                    <div className={styles.x_blog_flex_content}>
                        <a target={'_blank'} rel="noreferrer" href={data.home}><h3>{data.blogname}</h3></a>
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
                                <span>Bài viết:</span><strong>{data.post_count}</strong>
                            </div>
                    </div>
                </div>
                <div className={styles.x_blog_meta}>
                    <div>
                        <p className={styles.x_blog_meta_title}><IoCalendarClearOutline /> Ngày đăng ký:</p> 
                        <span className={styles.x_date_badge}>{ DateRegisted }</span>
                    </div>
                    <div className={expiredClass}>
                        <p className={styles.x_blog_meta_title}><IoCalendarOutline /> Hến hạn:</p>
                        <span className={styles.x_date_badge}>{expiredDate}</span>
                    </div>
                </div>
                <div className={styles.x_blog_chart}>
                    <Chart options={chartValue.options} labels={chartValue.labels} series={chartValue.series} type="donut" width="180" />
                </div>
            </div>
        </div>
    )
}
const Dashboard = ({blogInfor}) => {
  const [expanded, setExpanded] = useState(true);
  const[showMobileNav, setShowMobileNav] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    window.addEventListener("resize", handleResize, false);
  }, [true]);

  useEffect(() => {
    dimensions.width <= 992 ? setShowMobileNav(false) : setShowMobileNav(true); 
  }, [dimensions]);

  return (
    <>
    <section className={styles.x_app_section}>
        <Container>
            <Row>
                <Col xs={24} md={!expanded ? 2 : 6}>
                    <div className={styles.x_account_nav}>
                        <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
                            <Sidenav.Body>
                            <UserNav expanded={expanded}/>
                            <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
                            </Sidenav.Body>
                        </Sidenav>
                    </div>
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
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
                                    <Link href={'/giao-dien'}>
                                        <a className={styles.x_account_button}>
                                            <Button className={styles.x_outline_view}>
                                                <IoAlbumsOutline size={20}/>
                                                Xem mẫu giao diện
                                            </Button>
                                        </a>
                                    </Link>
                                </Col>
                                <Col xs={12}>
                                    <Link href={'/giao-dien'}>
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
                    <Row className={styles.x_flex}>
                        {
                            blogInfor ? 
                                blogInfor.map((val, index) => {
                                return (
                                    <Col key={index} xs={24} md={12} lg={expanded ? 12 : 8} className={styles.x_padding}>
                                        <BlogContent data={val} /> 
                                    </Col>  
                                )
                                }) : <p style={{textAlign: 'center', width: '100%', padding: '35px 0px'}}>
                                        Bạn chưa có trang nào, vui lòng tạo mới
                                    </p>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Dashboard

export async function getServerSideProps (context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';
  const config = {
    headers: { 
      'Authorization':  `Bearer ${token}`
    }
  };
  const URL =  rootURL + 'quan-ly/tai-khoan';
  let response = '';

  response = await axios.post(URL, false, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });

  return { props: {
      blogInfor:  response ? response : '',
      token: token ? token : 'Không có'
  }};
}