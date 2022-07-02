import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, List } from 'rsuite';
import Link from 'next/link';
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav';
const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Annoucement = ({bai_viet}) => {
  return (
    <>
    <div className={styles.x_app_header}>
        <Container>
            <Row>
                <Col xs={24}>
                    <UserNav />
                </Col>
            </Row>
        </Container>
    </div>
    <section className={styles.x_app_section}>
        <Container>
            <Row className={styles.x_create_section}>
                <Col xs={24}>
                    <List>
                    {bai_viet.map(({  ID, post_title, post_excerpt }, index) => (
                        <List.Item key={ID} index={index} collection={'annoument'}>
                            <h3>{post_title}</h3>
                            <p>{post_excerpt}</p>
                        </List.Item>
                    ))}
                    </List>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Annoucement

export async function getServerSideProps() {
    console.log(rootURL + 'user/annoucement?paged=1');
    const res = await axios.get(rootURL + 'user/annoucement?paged=1').then((resonse) => {
        return resonse.data
    }).catch((error) => {
        console.log(error)
    });

    // Pass data to the page via props
    return { props: { 
        bai_viet: res.posts,
        max_num_pages: res.max_pages
    }}
}