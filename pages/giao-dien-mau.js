import React, { useState } from 'react'
import axios from 'axios';
import styles from '../styles/themes.module.css'
import { Grid, Container, Row, Col, Form, Pagination } from 'rsuite'
import Image from 'next/image'
import Link from 'next/link'
import SearchIcon from '@rsuite/icons/Search'
import { useRouter } from 'next/router'

const rootURL = process.env.wp_json_enpoint;

const NganhList = ({data}) => {
    return(
        <div className={styles.x_nganh_list}>
            <Link href={`/danh-muc-giao-dien/${data.slug}`}>
                {data.name}
            </Link>
        </div>
    );
}
const GD_Box = ({data}) => {
    return (
        <div className={styles.x_gd_box}>
            <div className={styles.x_gd_box_thumbnail}>
                <Image src={data.thumbnail} width={600} height={380}/>
            </div>
            <div className={styles.x_gd_box_content}>
                <Link href={`/giao-dien/${data.post_name}`}>
                        <a className={styles.x_gd_box_link}>
                    <h3 className={styles.x_gd_box_tittle}>{data.post_title}</h3>
                    </a>
                </Link>
                <p className={styles.x_gd_box_description}>{data.post_excerpt}</p>
                <Link href={`/giao-dien/${data.post_name}`}>
                    <a className={styles.x_gd_box_link}>
                        Xem giao diện
                    </a>
                </Link>
            </div>
        </div>
    )
}

const Themes = ({gd, nganh, danhmuc, max_pages}) => {

  const[keySearch, setKeySearch] = useState('');
  
  return (
    <>
      <Grid className={'x-container'}>
        <Container>
            <Row>
                <Col xs={24}>
                        <h4>Chọn theo danh mục</h4>
                </Col>
                <Col xs={24} md={12}>
                    <Row>
                        {
                            danhmuc.map((val) => {
                                return(
                                    <NganhList data={val} key={val.ID}/>
                                )
                            })
                        }
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Form>
                        <Form.Group className={styles.x_form_search_group}>
                            <Form.Control 
                            type="text"
                            value={keySearch}
                            onChange={(value) => setKeySearch(value)}
                            name='s'
                            placeholder={'Tìm kiếm giao diện...'}
                            className={styles.x_form_search_posts}
                            />
                            <button className={styles.x_search_posts_button}>
                                <SearchIcon width={22} height={22} />
                            </button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={24}>
                <Row>
                    <Col xs={24}>
                        <h4>Lựa chọn theo ngành</h4>
                    </Col>
                    {
                        nganh.map((val) => {
                            return(
                                <NganhList data={val} key={val.ID}/>
                            )
                        })
                    }
                </Row>
                </Col>
            </Row>
        </Container>
    </Grid>
    <Grid className={'x-container'}>
        <Container>
            <Row>
                <Col xs={24}>
                    <Row>
                        {
                            gd.map((val) => {
                                return(
                                <Col xs={24} md={8} key={val.ID}>
                                        <GD_Box data={val}/>
                                </Col>
                                )
                            })
                        }
                        <Col xs={24}>
                            <div className={styles.x_pagination}>
                                <Pagination total={max_pages} limit={1} activePage={1} onChangePage={(current) => { console.log(current)}} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </Grid>
    </>
  )
}

export default Themes

export async function getServerSideProps(context) {

    const page = context.query ? context.query.pages : 1;
    const res = await axios.get(rootURL + 'giao-dien/giao-dien-mau?p=' + page).then((resonse) => resonse.data);
  
    // Pass data to the page via props
    return { props: { 
      gd: res.posts,
      nganh: res.nganh,
      danhmuc: res.danh_muc, 
      max_pages: res.max_pages
   }}
  }