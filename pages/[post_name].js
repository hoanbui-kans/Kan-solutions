import React from 'react'
import { Grid, Container, Row, Col, Breadcrumb } from 'rsuite';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/blog.module.css';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';

const rootURL = process.env.wp_json_enpoint;

const PostSingle = ({data}) => {
  if(data == undefined) return '';
  let miscValue = Object.values(data.yoast_head.json.twitter_misc);
    return (
      <>
      <Head>
        {
          HTMLReactParser(data.yoast_head.html)
        }
      </Head>
      <Grid className={'x-container'}>
        <Breadcrumb className={styles.x_breadcumb}>
          <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item active>Tin tức {data.post_title}</Breadcrumb.Item>
        </Breadcrumb>
            <Container>
              <Row>
                  <Col xs={24}>
                    <ul className={styles.x_single_post_data}>
                      <li><span>Được viết bởi: </span> { miscValue[0] }</li>
                      <li><span>Ước tính thời gian đọc: </span> { miscValue[1] }</li>
                    </ul>
                    <Image alt='layout' src={data.thumbnail} width={800} height={500}/>
                  </Col>
                  <Col xs={18}>
                    <div className={styles.x_single_content}>
                      {
                        HTMLReactParser(data.post_content)
                      }
                    </div>
                  </Col>
              </Row>
          </Container>
        </Grid>
        </>
    )
}

export default PostSingle

export async function getServerSideProps(context) {
  const { post_name }  = context.query;
  const res = await axios.get(`${rootURL}tin-tuc/bai?slug=${post_name}`).then((resonse) => resonse.data);
  // Pass data to the page via props
  return { props: { 
    data: res,
 }}
}