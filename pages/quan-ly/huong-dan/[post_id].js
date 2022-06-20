import React from 'react'
import { Grid, Container, Row, Col, Breadcrumb } from 'rsuite';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import UserNav from '../../../components/user-manager/UserNav';
import styles from '../../../styles/account.module.css'

import { IoPersonCircleOutline, IoTimeOutline } from "react-icons/io5";
import { BlogStyleTwo } from '../../../components/blog-templates/BlogContent';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const SingleGuilde = ({data}) => {
  return (
    <>
    <Head>
      {
        HTMLReactParser(data.yoast_head.html)
      }
    </Head>
     <div className={styles.x_container_x}>
        <Grid className={'x-container'}>
            <div className={styles.x_app_header}>
                <Grid className={styles.x_app_container}>
                    <Container>
                        <Row>
                            <Col xs={24}>
                                <UserNav />
                            </Col>
                        </Row>
                    </Container>
                </Grid>
            </div>
            <Container>
                <Row>
                    <Col xs={24}>
                        <div className={styles.x_guilde_content}>
                          <div className={styles.x_single_guilde_meta}>
                            <h1 className={styles.x_post_title}>{data.guilde_title}</h1>
                          </div>
                          <div className={styles.x_single_guilde_content}>
                            {
                              HTMLReactParser(data.post_content)
                            }
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

export default SingleGuilde

export async function getServerSideProps(context) {
    const { post_id }  = context.query;
    const res = await axios.get(`${rootURL}user/guilde/single?slug=${post_id}`).then((resonse) => resonse.data);
    // Pass data to the page via props
    return { props: { 
      data: res,
   }}
}