import { useEffect, useState } from 'react'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/theme.module.css'
import CopyIcon from '@rsuite/icons/Copy';
import CheckRoundIcon from '@rsuite/icons/CheckRound'
import SearchIcon from '@rsuite/icons/Search';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import { IoQrCodeOutline } from "react-icons/io5";
import Close from '@rsuite/icons/Close'

import Link from 'next/link'
import { Container, Row, Col, Button, Breadcrumb, Checkbox, CheckboxGroup, Modal, Panel, AutoComplete } from 'rsuite'
import { getSession } from 'next-auth/react'
import md5 from 'md5'
import FormTuVan from '../../components/FormTuVan'
import { GD_Box } from '../giao-dien'
import ThemesSubmitForm from '../../components/handleSubmitTheme'
import CommentsUI from '../../components/comment'
import { QA } from '../api/Qa'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';
import { QRCode } from 'react-qrcode-logo';

// import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const favicon = require('../../public/favicon.png')
const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON;

export function Separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

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

export const NenTang = ({data}) => {
  return (
    <ul className={styles.x_danh_muc_plugin}>
      {
        data.map((val) => {
          return (
            <li key={val.term_id}>
              <Link href={`/danh-muc/${val.slug}`}>
                <a className={styles.x_plugin_content}>
                  {val.thumbnail ?  <span className={styles.x_layout_icons}><Image alt={val.name} src={val.thumbnail} width={26} height={26}/></span> : '' }
                  <span> {val.name} </span>
                </a>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}
 
export const Price = ({data}) => {
  let salePercent; 
  if(data.sale_price){
    salePercent = Math.round(100 - (parseInt(data.sale_price)/parseInt(data.regular_price)*100));
    return (
      <div className={styles.x_styles_price}>
        <span className={styles.x_old_price + ' ' + 'old_price'}>{Separator(data.regular_price)}đ</span>
        <span className={styles.x_newPrice + ' ' + 'new_price'}>{Separator(data.sale_price)}đ</span>
        <span className={styles.x_sale_badge + ' ' + 'sale_badge'}>-{salePercent}%</span>
      </div>
    )
  }
  if(data.regular_price == 0){
    return(
      <div className={styles.x_styles_price}>
        <span className={'free_x'}>miễn phí</span>
      </div>
    )
  }
  return(
    <div className={styles.x_styles_price}>
      <span className={styles.simple + ' ' + 'simple_price'}>{Separator(data.regular_price)}đ</span>
    </div>
  )
}

export const SingleTheme = ({data, link_theme}) => {

  const PriceTheme = data.price;
  const DanhMucNganh = data.nganh ? data.nganh : '';
  const ThemeInfor = data.themeinfor ? data.themeinfor : '';
  const [services, setListService] = useState([]);
  const [lastPrice, setLastPrice] = useState(PriceTheme);
  const [selectedServices, setSelectedService] = useState([]);
  // Tên giao diện
  const [themeTitle, setThemeTitle] = useState(''); 
  const [open, setOpen] = useState(false);  
  const [openQr, setOpenQr] = useState(false);

  const listServices = data.services;

  const QA_List = QA(data.post_title)
  const site_url = process.env.NEXT_PUBLIC_SITE_URL;

  let QA_schema = [];
  QA_List.map((val, index) => {
    index == 0 ? 
    QA_schema.push({
      "@type": "Question",
      "name": val.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": val.answer
      }
    }): 
    QA_schema.push({
      "@type": "Question",
      "name": val.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": val.answer
      }
    });
  })

  const handleOpen = (title) => {
    setThemeTitle(title);
    setOpen(true)
  };

  const handleClose = () => setOpen(false);

  const handleOpenQr = () => {
    setOpenQr(true)
  };
  const handleCloseQr = () => setOpenQr(false);

  useEffect(() => {
    let selected_services = [];
    listServices.map(keyIndex => {
      services.map((val) => {
        if(keyIndex.service == val){
          selected_services.push(keyIndex);
        }
      })
    });
    setSelectedService(selected_services);
  }, [services])

  useEffect(() => {
    if(PriceTheme.sale_price){
      let regular_price = parseInt(PriceTheme.regular_price);
      let sale_price = parseInt(PriceTheme.sale_price);
      selectedServices.map((val) => {
        val.price ? regular_price += parseInt(val.price) : '';
        val.price ? sale_price += parseInt(val.price) : '';
      });
      setLastPrice({
        regular_price: regular_price,
        sale_price: sale_price,
      });
    } else {
      let regular_price = parseInt(PriceTheme.regular_price);
      selectedServices.map((val) => {
        val.price ? regular_price += parseInt(val.price) : '';
      });
      setLastPrice({
        regular_price: regular_price,
      });
    }
  }, [selectedServices])

  const KeywordsMeta = (keywords) => {
    let listkeywords = '';
    keywords.map((val, index) => {
      index != keywords.length - 1 ?
        listkeywords += val.name + ', '
        : 
        listkeywords += val.name + ''
    });
    return listkeywords
  }

  const FAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      QA_schema
    ]
  };

  const BreadCumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Giao diện mẫu",
      "item": site_url + "/giao-dien"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": data.post_title,
      "item": site_url + "/giao-dien/${data.post_name}"
    }]
  } 

  return (
    <>
      <Head>
        { HTMLReactParser(data.yoast_head.html.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQSchema)}}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadCumbSchema)}} />

      </Head>
      <div className={'x_breadcum_container'}>
        <Container>
              <Row>
                  <Col xs={24}>
                    <Breadcrumb className={'x_breadcumb'}>
                      <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                      <Breadcrumb.Item as={Link} href="/giao-dien/">Giao diện mẫu</Breadcrumb.Item>
                      <Breadcrumb.Item active>{data.post_title}</Breadcrumb.Item>
                    </Breadcrumb>
                  </Col>
              </Row>
        </Container>
    </div>
      <div className={styles.single_content}>
          <Container className={styles.x_theme_container}>
            <Row className={styles.x_theme_thumbnail_section}>
              <Col xs={24} md={16}>
                <div className={styles.x_theme_content}>
                    {
                      data.thumbnail ?  
                      <div className={styles.x_single_theme_thumbnail}>
                        <Image src={data.thumbnail[0]} width={data.thumbnail[1]} height={data.thumbnail[2]} alt={data.post_title}/>
                      </div>: ''
                    }
                    <div className={styles.x_hide_mobile}>
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
                        <div className={styles.x_single_theme_section}>
                          {
                          data.post_content ? 
                            <>
                              <h2 className={styles.x_content_title}>Giới thiệu</h2>
                              <div className={styles.x_sing_theme_content}>
                                {HTMLReactParser(data.post_content)}
                              </div>
                            </>
                            : ''
                          }
                          <div className={styles.x_Qa_section}>
                            <h2 className={styles.x_content_title}>Thông tin tư vấn</h2>
                              {
                                  QA_List ? QA_List.map((val, index) => {
                                      return(
                                          <Panel 
                                          style={{width: '100%', marginBottom: 15}} 
                                          key={index} 
                                          header={<h3 className={styles.x_Qa_section_title}><HelpOutlineIcon /> {val.question}</h3>} 
                                          collapsible 
                                          bordered>
                                            <p>{val.answer}</p>
                                        </Panel>
                                      )
                                  }) : '' 
                                }
                          </div>
                        </div>
                    </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className={styles.x_single_theme_content}>
                  <h1 className={styles.x_title}>{data.post_title}</h1>
                    {
                      data.post_excerpt ? <><p>{data.post_excerpt}</p><hr /></>: '' 
                    }
                    {
                        data.layout ? <><Layout data={data.layout}/></>  : ''
                    }

                    <div className={styles.x_qr_code_button} onClick={handleOpenQr}>
                      <IoQrCodeOutline size={26}/>
                      <strong>Quét mã để khởi tạo</strong>
                    </div>

                    <div className={styles.x_toolbar_button}>
                      {
                        link_theme ? 
                        <a href={link_theme}>
                            <Button className={styles.x_create_button}>
                              <CopyIcon width={16} height={16}/>
                                Sử dụng mẫu này
                            </Button> 
                        </a> :  
                        <Link href={'/dang-nhap'}>
                            <Button className={styles.x_create_button}>
                              <CopyIcon width={16} height={16}/>
                                Đăng nhập tài khoản
                            </Button> 
                        </Link>
                      }
                      <Link href={'/giao-dien/xem-giao-dien/' + data.post_name}>
                        <a>
                          <Button className={styles.x_view_button}>
                            <SearchIcon width={16} height={16}/>
                              Xem giao diện mẫu
                          </Button>
                        </a>
                      </Link>
                    </div>   
                    <div className={styles.x_seperator_booking}>
                      <span>Hoặc</span>
                    </div>
                    <p style={{fontSize: 14}}>Triển khai sử dụng dịch vụ thiết kế Website trọn gói dành cho doanh nghiệp</p>
                    <div className={styles.x_controler_services}>
                      <Button className={styles.x_booking_theme} onClick={() => {handleOpen('Đăng ký tư vấn mẫu giao diện' + data.post_title)}}>
                        Đặt mua mẫu này
                      </Button>
                        <strong>Tổng chi phí giao diện</strong>
                      {
                        lastPrice ? 
                          <div className={styles.x_price_section}>
                            <Price data={lastPrice}/>
                          </div> : ''
                      }
                        <h5 style={{color: 'rgb(91 91 91)', fontSize: '14px', textAlign: 'center', marginBottom: 5}}>Kết hợp với dịch vụ</h5>
                        <Panel bordered style={{marginBottom: 25}}>
                        <CheckboxGroup name="checkboxList" onChange={(e) => {setListService(e)}}>
                          {
                            listServices.map((val, index) => {
                              return (
                                <Checkbox 
                                  value={val.service} 
                                  key={index} 
                                  style={{borderBottom: index < listServices.length - 1 ? '1px dotted #e8e8e8' : ""}}
                                >
                                  <Row>
                                    <Col xs={16}>
                                      {val.service}
                                    </Col>
                                    <Col xs={8}>
                                      <div className={styles.x_services_price}>
                                        { Separator(val.price) }đ
                                      </div>
                                    </Col>
                                  </Row>
                                </Checkbox>
                              )
                            })
                          }
                        </CheckboxGroup>
                        </Panel>
                    </div>
                   <div className={styles.x_single_theme_section}>
                      {
                        data.nen_tang ? 
                        <>
                          <h2 className={styles.x_content_title}>Thông tin tích hợp</h2>
                          <div className={styles.x_tich_hop}>
                              <NenTang data={data.nen_tang} />
                          </div>
                        </> : ''
                      } 
                  <h2 className={styles.x_content_title}>Thông tin hỗ trợ</h2>
                   <FormTuVan title={'Đăng kỹ hỗ trợ giao diện ' + data.post_title}/>
                  </div>
                  <div className={styles.x_hide_desktop}>
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
                        <div className={styles.x_single_theme_section}>
                          {
                          data.post_content ? 
                            <>
                              <h2 className={styles.x_content_title}>Giới thiệu</h2>
                              <div className={styles.x_sing_theme_content}>
                                {HTMLReactParser(data.post_content)}
                              </div>
                            </>
                            : ''
                          }
                          <div className={styles.x_Qa_section}>
                            <h2 className={styles.x_content_title}>Thông tin tư vấn</h2>
                              {
                                  QA_List ? QA_List.map((val, index) => {
                                      return(
                                        <Panel 
                                        style={{width: '100%', marginBottom: 15}} 
                                        key={index} 
                                        header={<h3 className={styles.x_Qa_section_title}><HelpOutlineIcon /> {val.question}</h3>} 
                                        collapsible 
                                        bordered>
                                          <p>{val.answer}</p>
                                        </Panel>
                                      )
                                  }) : '' 
                                }
                          </div>
                        </div>
                    </div>
                </div>
              </Col>
              <Col xs={24}>
                <div className={styles.x_comment_form}>
                  <CommentsUI data={data}/>
                </div>
              </Col>
                {
                  data.related.length != 0  ? 
                  <Col xs={24}>
                    <div className={styles.x_related_container}>
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
                                    <GD_Box data={val} price={true}/>
                                </SwiperSlide>
                              )
                            })
                        }
                      </Swiper>
                    </div>      
                  </Col> : ''
                }
              </Row>
          </Container>
      </div>
      <Modal open={open} onClose={handleClose} backdrop="static" size={'lg'}>
        <Modal.Header>
          <Modal.Title>Đặt mẫu {data.post_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ThemesSubmitForm title={themeTitle} selectedService={selectedServices} lastPrice={lastPrice}/>
        </Modal.Body>
      </Modal>
      <Modal open={openQr} onClose={handleCloseQr} backdrop="static">
        <Modal.Header>
          <Modal.Title>
            <strong>Quét mã này trên ứng dụng để khởi tạo</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={styles.x_qrcode_container}> 
              <div className={styles.x_qrcode_content}>
                <QRCode
                  value={data.post_name}
                  qrStyle={'dots'}
                  size={300}
                  removeQrCodeBehindLogo={true}
                  logoImage={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTEwLTI2VDE3OjE5OjUxKzA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0xMC0yNlQxNzozMzo0NiswNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0xMC0yNlQxNzozMzo0NiswNzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUJGREUwMkE1NTE5MTFFRDlFRDg5NTI1OEI4QTA0REQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUJGREUwMkI1NTE5MTFFRDlFRDg5NTI1OEI4QTA0REQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RS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"}
                 // Color for each eye
                  eyeColor={'#56abff'}
                  ecLevel="H"
                  eyeRadius={[
                    [10, 10, 0, 10], // top/left eye
                    [10, 10, 10, 0], // top/right eye
                    [10, 0, 10, 10], // bottom/left
                  ]}
                />
              </div>
              <small style={{ display: 'block', margin: '10px auto', maxWidth: 280 }}><span style={{color: 'red'}}>*</span> Sử dụng ứng dụng quản lý của Kan Solution trên các thiết bị di động</small>
              <div className={styles.x_flex_container_download}>
                <Image src={'/appstore.png'} width={120} height={36} alt="google" quality={100}/>
                <Image src={'/googleplay.png'} width={120} height={36} alt="google" quality={100}/>
              </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SingleTheme;

export async function getServerSideProps(context) {
  // Create API
  const session = await getSession(context);
  const slug = context.params.slug;
  const res = await axios.get(ROOT_URL + 'giao-dien/single?slug=' + slug).then((resonse) => resonse.data);
  // Create API
  let CreateURI = '';
  if(session){
    const user_email = session.user.token.user_email;
    const SITE_URL = process.env.NEXT_PUBLIC_ORIGINAL_URL;
    const API_KEY = res.ID + user_email;
    const HASH_API_KEY = md5(API_KEY);
    CreateURI = session ? SITE_URL + '/?theme_id=' + res.ID + '&user_email='+ user_email +'&public_key=' + HASH_API_KEY : '';
  }
  // Pass data to the page via props
  return { 
  props: { 
      data: res,
      link_theme: CreateURI
  }}
}