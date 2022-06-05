import React, { useEffect } from 'react'
import { Grid, Container, Row, Col, Panel, Breadcrumb, Form } from 'rsuite';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/blog.module.css';
import axios from 'axios';
import SearchIcon from '@rsuite/icons/Search'

import { BlogStyleOne, BlogStyleTwo } from '../components/blog-templates/BlogContent';

const rootURL = process.env.wp_json_enpoint;

const News = ({bai_viet, danh_muc}) => {

  if(bai_viet == undefined) return '';
    return (
      <Grid className={'x-container'}>
        <Breadcrumb className={styles.x_breadcumb}>
          <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item active>Tin tức</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
            <Row>
              <Col xs={24}>
                <h1 className={styles.x_wellcome_title}>
                  Cung cấp Thương mại điện tử cho các nhà lãnh đạo ngành 
                  <span className={styles.x_highlight}> hiện tại và tương lai</span>
                </h1>
              </Col>
            </Row>
            <Row className={styles.x_meta_with_form}>
              <Col xs={24} md={16}>
                <ul className={styles.x_category_link}>
                    {
                      danh_muc.map((val) => {
                        return (
                          <li key={val.term_id}>
                            <Link href={`/danh-muc/${val.slug}`}>
                                <a className={styles.x_filter_option}>
                                  {val.name}
                                </a>
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
              </Col>
              <Col xs={24} md={8}>
                    <Form>
                      <Form.Group className={styles.x_form_search_group}>
                        <Form.Control 
                          type="text"
                          value={EventTarget.value}
                          placeholder={'Tìm kiếm bài viết...'}
                          className={styles.x_form_search_posts}
                        />
                        <button className={styles.x_search_posts_button}>
                          <SearchIcon width={22} height={22} />
                        </button>
                      </Form.Group>
                    </Form>
              </Col>
            </Row>
            <Row className={styles.x_flex_news}>
                {
                  bai_viet.map((val, index) => {
                    return(
                      index == 0 ? 
                      <Col className={styles.x_padding_posts} xs={24} key={val.ID}>
                        <BlogStyleOne data={val} />
                      </Col>
                      :
                      <Col className={styles.x_padding_posts} xs={24} md={12} lg={8} key={val.ID}>
                        <BlogStyleTwo data={val} />
                      </Col>
                    )
                })
              }
            </Row>
          </Container>
        </Grid>
    )
}

export default News

export async function getServerSideProps() {

  const res = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=7').then((resonse) => resonse.data);

  // Pass data to the page via props
  return { props: { 
    bai_viet: res.posts,
    danh_muc: res.terms
 }}
}