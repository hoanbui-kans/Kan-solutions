import React from 'react'
import { Container, Grid, Row,Col, Pagination, Breadcrumb } from 'rsuite'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/project.module.css'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const SingleProject = ({data}) => {
    return (
        <div className={styles.x_project_container}>
            <div className={styles.x_project_thumbnail}>
                <Image src={data.thumbnail[0]} width={data.thumbnail[1]} height={data.thumbnail[2]} layout="fixed"/>
            </div>
        </div>
    )
}

const Projects = ({bai_viet, max_num_pages}) => {
  return (
    <>
    <div className={'x_breadcum_container'}>
          <Grid className={'x-container'}>
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
        </Grid>    
    </div>  
    <Grid>
        <Container>
           <Row>
            <Col xs={24} md={18}>
                <Row>
                    {
                        bai_viet.map((val) => {
                            return(
                                <Col xs={24}>
                                    <SingleProject data={val}/>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>
            <Col xs={24} md={6}>
                
            </Col>
           </Row>
        </Container>
    </Grid>
    </>
  )
}

export default Projects

export async function getServerSideProps() {

    const res = await axios.get(rootURL + 'du-an/bai-viet').then((resonse) => resonse.data);
  
    // Pass data to the page via props
    return { props: { 
      bai_viet: res.posts,
      max_num_pages: res.max_pages
   }}
  }