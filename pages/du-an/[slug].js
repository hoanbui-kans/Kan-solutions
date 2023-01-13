import { useState } from 'react'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'
import Link from 'next/link'
import { Grid, Container, Row, Col, Button, Breadcrumb, Modal } from 'rsuite'
import Image from 'next/image'
import CheckRoundIcon from '@rsuite/icons/CheckRound'
import FormTuVan from '../../components/FormTuVan'
import { getSession } from 'next-auth/react'
import { SingleProject } from '../du-an'
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ServicesSubmitForm from '../../components/handleSubmitServices'
import CommentsUI from '../../components/comment'
import styles from '../../styles/theme.module.css'
import stylesPage from '../../styles/page.module.css'
import { listServices } from '../../pages/api/services'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';
// import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON;

export const Layout = ({data}) => {
  return (
    <ul className={styles.x_layout}>
      {
        data ?
        data.map((val) => {
          return(
            <li key={val.term_id}>
              <div className={styles.x_features_with_icon}> 
                <CheckRoundIcon className={styles.x_feature_icon} width={12} height={12} color={'#27ae60'}/>
                {val.name}</div>
            </li>
          )
        }) : ''
      }
    </ul>
  )
}

const Nganh = ({data}) => {
  return (
    <ul className={styles.x_layout_nganh}>
      {
        data ?
        data.map((val, index) => {
          return(
            <li key={index}>
              <div className={styles.x_layout_nganh_title}>
                <ArrowRightIcon width={14} height={14}/>
                <h3>{val.title}</h3>
              </div>
              <div className={styles.x_layout_nganh_content}>{HTMLReactParser(val.content)}</div>
            </li>
          )
        }) : ''
      }
    </ul>
  )
}

export const SinglePageProject = ({data}) => {
  const DanhMucNganh = data.nganh ? data.nganh : '';
  const [open, setOpen] = useState(false);  
  const [service, setService] = useState(''); 
 
  const handleOpen = (service) => {
     setService(service);
     setOpen(true)
  };
  const handleClose = () => setOpen(false);
  return <>
    <Head>
      {
         HTMLReactParser(data.yoast_head.html.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content"))
      }
    </Head>
    <div className={'x_breadcum_container'}>
      <Grid className={'x-container'}>
              <Container>
                  <Row>
                      <Col xs={24}>
                        <Breadcrumb className={'x_breadcumb'}>
                          <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                          <Breadcrumb.Item as={Link} href="/du-an/">Dự án</Breadcrumb.Item>
                          <Breadcrumb.Item active>{data.post_title}</Breadcrumb.Item>
                        </Breadcrumb>
                      </Col>
                  </Row>
              </Container>
      </Grid>      
  </div>
    <div className={styles.x_single_content}>
      <Grid className={'x-container'}>
        <Container className={styles.x_theme_container}>
          <Row className={styles.x_flex + ' ' + styles.x_theme_thumbnail_section}>
            <Col xs={24} md={16} className={styles.x_padding}>
              <div className={styles.x_theme_content}>
                  <div className={styles.x_single_theme_section}>
                    {
                      data.thumbnail ?  
                      <div className={styles.x_single_theme_thumbnail}>
                        <Image src={data.thumbnail[0]} width={data.thumbnail[1]} height={data.thumbnail[2]} alt={data.post_title}/>
                      </div>: ''
                    }
                    <h1 className={styles.x_title}>{data.post_title}</h1>
                    <p className={styles.x_single_theme_excerpt}>{data.post_excerpt}</p>
                  </div>
                  {
                      DanhMucNganh.length > 0 ? 
                        DanhMucNganh[0].layout ?
                        <div className={styles.x_single_theme_section}>
                          <h2 className={styles.x_content_title}>Cấu trúc layout</h2>
                            {
                              DanhMucNganh.map((val) => {
                                return(
                                  <div key={val.term_id} className={styles.x_nganh_section}>
                                    <Nganh data={val.layout}/>
                                  </div>
                                ) 
                              })
                            }
                        </div>
                        : ''
                      : ''
                }
                {
                  data.post_content ? 
                  <>
                  <div className={styles.x_single_theme_section + ' ' + styles.x_hide_mobile}>
                    <h2 className={styles.x_content_title}>Giới thiệu</h2>
                    <div className={styles.x_sing_theme_content}>
                      {HTMLReactParser(data.post_content)}
                    </div>
                    <div className={styles.x_comment_form}>
                      <CommentsUI data={data.comment} post_id={data.ID}/>
                    </div>
                  </div> 
                  </>
                  : ''
                }
                
              </div>
            </Col>
            <Col xs={24} md={8} className={styles.x_padding}>
              <div className={styles.x_single_theme_content}>
                <div className={styles.x_toolbar_button}>
                  <Button 
                      className={styles.x_create_button}
                      onClick={() => { handleOpen('Dịch vụ thiết kế website: ' + data.post_title) }}
                    >
                      Đăng ký tư vấn
                    </Button> 
                    <a href={data.project_view} target="_blank" rel="noreferrer">
                        <Button className={styles.x_view_button}> 
                          Xem dự án này
                        </Button>
                    </a>
                </div>  
                {
                  data.post_content ? 
                  <>
                  <div className={styles.x_single_theme_section + ' ' + styles.x_hide_desktop}>
                    <h2 className={styles.x_content_title}>Giới thiệu</h2>
                    <div className={styles.x_sing_theme_content}>
                      {HTMLReactParser(data.post_content)}
                    </div>
                    <div className={styles.x_comment_form}>
                      <CommentsUI data={data.comment} post_id={data.ID}/>
                    </div>
                  </div> 
                  </>
                  : ''
                }
                <h3 className={stylesPage.x_service_list_title}> Danh sách dịch vụ </h3>
                  {
                      listServices.map((val, index) => {
                          return (
                            <div className={stylesPage.x_dropbox} key={index}>
                                <Link href={val.link} className={stylesPage.x_iconLink}>

                                  <span className={stylesPage.x_iconImage}><Image alt='layout' src={val.image} width={24} height={24} /> </span>
                                  {val.name}
                                </Link>
                            </div>
                          );
                      })
                  }
                <div className={styles.x_single_theme_section}>
                  <h2 className={styles.x_content_title}>Thông tin hỗ trợ</h2>
                  <FormTuVan title={'Đăng kỹ hỗ trợ giao diện ' + data.post_title}/>
                </div>
              </div>
            </Col>
              {
                data.related.length != 0 ? 
                <Col xs={24}>
                  <h3 className={styles.x_related_gd_mau}>Giao diện mẫu tương tự</h3>
                  <Swiper
                        spaceBetween={30}
                        navigation={true}
                        slidesPerView={1}
                        pagination={{
                          clickable: true,
                        }}
                        breakpoints={{
                          552: {
                            slidesPerView: 1,
                          },
                          768: {
                            slidesPerView: 2,
                          },
                          992: {
                            slidesPerView: 3,
                          },
                        }}
                        modules={[Navigation, Pagination]}
                        className="layoutSwiper"
                      >
                      {
                        data.related.map((val) => {
                          return(
                              <SwiperSlide key={val.ID}>
                                  <SingleProject data={val}/>
                              </SwiperSlide>
                            )
                          })
                      }
                    </Swiper>
                </Col> : ''
              }
            </Row>
        </Container>
      </Grid>
    </div>
    <Modal open={open} onClose={handleClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Đăng ký dịch vụ thiết kế Website</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ServicesSubmitForm service={service}/>
      </Modal.Body>
    </Modal>
  </>;
}


export default SinglePageProject;

export async function getServerSideProps(context) {
  // Create API
  const session = await getSession(context);
  const slug = context.params.slug;
  const res = await axios.get(ROOT_URL + 'du-an/single?slug=' + slug).then((resonse) => resonse.data);
  // Pass data to the page via props
  return { 
  props: { 
      data: res,
  }}
}