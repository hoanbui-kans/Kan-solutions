import { useState } from 'react'
import { Grid, Container, Row, Col, Breadcrumb, Form, Pagination  } from 'rsuite';
import Link from 'next/link';
import styles from '../../styles/blog.module.css';
import axios from 'axios';
import SearchIcon from '@rsuite/icons/Search'

import { BlogStyleOne, BlogStyleTwo } from '../../components/blog-templates/BlogContent';
import Loading from '../../components/Loading';
import HTMLReactParser from 'html-react-parser';
import { NewsSeo } from '../api/HeaderSeo';
import Head from 'next/head';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;


const NewsCategory = ({bai_viet, danh_muc, max_num_pages}) => {

  const [keySearch, setKeySearch] = useState('');
  const [posts, setPosts] = useState(bai_viet);
  const [maxpage, setMaxPage] = useState(max_num_pages);
  const [paged, setPaged] = useState(1);
  const [loading, setLoading] = useState(false);

  const Search_Page = async () => {
    setLoading(true);
    setPaged(1);
    const { data } = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=7&s=' + keySearch).then((res) => res);
    if(data){
      setPosts(data.posts);
      setMaxPage(data.max_num_pages)
      setLoading(false);
    }
  }

  const Next_Pages = async (num) => {
    setLoading(true);
    setPaged({...paged, current: num});
    const { data } = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=7&p=' + num).then((res) => res);
    if(data){
      setPosts(data.posts);
      setLoading(false);
    }
  }

  if(bai_viet == undefined) return '';
    return (
      <>
      <Head>
        { HTMLReactParser(NewsSeo) }
      </Head>
      <section className={styles.x_newsSection}>
        <Grid className={'x-container'}>
          <Breadcrumb className={styles.x_breadcumb}>
            <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item active>Tin tức</Breadcrumb.Item>
          </Breadcrumb>
          <Container>
              <Row>
                <Col xs={24}>
                  <h1 className={styles.x_wellcome_title}>
                    Cung cấp thông tin thương mại điện tử 
                    <span className={styles.x_highlight}> hiện tại và tương lai</span>
                  </h1>
                </Col>
              </Row>
              <Row className={styles.x_meta_with_form}>
                <Col xs={24}>
                      <Form onSubmit={(event) => Search_Page(event)}>
                        <Form.Group className={styles.x_form_search_group}>
                          <Form.Control 
                            type="text"
                            value={keySearch}
                            name='s'
                            onChange={(value) => setKeySearch(value)}
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
              <Row>
                  {
                    loading ?  <Loading /> :
                    <>
                      {
                        posts != '' ?
                        <>
                          {
                            posts.map((val, index) => {
                                return(
                                  index == 0 ? 
                                  <Col xs={24} key={val.ID}>
                                    <BlogStyleOne data={val} />
                                  </Col>
                                  :
                                  <Col xs={24} md={12} lg={8} key={val.ID}>
                                    <BlogStyleTwo data={val} />
                                  </Col>
                                )
                            })
                        } 
                        <Col xs={24}>
                          <div className={styles.x_pagination}>
                              <Pagination total={maxpage} limit={1} activePage={paged} onChangePage={(current) => { Next_Pages(current)}} />
                          </div>
                        </Col>
                        </>
                        : 'Không có bài viết'
                      }
                    </>
                }
              </Row>
            </Container>
          </Grid>
        </section>
        </>
    )
}

export default NewsCategory

export async function getServerSideProps(context) {
  const Slug = context.query.slug;
  const res = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=7&category=' + Slug).then((resonse) => resonse.data);

  // Pass data to the page via props
  return { props: { 
    bai_viet: res.posts,
    danh_muc: res.terms,
    max_num_pages: res.max_num_pages
 }}
}