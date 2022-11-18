import { useEffect, useState } from 'react'
import { Container, Row, Col, Breadcrumb, Form, Pagination  } from 'rsuite'
import Link from 'next/link'
import styles from '../styles/blog.module.css'
import axios from 'axios'
import SearchIcon from '@rsuite/icons/Search'
import { NewsSeo } from './api/HeaderSeo'
import { BlogStyleOne, BlogStyleTwo } from '../components/blog-templates/BlogContent'
import Loading from '../components/Loading'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const News = ({bai_viet, danh_muc, max_num_pages}) => {

  const [keySearch, setKeySearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [postsCategory, setPostsCategory] = useState([]);
  const [maxpage, setMaxPage] = useState(0);
  const [paged, setPaged] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts(bai_viet);
    setPostsCategory(danh_muc);
    setMaxPage(max_num_pages);
  } , [true]);
  
  const Search_Page = async () => {
    setLoading(true);
    setPaged(1);
    const { data } = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=12&s=' + keySearch).then((res) => res);
    if(data){
      setPosts(data.posts);
      setMaxPage(data.max_num_pages);
    }
    setLoading(false);
  }

  const Next_Pages = async (num) => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
    setLoading(true);
    setPaged(num);
    const { data } = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=12&p=' + num).then((res) => res);
    if(data){
      setPosts(data.posts);
      setLoading(false);
    }
  }

  if(bai_viet == undefined) return '';
    return (
      <>
      <Head>
        { HTMLReactParser(NewsSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
      </Head>
      <div className={'x_breadcum_container'}>
        <Container>
            <Row>
                <Col xs={24}>
                  <Breadcrumb className={'x_breadcumb'}>
                    <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active>Tin tức</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
            </Row>
        </Container>
      </div>  
      <section className={styles.x_newsSection}>
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
                <Col xs={24} md={16}>
                  <ul className={styles.x_category_link}>
                      { postsCategory.map((val) => {
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
                    loading ?  <Col xs={24}><Loading /></Col> :
                    <>
                      {
                        posts != '' ?
                        <>
                          {
                            posts.map((val, index) => {
                                return(
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
        </section>
        </>
    )
}

export default News

export async function getServerSideProps({req, res}) {
  res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
  )
  const response = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=12').then((resonse) => resonse.data);

  // Pass data to the page via props
  return { props: { 
    bai_viet: response.posts,
    danh_muc: response.terms,
    max_num_pages: response.max_num_pages
 }}
}