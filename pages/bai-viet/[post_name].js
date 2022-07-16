import React from 'react'
import { Container, Row, Col, Breadcrumb } from 'rsuite';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/blog.module.css';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { IoPersonCircleOutline, IoTimeOutline } from "react-icons/io5";
import { BlogStyleTwo } from '../../components/blog-templates/BlogContent';
import Comments from '../../components/comment';

import {
  PinterestShareButton,
  PinterestIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'next-share'


const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const SocialLink = ({ title, description, media, url}) => {
  return(
    <>
    <ul className={styles.x_social_group}>
      <li>
          <FacebookShareButton
            url={title}
            quote={description}
          >
          <FacebookIcon size={38} round />
        </FacebookShareButton>
      </li>
      <li>
        <PinterestShareButton
          url={url}
          media={media}
          title={title}
          description={description}
        >
          <PinterestIcon size={38} round />
        </PinterestShareButton>
      </li>
      <li>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={38} round />
        </LinkedinShareButton>
      </li>
    </ul>
    </>
  )
}

const PostSingle = ({data}) => {
  if(data == undefined) return '';
  let miscValue =  data.yoast_head.json.twitter_misc ? Object.values(data.yoast_head.json.twitter_misc) : '';
    return (
      <>
        <Head>
          {
            HTMLReactParser(data.yoast_head.html.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) 
          }
        </Head>
        <div className={'x_breadcum_container'}>
          <Container>
              <Row>
                  <Col xs={24}>
                    <Breadcrumb className={'x_breadcumb'}>
                      <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                      <Breadcrumb.Item active>Tin tức {data.post_title}</Breadcrumb.Item>
                    </Breadcrumb>
                  </Col>
              </Row>
          </Container>
      </div>  
         <div className={styles.x_container_x}>
                  <Container>
                    <Row>
                        <Col xs={24} md={20}>
                            <div className={styles.x_blog_content}>
                              {
                                data.thumbnail ?
                                <span className={styles.x_single_blog_thumbnail}>
                                  <Image alt={data.post_title} src={data.thumbnail[0]} width={data.thumbnail[1]} height={data.thumbnail[2]}/>
                                </span> : '' 
                              }
                              <div className={styles.x_single_blog_meta}>
                                <h1 className={styles.x_post_title}>{data.post_title}</h1>
                                <ul className={styles.x_single_post_data}>
                                  <li><span><IoPersonCircleOutline size={16}/> Được viết bởi: </span> { miscValue[0] }</li>
                                  <li><span><IoTimeOutline size={16}/> Ước tính thời gian đọc: </span> { miscValue[1] }</li>
                                </ul>
                              </div>
                              <div className={styles.x_single_content}>
                                {
                                  HTMLReactParser(data.post_content)
                                }
                              </div>
                              <div className={styles.x_comment_form}>
                                <Comments data={data.comment} post_id={data.ID}/>
                              </div>
                            </div>
                        </Col>
                        <Col xs={24} md={4}>
                            <SocialLink 
                                title={data.post_title ? data.post_title : ''} 
                                description={data.post_excerpt ? data.post_excerpt : ''} 
                                media={data.thumbnail ? data.thumbnail : ''}
                              />
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
        </div>
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