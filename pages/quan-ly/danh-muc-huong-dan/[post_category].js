import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, List, Sidenav, Panel, Breadcrumb } from 'rsuite';
import Link from 'next/link';
import styles from '../../../styles/account.module.css'
import UserNav from '../../../components/user-manager/UserNav';
import { IoCaretForwardSharp } from 'react-icons/io5';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;


const GuilePosts = ({bai_viet, current_term}) => {
    console.log(bai_viet);
const [expanded, setExpanded] = useState(true);
  return (
    <>
    <section className={styles.x_app_section}>
        <Container>
            <Row className={styles.x_create_section}>
                <Col xs={24} md={!expanded ? 2 : 6}>
                    <div className={styles.x_account_nav}>
                        <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
                            <Sidenav.Body>
                            <UserNav expanded={expanded}/>
                            <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                            </Sidenav.Body>
                        </Sidenav>
                    </div>
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                    <Panel bordered style={{background: 'white'}}>
                        <Breadcrumb className={styles.x_breadcumb}>
                            <Breadcrumb.Item as={Link} href="/quan-ly">Quản lý</Breadcrumb.Item>
                            <Breadcrumb.Item as={Link} href="/quan-ly/danh-muc-huong-dan/">Danh mục hướng dẫn</Breadcrumb.Item>
                            {
                                current_term.name ? <Breadcrumb.Item active>{current_term.name}</Breadcrumb.Item> : ''
                            }
                            
                        </Breadcrumb> 
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
                    </Panel>
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

    console.log(res);

    // Pass data to the page via props
    return { props: { 
        bai_viet: res.posts,
        current_term: res.current_term ? res.current_term : ''
    }}
}