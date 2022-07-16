import { useState } from 'react'
import { Container, Row,Col, Pagination, Breadcrumb, Button } from 'rsuite'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Loading from '../components/Loading'
import styles from '../styles/project.module.css'
import ServicesSiderbar from '../components/ServicesSiderbar'
import { ProjectPage } from './api/HeaderSeo'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

export const SingleProject = ({data}) => {
    return (
        <div className={styles.x_project_container}>
            <div className={styles.x_project_thumbnail}>
                <Image alt={data.post_name} src={data.thumbnail[0]} width={data.thumbnail[1]} height={data.thumbnail[2]}/>
                {
                    data.logo_khach_hang ? 
                    <div className={styles.x_logo_khach_hang}>
                        <Image alt={data.post_name} src={data.logo_khach_hang.url} width={data.logo_khach_hang.width} height={data.logo_khach_hang.height}/>
                    </div> : ''
                }
            </div>
            <div className={styles.x_project_content}>
                <Link href={"/du-an/" + data.post_name}>
                    <a>
                        <h3 className={styles.x_project_title}>{data.post_title}</h3>
                    </a>
                </Link>
                <p>{data.post_excerpt}</p>
                <a href={data.project_view} target="_blank" rel="noreferrer">
                    <Button className={styles.x_project_view_button}>Xem dự án</Button>
                </a>
                <Link href={"/du-an/" + data.post_name}>
                    <a>
                        <Button className={styles.x_project_button}>Xem chi tiết</Button>
                    </a>
                </Link>
            </div>
        </div>
    )
}

const Projects = ({bai_viet, max_num_pages}) => {
    const [paged, setPaged] = useState(1);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState(bai_viet);

    const Next_Pages = async (num) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        setLoading(true);
        setPaged(num);
        const { data } = await axios.get(rootURL + 'du-an/bai-viet?paged=' + num).then((res) => res);
        if(data){
          setPosts(data.posts);
          setLoading(false);
        }
      }

    return (
        <>
        <Head>
            { HTMLReactParser(ProjectPage.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
        </Head>
        <div className={'x_breadcum_container'}>
            <Container>
                <Row>
                    <Col xs={24}>
                    <Breadcrumb className={'x_breadcumb'}>
                        <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item active>Dự án</Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                </Row>
            </Container>
        </div>  
        <section className={styles.x_project_grid}>
            <Container>
                <Row>
                    <Col xs={24} md={18}>
                        <Row>
                            {
                                loading ?  
                                <Col xs={24}>
                                    <Loading />
                                </Col> : 
                                <>
                                {
                                 posts.map((val) => {
                                        return(
                                            <Col xs={24} md={12} key={val.ID}>
                                                <SingleProject data={val}/>
                                            </Col>
                                        )
                                    }) }
                                    <Col xs={24}>
                                        <div className={styles.x_pagination}>
                                            <Pagination total={max_num_pages} limit={1} activePage={paged} onChangePage={(current) => { Next_Pages(current)}} />
                                        </div>
                                    </Col>
                                </>
                            }
                        </Row>
                    </Col>
                    <Col xs={24} md={6}>
                        <ServicesSiderbar title={'Đăng kỹ hỗ trợ giao diện trang dự án'} />
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Projects

export async function getServerSideProps({req, res}) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    let response = await axios.get(rootURL + 'du-an/bai-viet').then((resonse) => resonse.data);
    // Pass data to the page via props
    return { props: { 
      bai_viet: response.posts,
      max_num_pages: response.max_pages
   }}
  }