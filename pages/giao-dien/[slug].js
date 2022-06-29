import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'
import Link from 'next/link'
import { Grid, Container, Row, Col, Button, Breadcrumb } from 'rsuite'
import Image from 'next/image'
import styles from '../../styles/theme.module.css'
import CopyIcon from '@rsuite/icons/Copy';
import CheckRoundIcon from '@rsuite/icons/CheckRound'
import SearchIcon from '@rsuite/icons/Search';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import { getSession } from 'next-auth/react'
import md5 from 'md5'
import FormTuVan from '../../components/FormTuVan'

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
                  {val.thumbnail ?  <span className={styles.x_layout_icons}><Image alt='layout' src={val.thumbnail} width={26} height={26}/></span> : '' }
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
 
function Price({data}) {
  if(data.sale_price) 
  return (
    <div className={styles.x_styles_price}>
      <span className={styles.x_old_price}>{Separator(data.regular_price)}đ</span>
      <span className={styles.x_newPrice}>{Separator(data.sale_price)}đ</span>
    </div>
  )
  return(
    <div className={styles.x_styles_price}>
      <span className={styles.simple}>{Separator(data.regular_price)}đ</span>
    </div>
  )
}

export const SingleTheme = ({data, link_theme}) => {

  const DanhMucNganh = data.nganh ? data.nganh : '';
  const ThemeInfor = data.themeinfor ? data.themeinfor : '';

  return (
    <>
      <Head>
        {
           HTMLReactParser(data.yoast_head.html)
        }
      </Head>
      <div className={'x_breadcum_container'}>
        <Grid className={'x-container'}>
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
        </Grid>      
    </div>
      <div className={styles.single_content}>
        <Grid className={'x-container'}>
          <Container className={styles.x_theme_container}>
            <Row className={styles.x_flex + ' ' + styles.x_theme_thumbnail_section}>
              <Col xs={24} md={16} className={styles.x_padding}>
                <div className={styles.x_theme_content}>
                  <div className={styles.x_single_theme_thumbnail}>
                    <Image src={data.thumbnail} width={800} height={575} alt={data.post_title}/>
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
                    <div className={styles.x_single_theme_section}>
                      <h2 className={styles.x_content_title}>Giới thiệu</h2>
                      <div className={styles.x_sing_theme_content}>
                        {HTMLReactParser(data.post_content)}
                      </div>
                    </div> : ''
                  }
                </div>
              </Col>
              <Col xs={24} md={8} className={styles.x_padding}>
                <div className={styles.x_single_theme_content}>
                  <h1 className={styles.x_title}>{data.post_title}</h1>
                    {
                      data.price ? 
                      <div className={styles.x_price_section}>
                        <Price data={data.price}/>
                      </div> : ''
                    }
                      {
                        data.layout ? <Layout data={data.layout}/> : ''
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
                    <div className={styles.x_single_theme_section}>
                  <h2 className={styles.x_content_title}>Thông tin tích hợp</h2>
                  {
                    data.nen_tang ? 
                    <div className={styles.x_tich_hop}>
                        <NenTang data={data.nen_tang} />
                    </div> : ''
                  }
                  <h2 className={styles.x_content_title}>Thông tin hỗ trợ</h2>
                   <FormTuVan title={'Đăng kỹ hỗ trợ giao diện ' + data.post_title}/>
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

export default SingleTheme;

export async function getServerSideProps(context) {
  // Create API
  const session = await getSession(context);
  const slug = context.params.slug;
  const res = await axios.get(ROOT_URL + 'giao-dien/single?slug=' + slug).then((resonse) => resonse.data);
  // Create API
  let CreateURI = '';
  if(session){
    const user_nicename = session.user.user_nicename
    const SITE_URL = process.env.ORIGINAL_URL;
    const API_KEY = res.ID + user_nicename;
    const HASH_API_KEY = md5(API_KEY);
    CreateURI = session ? SITE_URL + '/?theme_id=' + res.ID + '&user_name='+ user_nicename +'&public_key=' + HASH_API_KEY : '';
  }
  // Pass data to the page via props
  return { 
  props: { 
      data: res,
      link_theme: CreateURI
  }}
}