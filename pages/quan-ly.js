import { useEffect, useState } from 'react'
import 
{ 
    Container,
     Row,
     Col,
     Form,
     Button,
     ButtonToolbar,
     Sidenav,
     Progress,
     Pagination,
     SelectPicker
} from 'rsuite'
import 
{ 
    IoAlbumsOutline, 
    IoAddSharp, 
    IoLinkOutline, 
    IoCalendarClearOutline,
    IoBuild,
    IoCafeSharp, 
    IoBookmark,
    IoCalendarOutline 
} from "react-icons/io5";
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; 
import moment from 'moment';
import { getSession } from 'next-auth/react';
import styles from '../styles/account.module.css'
import UserNav from '../components/user-manager/UserNav';
import { RateUser } from './api/services';
import MenuIcon from '@rsuite/icons/Menu';
import { locales } from './api/locales';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Head from 'next/head';
import HTMLReactParser from 'html-react-parser';
import { HomePageSeo } from './api/HeaderSeo';
import { GD_Box } from './giao-dien';

import 'moment/locale/vi';

const Chart = dynamic(
  () => {
    return ( import('react-apexcharts') )
  },
  { ssr: false }
)

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

export const BlogContent = ({data}) => {

    const [LineStroke, setLineStroke] = useState({
        strokeColor: '#4caf50',
        status: 'success'
    });
    const [percent, setPercent] = useState('');
    const SiteIcon = data.site_icon && data.site_icon != 'empty' ? data.site_icon : '/icons/favicon.png'
    const StoreAvaiable = parseInt(data.quota);
    const DisplayAvaiableUpload = StoreAvaiable < 1024 ? StoreAvaiable + 'mb' : (StoreAvaiable/1024) + 'gb';
    const Uploaded = parseInt(data.upload);
    const DisplayUploaded = Uploaded < 1024 ? Uploaded + 'mb' : (Uploaded/1000) + 'gb'
    const Remain = StoreAvaiable - Uploaded;
    const registed = new Date(data.registered);
    const expired = data.get_expire ? new Date(parseInt(data.get_expire, 10) * 1000) : '';
    const current = new Date();
    const DateRegisted = moment(registed).format('LL');

    const expiredDate = expired ? moment(expired).format('LL') : '';

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

    const site_lever = RateUser.filter((value) => {
        if(value.lever == data.lever){
            return value;
        }
    })[0];

    useEffect(() => {
        let total = expired - registed;
        let progress = current - registed;
        let percentNumber =  Math.round(progress/ total * 100 );
        if(percentNumber > 100) {
            percentNumber = 100;
        }
    
        if(percentNumber >= 0 && percentNumber <= 50){
            setLineStroke({
                strokeColor: '#4caf50',
                status: 'success'
            });
        } else if(percentNumber> 50 && percentNumber <= 75){
            setLineStroke({
                strokeColor: '#ffd864',
                status: 'active'
            });
        } else if(percentNumber > 75 && percentNumber <= 100){
            setLineStroke({
                strokeColor: '#f44336',
                status: 'fail'
            });
        } else {
            setLineStroke({
                strokeColor: '#b02318',
                status: 'fail'
            });
        }
        
        setPercent(percentNumber);

    }, [percent])

    return(
        <div className={styles.x_blog}>
            <Row>
                <Col xs={24} md={12}>
                    <a className={styles.x_blog_link} target={'_blank'} rel="noreferrer" href={data.home}>
                        <IoLinkOutline size={18} color='#999'/>
                    </a>
                    <div className={styles.x_blog_content}>
                        <div className={styles.x_flex_blog_image}>
                            <span className={styles.x_blog_favicon}>
                                <Image width={40} height={40} alt={data.blogname} src={ SiteIcon } />
                            </span>
                            <div className={styles.x_blog_flex_content}>
                                <Link href={'/quan-ly/quan-ly-trang/site?id=' + data.blog_id}>
                                    <a>
                                        <h3>{data.blogname}</h3>
                                    </a>
                                </Link>
                                {site_lever ?
                                    <p style={{
                                        display: 'inline-block',
                                        padding: '3px',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '5px'
                                    }}><IoBookmark/>  
                                    {site_lever.name}
                                </p> : 
                                ''
                                }
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
                                <p className={styles.x_blog_meta_title}><IoCalendarOutline /> Sử dụng đến:</p>
                                <span className={styles.x_date_badge}>{expiredDate ? expiredDate : "Không giới hạn"}</span>
                            </div>
                        </div>
                        <Progress.Line percent={parseInt(percent ? percent : 0)} strokeColor={LineStroke.strokeColor}/>
                        <ButtonToolbar style={{marginBottom: 15}}>
                            <Link href={'/quan-ly/thanh-toan/nang-cap?site_id=' + data.blog_id}>
                                <a>
                                    <Button className={styles.x_upgrade_button}>
                                        <IoBuild />
                                        Nâng cấp website
                                    </Button>
                                </a>
                            </Link>
                            <Link href={'/quan-ly/thanh-toan/gia-han?site_id=' + data.blog_id}>
                            <Button className={styles.x_extend_button}>
                                <IoCafeSharp />
                                Gia hạn
                            </Button>
                            </Link>
                        </ButtonToolbar>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className={styles.x_blog_chart}>
                        <Chart options={chartValue.options} labels={chartValue.labels} series={chartValue.series} type="donut" width={180} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const UserManager = ({blogInfor, user, Themes}) => {
    const [ limit, setLimit ] = useState(10);
    const [ page, setPaged ] = useState(1);
    const [ selectedSite, setSectedSite ] = useState([]);

    const Next_Pages = async (num) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        setPaged(num);
    }

    const sites = blogInfor.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    let countEmpty = 0;
    for (const key in user) {
        if (Object.hasOwnProperty.call(user, key)) {
            const element = user[key];
            if(element == ''){
                countEmpty++;
            }
        }
    }

    const [expanded, setExpanded] = useState(true);
    const [showMobileNav, setShowMobileNav] = useState(false);
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
    if( countEmpty > 4 ){
        Router.push('/quan-ly/cap-nhat-thong-tin')
    }
  }, [true]);

  useEffect(() => {
    dimensions.width <= 992 ? setShowMobileNav(false) : setShowMobileNav(true); 
  }, [dimensions]);


    // Title picker
    let selectDataTitle = [{
        "label": 'Chọn tất cả trang web',
        "value": 'all',
        "role": "Master"
    }];

    let newDataTitle = [];

    blogInfor.map((val) => {
        newDataTitle.push({
            name: val.blogname ? val.blogname : 'Chưa có tiêu đề' + ' - ' + val.blog_id,
            id: val.blog_id,
        });
    })

    newDataTitle.map((val) => {
        selectDataTitle.push({
            "label": val.name,
            "value": val.id,
            "role": "Master"
        })
    })

    const handleSelectBlogName = (blog_id) => {
        if(blog_id == 'all' || blog_id == null){
            setSectedSite('');
            return;
        }
        const selectedSite = blogInfor.filter((val) => {
            if(val.blog_id == blog_id){
                return val;
            }
        });
        setSectedSite(selectedSite);
    }
  return (
    <>
    <Head>
      { HTMLReactParser(HomePageSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
    </Head>
    <section className={styles.x_app_section}>
        <Container>
            <Row>
                <Col xs={24} md={!expanded ? 2 : 6}>
                    <Button 
                        onClick={() => {setShowMobileNav(!showMobileNav)}} 
                        className={styles.x_mobile_menu_button} 
                        style={{width: '100%'}}
                    >   
                        <MenuIcon />
                         Menu quản lý
                    </Button>
                    {
                        showMobileNav ?
                        <div className={styles.x_account_nav}>
                            <Sidenav expanded={expanded}>
                                <Sidenav.Body>
                                    <UserNav active={'quan-ly'} expanded={expanded}/>
                                    <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
                                    <Button 
                                        className={styles.x_nav_mobile_close_button}
                                        onClick={() => {setShowMobileNav(!showMobileNav)}} 
                                        appearance="primary" 
                                        style={{width: '100%'}}
                                        >
                                        Đóng
                                    </Button>
                                </Sidenav.Body>
                            </Sidenav> 
                        </div> : ''
                    }
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                    <Row className={styles.x_create_section}>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <Form>
                                <Form.Group className={styles.x_form_search_container}>
                                    <SelectPicker locale={locales.Picker} className={styles.x_custom_picker} onChange={handleSelectBlogName} data={selectDataTitle} style={{ width: '100%' }} />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <Row>
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
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles.x_flex}>
                        {
                        blogInfor.length > 0 ? 
                            <>
                                {
                                    selectedSite.length == 0 ?
                                    <>
                                        {  
                                            sites.map((val, index) => {
                                                return (
                                                    <Col key={index} xs={24} md={12} lg={24} className={styles.x_padding}>
                                                        <BlogContent data={val} /> 
                                                    </Col>  
                                                )
                                            })
                                        }
                                        <div style={{ padding: 20, margin: 'auto' }}>
                                            <Pagination
                                                prev
                                                next
                                                first
                                                last
                                                ellipsis
                                                boundaryLinks
                                                locale={locales.Pagination}
                                                maxButtons={5}
                                                total={blogInfor.length}
                                                limitOptions={[10, 20, 30, 40, 50]}
                                                limit={limit}
                                                activePage={page}
                                                onChangePage={Next_Pages}
                                            />
                                        </div>
                                    </>
                                    : 
                                    <>
                                        {  
                                            selectedSite.map((val, index) => {
                                                return (
                                                    <Col key={index} xs={24} md={12} lg={24} className={styles.x_padding}>
                                                        <BlogContent data={val} /> 
                                                    </Col>  
                                                )
                                            })
                                        }
                                    </>
                                }
                            </>
                            : 
                            <>
                                <Row>
                                    {
                                        Themes.map((val, index) => {
                                            return(
                                                <Col xs={12} md={8} key={index}>
                                                    <GD_Box data={val} price={false}/>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default UserManager

export async function getServerSideProps (context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';

  const config_user = {
      headers: {
        'Authorization':  `Bearer ${token}`
      }
    }
  
  const response_user = await axios.post( rootURL + 'user-info/detail', false , config_user ).then((res) => {
      return res.data
     }).catch(function (error) {
  });

  let response = [];
  const config = {
    headers: { 
      'Authorization':  `Bearer ${token}`
    }
  };

  response = await axios.post(rootURL + 'quan-ly/tai-khoan', false, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
  });

  let Themes = [];  
  if(!response){
     Themes = await axios.get(rootURL + 'giao-dien/giao-dien-mau?p=1').then((res) => res.data ? res.data : []);
  }

  return { props: {
    blogInfor:  response ? response : [],
    Themes: Themes ? Themes : [],
    user: response_user ? response_user.user : '',
  }};
}