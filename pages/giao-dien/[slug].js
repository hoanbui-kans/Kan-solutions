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
import Link from 'next/link'
import { Container, Row, Col, Button, Breadcrumb, Checkbox, CheckboxGroup, Modal, Panel } from 'rsuite'
import { getSession } from 'next-auth/react'
import md5 from 'md5'
import FormTuVan from '../../components/FormTuVan'
import { GD_Box } from '../giao-dien'
import ThemesSubmitForm from '../../components/handleSubmitTheme'
import Comments from '../../components/comment'
import { QA } from '../api/Qa'

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
  const listServices = data.services;

  const QA_List = QA(data.post_title)
  const site_url = process.env.NEXT_PUBLIC_SITE_URL;

  let QA_schema = '';
  QA_List.map((val, index) => {
    index == 0 ? 
    QA_schema += `{
      "@type": "Question",
      "name": "${val.question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<p>${val.answer}</p>"
      }
    }`: 
    QA_schema += `,{
      "@type": "Question",
      "name": "${val.question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<p>${val.answer}</p>"
      }
    }`;
  })

  const handleOpen = (title) => {
    setThemeTitle(title);
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

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

  return (
    <>
      <Head>
        { HTMLReactParser(data.yoast_head.html.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
        <script type="application/ld+json">
          {HTMLReactParser(`{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [${QA_schema}]
          }`)}
        </script>
        <script type="application/ld+json">
          {HTMLReactParser(`{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Giao diện mẫu",
              "item": "${site_url}/giao-dien"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "${data.post_title}",
              "item": "${site_url}/giao-dien/${data.post_name}"
            }]
          }`)}
        </script>
        <meta name="keywords" content={KeywordsMeta(data.keywords)}></meta>
      </Head>
      <div className={'x_breadcum_container'}>
        <Container>
              <Row>
                  <Col xs={24}>
                    <Breadcrumb className={'x_breadcumb'}>
                      <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                      <Breadcrumb.Item as={Link} href="/giao-dien-mau/">Giao diện mẫu</Breadcrumb.Item>
                      <Breadcrumb.Item active>{data.post_title}</Breadcrumb.Item>
                    </Breadcrumb>
                  </Col>
              </Row>
        </Container>
    </div>
      <div className={styles.single_content}>
          <Container className={styles.x_theme_container}>
            <Row className={styles.x_flex + ' ' + styles.x_theme_thumbnail_section}>
              <Col xs={24} md={16} className={styles.x_padding}>
                <div className={styles.x_theme_content}>
                    {
                      data.thumbnail ?  
                      <div className={styles.x_single_theme_thumbnail}>
                        <Image src={data.thumbnail[0]} width={data.thumbnail[1]} height={data.thumbnail[2]} alt={data.post_title}/>
                      </div>: ''
                    }
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
                      <div className={styles.x_comment_form}>
                        <Comments data={data}/>
                      </div>
                    </div>
                </div>
              </Col>
              <Col xs={24} md={8} className={styles.x_padding}>
                <div className={styles.x_single_theme_content}>
                  <h1 className={styles.x_title}>{data.post_title}</h1>
                    {
                      data.post_excerpt ? <><p>{data.post_excerpt}</p><hr /></>: '' 
                    }
                    {
                        data.layout ? <><Layout data={data.layout}/></>  : ''
                    }
                    <div className={styles.x_toolbar_button}>
                      {
                        link_theme ? 
                        <a href={link_theme}>
                            <Button className={styles.x_create_button}>
                              <CopyIcon width={16} height={16}/>
                                Tạo website
                            </Button> 
                        </a> :  
                        <Link href={'/dang-nhap'}>
                            <Button className={styles.x_create_button}>
                              <CopyIcon width={16} height={16}/>
                                Tạo website
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
                    <div className={styles.x_controler_services}>
                      <Button className={styles.x_booking_theme} onClick={() => {handleOpen('Đăng ký tư vấn mẫu giao diện' + data.post_title)}}>
                        Đặt mua mẫu này
                        </Button>
                      {
                        lastPrice ? 
                          <div className={styles.x_price_section}>
                            <Price data={lastPrice}/>
                          </div> : ''
                      }
                        <CheckboxGroup name="checkboxList" onChange={(e) => {setListService(e)}}>
                          {
                            data.services.map((val, index) => {
                              return (
                                <Checkbox value={val.service} key={index} style={{borderBottom: '1px dotted #e8e8e8'}}>
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
                </div>
              </Col>
                {
                  data.related.length != 0  ? 
                  <Col xs={24}>
                    <h3 className={styles.x_related_gd_mau}>Giao diện mẫu tương tự</h3>
                    {
                      data.related.map((val) => {
                        return(
                            <Col xs={24} md={8} key={val.ID}>
                                <GD_Box data={val} price={true}/>
                            </Col>
                          )
                        })
                    }
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
    </>
  )
}

export default SingleTheme;

export async function getServerSideProps(context) {
  // Create API
  const session = await getSession(context);
  const slug = context.params.slug;
  const res = await axios.get(ROOT_URL + 'giao-dien/single?slug=' + slug).then((resonse) => resonse.data);
  console.log(session);
  // Create API
  let CreateURI = '';
  if(session){
    const user_email = session.user.token.user_email;
    const SITE_URL = process.env.ORIGINAL_URL;
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