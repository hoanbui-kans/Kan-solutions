import React from 'react';
import axios from 'axios';
import { Container, Row, Col, List } from 'rsuite';
import Link from 'next/link';
import styles from '../../../styles/account.module.css'
import UserNav from '../../../components/user-manager/UserNav';
import { IoCaretForwardSharp } from 'react-icons/io5';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const GuilePosts = ({bai_viet}) => {
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
                        {bai_viet.map((val, index) => (
                            <List.Item key={val.ID} index={index} collection={'annoument'}>
                                <Link href={'/quan-ly/huong-dan/' + val.post_name}>
                                    <a className={styles.x_guild_post_title}>
                                        <IoCaretForwardSharp size={16} /> 
                                        {val.post_title}
                                    </a>
                                </Link>
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

export default GuilePosts

export async function getServerSideProps(context) {
    const taxonomy = context.query.post_category
    const res = await axios.get(rootURL + 'user/guilde?type=posts&taxonomy=' + taxonomy).then((resonse) => {
        return resonse.data
    }).catch((error) => {
        console.log(error)
    });

    // Pass data to the page via props
    return { props: { 
        bai_viet: res.posts,
    }}
}