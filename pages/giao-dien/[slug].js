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

import Link from 'next/link'
import { Container, Row, Col, Button, Breadcrumb, Checkbox, CheckboxGroup, Modal, Panel, AutoComplete } from 'rsuite'
import FormTuVan from '../../components/FormTuVan'
import { GD_Box } from '../giao-dien'
import ThemesSubmitForm from '../../components/handleSubmitTheme'
import CommentsUI from '../../components/comment'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';
import { QRCode } from 'react-qrcode-logo';

// import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const favicon = require('../../public/favicon.png')

export function Separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

export const Layout = ({data}) => { 
  return (
    <>
    <h3 className={styles.x_layout_title}>Các tính năng chính</h3>
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
    </>
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
              <Link href={`/danh-muc/${val.slug}`} className={styles.x_plugin_content}>

                {val.thumbnail ?  <span className={styles.x_layout_icons}><Image alt={val.name} src={val.thumbnail} width={26} height={26}/></span> : '' }
                <span> {val.name} </span>

              </Link>
            </li>
          );
        })
      }
    </ul>
  );
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
  const [services, setListService] = useState([]);
  const [lastPrice, setLastPrice] = useState(PriceTheme);
  const [selectedServices, setSelectedService] = useState([]);
  // Tên giao diện
  const [themeTitle, setThemeTitle] = useState(''); 
  const [open, setOpen] = useState(false);  
  const [openQr, setOpenQr] = useState(false);

  const listServices = data.services;

  const QA_List = QA(data.post_title)

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

  const FAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      QA_schema
    ]
  };

  return <>
    <Head>
      { HTMLReactParser(data.yoast_head.html.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQSchema)}}/>
    </Head>
    <div className={'x_breadcum_container'}>
      <Container>
            <Row>
                <Col xs={24}>
                  <Breadcrumb className={'x_breadcumb'}>
                    <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} href="/giao-dien/">Giao diện mẫu</Breadcrumb.Item>
                    <Breadcrumb.Item active>{HTMLReactParser(data.post_title)}</Breadcrumb.Item>
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
                  <div className={styles.x_single_theme_section}>
                    <h1 className={styles.x_title}>{HTMLReactParser(data.post_title)}</h1>
                      {
                        data.post_excerpt ? <><p>{data.post_excerpt}</p><hr /></>: '' 
                      }
                  </div>
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
                  {
                      data.layout ?
                      <>
                        <Layout data={data.layout}/>
                      </>  : ''
                  }
                  <div className={styles.x_qr_code_button} onClick={handleOpenQr}>
                    <IoQrCodeOutline size={26}/>
                    <strong>Quét mã để khởi tạo</strong>
                  </div>

                  <div className={styles.x_toolbar_button}>
                    {/* {
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
                    } */}
                    <Link href={'/giao-dien/xem-giao-dien/' + data.post_name}>

                      <Button className={styles.x_view_button}>
                        <SearchIcon width={16} height={16}/>
                          Xem giao diện mẫu
                      </Button>

                    </Link>
                  </div>   
                  <div className={styles.x_seperator_booking}>
                    <span>Hoặc</span>
                  </div>
                  <p style={{fontSize: 14}}>Triển khai sử dụng dịch vụ thiết kế Website trọn gói dành cho doanh nghiệp</p>
                  <div className={styles.x_controler_services}>
                    <Button className={styles.x_booking_theme} onClick={() => {handleOpen('Đăng ký tư vấn mẫu giao diện' + HTMLReactParser(data.post_title))}}>
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
                 <FormTuVan title={'Đăng kỹ hỗ trợ giao diện ' + HTMLReactParser(data.post_title)}/>
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
                      </div>
                  </div>
              </div>
            </Col>
            <Col xs={24}>
              <div className={styles.x_single_theme_section}>
                  <div className={styles.x_comment_form}>
                    <CommentsUI data={data}/>
                  </div>
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
        <Modal.Title>Đặt mẫu {HTMLReactParser(data.post_title)}</Modal.Title>
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
                logoImage={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMy4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZGlzcGxheTpub25lO30NCgkuc3Qxe2Rpc3BsYXk6aW5saW5lO2ZpbGw6IzBFM0NBNTt9DQoJLnN0MntmaWxsOiMyRDg4RTI7fQ0KCS5zdDN7ZmlsbDojRkZGRkZGO30NCgkuc3Q0e2ZpbGw6IzU5NTk1OTt9DQo8L3N0eWxlPg0KPGc+DQoJPGc+DQoJCTxnIGNsYXNzPSJzdDAiPg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE5Mi45LDMyMmw0LjYtNS45YzMsMi42LDYuMiwzLjksOS43LDMuOWMyLjIsMCwzLjQtMC44LDMuNC0yLjJ2LTAuMWMwLTEuMy0xLTIuMS01LTMuMQ0KCQkJCWMtNi4zLTEuNi0xMS4zLTMuNS0xMS4zLTEwLjF2LTAuMWMwLTYsNC40LTEwLjMsMTEuNi0xMC4zYzUuMSwwLDksMS41LDEyLjMsNC4zbC00LjEsNi4zYy0yLjctMi4xLTUuNy0zLjItOC40LTMuMg0KCQkJCWMtMiwwLTMsMC45LTMsMi4xdjAuMWMwLDEuNCwxLjEsMi4yLDUuMiwzLjFjNi45LDEuNiwxMS4xLDQsMTEuMSwxMC4xdjAuMWMwLDYuNi00LjgsMTAuNS0xMi4xLDEwLjUNCgkJCQlDMjAxLjUsMzI3LjMsMTk2LjYsMzI1LjUsMTkyLjksMzIyeiIvPg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyMS41LDMxNC40TDIyMS41LDMxNC40YzAtNy4yLDUuNC0xMy4xLDEyLjgtMTMuMXMxMi43LDUuOSwxMi43LDEzdjAuMWMwLDcuMS01LjQsMTMtMTIuOCwxMw0KCQkJCVMyMjEuNSwzMjEuNiwyMjEuNSwzMTQuNHogTTIzOS4xLDMxNC40TDIzOS4xLDMxNC40YzAtMy4xLTItNS43LTQuOS01LjdjLTIuOSwwLTQuOCwyLjUtNC44LDUuNXYwLjFjMCwzLDIsNS42LDQuOSw1LjYNCgkJCQlDMjM3LjMsMzE5LjksMjM5LjEsMzE3LjQsMjM5LjEsMzE0LjR6Ii8+DQoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjUwLjYsMjkzLjFoOC4xdjMzLjdoLTguMVYyOTMuMXoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNjMuMSwzMTguMnYtMTYuM2g4LjF2MTMuNWMwLDIuOCwxLjMsNC4yLDMuMyw0LjJjMS45LDAsMy40LTEuNCwzLjQtNC4ydi0xMy41aDguMXYyNC45aC04LjF2LTMuNA0KCQkJCWMtMS41LDIuMS0zLjYsNC02LjksNEMyNjYsMzI3LjMsMjYzLjEsMzIzLjksMjYzLjEsMzE4LjJ6Ii8+DQoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjkxLjcsMzE5di0xMC4ySDI4OXYtNy4xaDIuN3YtNi4zaDguMXY2LjNoNS40djcuMWgtNS40djguNGMwLDEuOCwwLjcsMi41LDIuMiwyLjVjMS4xLDAsMi4xLTAuMywzLjEtMC44DQoJCQkJdjYuOWMtMS41LDAuOS0zLjQsMS40LTUuNiwxLjRDMjk0LjUsMzI3LjMsMjkxLjcsMzI1LDI5MS43LDMxOXoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMDguNiwyOTMuMWg4LjR2Ni41aC04LjRWMjkzLjF6IE0zMDguOCwzMDEuOGg4LjF2MjQuOWgtOC4xVjMwMS44eiIvPg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMyMC41LDMxNC40TDMyMC41LDMxNC40YzAtNy4yLDUuNC0xMy4xLDEyLjgtMTMuMWM3LjQsMCwxMi43LDUuOSwxMi43LDEzdjAuMWMwLDcuMS01LjQsMTMtMTIuOCwxMw0KCQkJCUMzMjUuOCwzMjcuNCwzMjAuNSwzMjEuNiwzMjAuNSwzMTQuNHogTTMzOC4xLDMxNC40TDMzOC4xLDMxNC40YzAtMy4xLTItNS43LTQuOS01LjdjLTIuOSwwLTQuOCwyLjUtNC44LDUuNXYwLjENCgkJCQljMCwzLDIsNS42LDQuOSw1LjZDMzM2LjIsMzE5LjksMzM4LjEsMzE3LjQsMzM4LjEsMzE0LjR6Ii8+DQoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzQ5LjQsMzAxLjhoOC4xdjMuNWMxLjUtMi4xLDMuNi00LjEsNi45LTQuMWM0LjksMCw3LjksMy41LDcuOSw5LjJ2MTYuM2gtOC4xdi0xMy41YzAtMi44LTEuMy00LjItMy4yLTQuMg0KCQkJCWMtMiwwLTMuNCwxLjQtMy40LDQuMnYxMy41aC04LjFWMzAxLjh6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cmVjdCB4PSIxLjQiIHk9IjE2NiIgY2xhc3M9InN0MiIgd2lkdGg9IjE2OS44IiBoZWlnaHQ9IjE2OS44Ii8+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMzYuNSwyNzcuMWwtMTAuNywxMS4xdjIyLjVINjFMMzYuNSwyNzcuMXoiLz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTQ2LjgsMTkxLjJoLTEyMXY2OS4xbDQyLTQ1LjNoMjguN2wtNDQsNDUuOGwzNi44LDQ5LjhoNTcuNFYxOTEuMnoiLz4NCgkJCTwvZz4NCgkJPC9nPg0KCTwvZz4NCgk8Zz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTIxNC4xLDE3My4yaDI2Ljd2NDIuMmwzMy4xLTQyLjJoMzEuNmwtMzYuNCw0NC44bDM3LjcsNTkuM2gtMzJsLTI0LjItMzguNmwtOS44LDExLjd2MjYuOWgtMjYuNw0KCQkJTDIxNC4xLDE3My4yTDIxNC4xLDE3My4yeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzMyLjEsMjU0LjJ2LTAuM2MwLTE2LjYsMTEuNy0yNS4zLDI5LjItMjUuM2M3LDAsMTMuNiwxLjUsMTcuOSwzLjF2LTEuM2MwLTguMy00LjgtMTMuMS0xNC45LTEzLjENCgkJCWMtNy45LDAtMTMuOSwxLjYtMjAuNSw0LjVsLTUuNC0xOS45YzguNC0zLjcsMTcuMy02LjMsMzAuMS02LjNjMTMuMywwLDIyLjQsMy40LDI4LjMsOS44YzUuNiw1LjksOCwxNC4zLDgsMjUuNnY0Ni4ySDM3OXYtOC4zDQoJCQljLTUuMSw2LjEtMTIsMTAuMS0yMS45LDEwLjFDMzQzLDI3OSwzMzIuMSwyNzAuMywzMzIuMSwyNTQuMnogTTM3OS40LDI0OC4xdi0zLjdjLTIuNi0xLjItNi4zLTIuMS0xMC4yLTIuMWMtNy43LDAtMTIsNC0xMiwxMA0KCQkJdjAuM2MwLDUuNSwzLjgsOC44LDkuMiw4LjhDMzc0LjIsMjYxLjMsMzc5LjQsMjU2LjMsMzc5LjQsMjQ4LjF6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MzQuMywxOTYuOGgyNi4xdjExLjNjNC44LTYuNywxMS43LTEzLjEsMjIuMy0xMy4xYzE2LDAsMjUuMywxMS4yLDI1LjMsMjkuNnY1Mi42aC0yNi4xdi00My41DQoJCQljMC04LjktNC4zLTEzLjUtMTAuNC0xMy41Yy02LjUsMC0xMSw0LjYtMTEsMTMuNXY0My42aC0yNi4xVjE5Ni44TDQzNC4zLDE5Ni44eiIvPg0KCTwvZz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMjE1LjIsMzI0LjhsMy4xLTMuN2MyLjIsMS44LDQuNCwyLjksNy4xLDIuOWMyLjIsMCwzLjQtMC44LDMuNC0yLjJ2LTAuMWMwLTEuMy0wLjgtMi00LjgtMw0KCQkJCWMtNC44LTEuMi03LjktMi42LTcuOS03LjJ2LTAuMWMwLTQuMywzLjQtNy4xLDguMy03LjFjMy41LDAsNi40LDEuMSw4LjgsM2wtMi43LDMuOWMtMi4xLTEuNS00LjEtMi4zLTYuMi0yLjNzLTMsMC45LTMsMi4xdjAuMQ0KCQkJCWMwLDEuNiwxLDIsNS4xLDMuMWM0LjgsMS4zLDcuNSwzLDcuNSw3LjF2MC4xYzAsNC43LTMuNiw3LjQtOC43LDcuNEMyMjEuNiwzMjguNiwyMTgsMzI3LjMsMjE1LjIsMzI0Ljh6Ii8+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMjYxLDMxOS4yTDI2MSwzMTkuMmMwLTUuMyw0LjItOS41LDkuOS05LjVjNS42LDAsOS44LDQuMSw5LjgsOS40djAuMWMwLDUuMi00LjIsOS40LTkuOSw5LjQNCgkJCQlDMjY1LjIsMzI4LjYsMjYxLDMyNC41LDI2MSwzMTkuMnogTTI3NS41LDMxOS4yTDI3NS41LDMxOS4yYzAtMi43LTEuOS01LjEtNC44LTUuMWMtMi45LDAtNC43LDIuMi00LjcsNC45djAuMQ0KCQkJCWMwLDIuNywxLjksNSw0LjgsNUMyNzMuOCwzMjQuMiwyNzUuNSwzMjIsMjc1LjUsMzE5LjJ6Ii8+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMzA2LjksMzAzLjVoNS4xdjI0LjdoLTUuMVYzMDMuNXoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0zMzksMzIxLjh2LTExLjhoNS4xdjEwLjFjMCwyLjQsMS4xLDMuNywzLjEsMy43YzIsMCwzLjItMS4zLDMuMi0zLjd2LTEwLjFoNS4xdjE4LjFoLTUuMXYtMi42DQoJCQkJYy0xLjIsMS41LTIuOCwyLjktNS4zLDIuOUMzNDEuMiwzMjguNiwzMzksMzI2LDMzOSwzMjEuOHoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0zODMuNCwzMjMuMXYtOC42aC0yLjJWMzEwaDIuMnYtNC42aDUuMXY0LjZoNC4zdjQuNGgtNC4zdjcuOGMwLDEuMiwwLjUsMS44LDEuNywxLjhjMC45LDAsMS44LTAuMiwyLjUtMC42DQoJCQkJdjQuMWMtMS4xLDAuNi0yLjMsMS00LjEsMUMzODUuNSwzMjguNSwzODMuNCwzMjcuMywzODMuNCwzMjMuMXoiLz4NCgkJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik00MTcuMywzMDMuNWg1LjR2NC42aC01LjRWMzAzLjV6IE00MTcuNSwzMTAuMWg1LjF2MTguMWgtNS4xVjMxMC4xeiIvPg0KCQkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTQ0OC45LDMxOS4yTDQ0OC45LDMxOS4yYzAtNS4zLDQuMi05LjUsOS45LTkuNWM1LjYsMCw5LjgsNC4xLDkuOCw5LjR2MC4xYzAsNS4yLTQuMiw5LjQtOS45LDkuNA0KCQkJCUM0NTMuMSwzMjguNiw0NDguOSwzMjQuNSw0NDguOSwzMTkuMnogTTQ2My40LDMxOS4yTDQ2My40LDMxOS4yYzAtMi43LTEuOS01LjEtNC44LTUuMWMtMi45LDAtNC43LDIuMi00LjcsNC45djAuMQ0KCQkJCWMwLDIuNywxLjksNSw0LjgsNUM0NjEuNywzMjQuMiw0NjMuNCwzMjIsNDYzLjQsMzE5LjJ6Ii8+DQoJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNNDkxLjMsMzEwLjFoNS4xdjIuNmMxLjItMS41LDIuOC0yLjksNS4zLTIuOWMzLjksMCw2LjIsMi41LDYuMiw2Ljd2MTEuOGgtNS4xdi0xMC4xYzAtMi40LTEuMS0zLjctMy4xLTMuNw0KCQkJCXMtMy4yLDEuMy0zLjIsMy43djEwLjFoLTUuMUw0OTEuMywzMTAuMUw0OTEuMywzMTAuMXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K"}
               // Color for each eye
                eyeColor={'#56abff'}
                ecLevel="H"
                eyeRadius={[
                  [0, 0, 0, 0], // top/left eye
                  [0, 0, 0, 0], // top/right eye
                  [0, 0, 0, 0], // bottom/left
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
  </>;
}

export default SingleTheme;