import React from 'react'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'
import Link from 'next/link'
import { Grid, Container, Row, Col, Button, Form, Input, ButtonToolbar, Breadcrumb } from 'rsuite'
import Image from 'next/image'
import styles from '../../styles/theme.module.css'

import CopyIcon from '@rsuite/icons/Copy';
import CheckRoundIcon from '@rsuite/icons/CheckRound'
import SearchIcon from '@rsuite/icons/Search';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';

const rootURL = process.env.wp_json_enpoint

function Separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

function Layout({data}){
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


function Nganh({data}) {
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

const NenTang = ({data}) => {
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

const SingleTheme = ({data}) => {

  const DanhMucNganh = data.nganh ? data.nganh : '';
  const ThemeInfor = data.themeinfor ? data.themeinfor : '';

  return (
    <>
      <Head>
        {
           HTMLReactParser(data.yoast_head.html)
        }
      </Head>
      <div className={styles.single_content}>
        <Grid className={'x-container'}>
          <Breadcrumb className={styles.x_breadcumb}>
            <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item as={Link} href="/giao-dien-mau/">Giao diện mẫu</Breadcrumb.Item>
            <Breadcrumb.Item active>{data.post_title}</Breadcrumb.Item>
          </Breadcrumb>
          <Container className={styles.x_theme_container}>
            <Row className={styles.x_flex + ' ' + styles.x_theme_thumbnail_section}>
              <Col xs={24} md={16} className={styles.x_padding}>
                <div className={styles.x_single_theme_thumbnail}>
                  <Image src={data.thumbnail} width={800} height={480} alt={data.post_title}/>
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
                      <Button className={styles.x_create_button} onClick={() => { console.log('create ' + ThemeInfor.id)}}>
                        <CopyIcon width={16} height={16}/>
                        Tạo website
                      </Button>
                      <Link href={ThemeInfor.link}>
                        <a>
                          <Button className={styles.x_view_button}>
                            <SearchIcon width={16} height={16}/>
                            Xem giao diện mẫu
                          </Button>
                        </a>
                      </Link>
                    </div>  
                </div>
              </Col>
              </Row>
              <Row>
              <Col xs={24} md={16} className={styles.x_padding}>
                <div className={styles.x_single_theme_section}>
                  <h2 className={styles.x_content_title}>Cấu trúc layout</h2>
                  {
                      DanhMucNganh ? 
                      DanhMucNganh.map((val) => {
                        return(
                          <div key={val.term_id} className={styles.x_nganh_section}>
                          <h3 className={styles.x_nganh_title}>{val.name}</h3>
                            <Nganh data={val.layout}/>
                          </div>
                        ) 
                      })
                      : ''
                  }
                </div>
                <div className={styles.x_single_theme_section}>
                  <h2 className={styles.x_content_title}>Giới thiệu</h2>
                  <div className={styles.x_sing_theme_content}>
                    {HTMLReactParser(data.post_content)}
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8} className={styles.x_padding}>
              <div className={styles.x_single_theme_section}>
                  <h2 className={styles.x_content_title}>Thông tin tích hợp</h2>
                  {
                    data.nen_tang ? 
                    <div className={styles.x_tich_hop}>
                        <NenTang data={data.nen_tang} />
                    </div> : ''
                  }
                  <h2 className={styles.x_content_title}>Thông tin hỗ trợ</h2>
                  <Form layout="horizontal" fluid> 
                    <Form.Group>
                      <Form.ControlLabel></Form.ControlLabel>
                      <Form.Control name='name' value={EventTarget.value} placeholder='Nhập tên của bạn...' type='text' />
                    </Form.Group>
                    <Form.Group>
                      <Form.ControlLabel></Form.ControlLabel>
                      <Form.Control name='email' value={EventTarget.value} placeholder='Nhập địa chỉ Email...' type='email' />
                    </Form.Group>
                    <Form.Group>
                      <Form.ControlLabel></Form.ControlLabel>
                      <Input value={EventTarget.value} as="textarea" name='content' />
                    </Form.Group>
                    <Form.Group>
                      <ButtonToolbar>
                        <Button appearance="primary">Gửi đi</Button>
                      </ButtonToolbar>
                    </Form.Group>
                  </Form>
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
  const slug = context.params.slug;
  const res = await axios.get(rootURL + 'giao-dien/single?slug=' + slug).then((resonse) => resonse.data);
  // Pass data to the page via props
  return { 
  props: { 
      data: res,
  }}
}