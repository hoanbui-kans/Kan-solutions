import React from 'react'
import { Grid, Container, Row, Col, Breadcrumb } from 'rsuite';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/blog.module.css';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import ServicesSiderbar from '../../components/ServicesSiderbar'; 
import { BlogStyleTwo } from '../../components/blog-templates/BlogContent';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const CRM = ({data}) => {
  if(data == undefined) return '';
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
                        <Breadcrumb.Item active>{data.post_title}</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                </Row>
            </Container>
        </Grid>    
      </div>  
         <div className={styles.x_container_x}>
            <Grid className={'x-container'}>
                  <Container>
                    <Row>
                        <Col xs={24} md={18}>
                            <div className={styles.x_blog_content}>
                              <span className={styles.x_single_blog_thumbnail}>
                                <Image alt='layout' src={data.thumbnail ? data.thumbnail : '/'} width={1000} height={600}/>
                              </span>
                              <div className={styles.x_single_blog_meta}>
                                <h1 className={styles.x_post_title}>{data.post_title}</h1>
                              </div>
                              <div className={styles.x_single_content}>
                                {
                                  HTMLReactParser(data.post_content)
                                }
                              </div>
                            </div>
                        </Col>
                        <Col xs={24} md={6}>
                              <ServicesSiderbar title={data.post_title}/>
                        </Col>
                    </Row>
                      {
                        data.related ? 
                        <div className={styles.x_related}>
                          <Row>
                            <Col xs={24}>
                              <h3 className={styles.x_related_title}>Bài viết tương tự</h3>
                            </Col>
                            {
                              data.related.map((val, index) => {
                                return (
                                  <Col key={index} md={8} xs={24}>
                                   <BlogStyleTwo key={val.ID} data={val}/>
                                  </Col>
                                )
                              })
                            }
                          </Row>
                        </div> : ''
                      }
                </Container>
              </Grid>
        </div>
      </>
    )
}

export default CRM

export async function getServerSideProps(context) {
  const post_name = 'crm-doanh-nghiep';
  const res = await axios.get(`${rootURL}dich-vu/bai?slug=${post_name}`).then((resonse) => resonse.data);
  // Pass data to the page via props
  return { props: { 
    data: res,
 }}
}