import React, { useState } from 'react'
import { Container, Row, Col, Sidenav, Panel, Breadcrumb } from 'rsuite';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import UserNav from '../../../components/user-manager/UserNav';
import styles from '../../../styles/account.module.css'
import Link from 'next/link';
import TableOfContent from '../../../components/tableOfContent';
const rootURL = process.env.NEXT_PUBLIC_WP_JSON;


const SingleGuilde = ({data}) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
    <Head>
      {
        HTMLReactParser(data.yoast_head.html)
      }
    </Head>
    <section className={styles.x_app_section}>
        <Container>
            <TableOfContent />
            <Row className={styles.x_create_section}>
                <Col xs={24} md={!expanded ? 2 : 6}>
                    <div>
                        <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
                            <Sidenav.Body>
                            <UserNav expanded={expanded}/>
                            <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                            </Sidenav.Body>
                        </Sidenav>
                    </div>
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                    <Panel style={{background: 'white'}}>
                      <Breadcrumb className={styles.x_breadcumb}>
                          <Breadcrumb.Item as={Link} href="/quan-ly/">Quản lý</Breadcrumb.Item>
                          <Breadcrumb.Item as={Link} href="/quan-ly/huong-dan">Hướng dẫn</Breadcrumb.Item>
                          <Breadcrumb.Item active>{data.post_title}</Breadcrumb.Item>
                      </Breadcrumb> 
                      <div className={styles.x_guilde_content}>
                          <div className={styles.x_single_guilde_meta}>
                            <h1 className={styles.x_post_title}>{data.guilde_title}</h1>
                          </div>
                          <div id="single-content" className={styles.x_single_guilde_content}>
                            {
                              HTMLReactParser(data.post_content)
                            }
                          </div>
                        </div>
                    </Panel>
                </Col>
            </Row>
        </Container>
    </section>
  </>
  )
}

export default SingleGuilde

export async function getServerSideProps(context) {
    const { post_id }  = context.query;
    const res = await axios.get(`${rootURL}user/guilde/single?slug=${post_id}`).then((resonse) => resonse.data);
    // Pass data to the page via props
    return { props: { 
      data: res,
   }}
}