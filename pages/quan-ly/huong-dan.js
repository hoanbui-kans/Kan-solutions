import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, List, Sidenav, Panel } from 'rsuite';
import Link from 'next/link';
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav';
import { IoCaretForwardSharp } from 'react-icons/io5';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Guile = ({category}) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
    <section className={styles.x_app_section}>
        <Container>
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
                    <Panel header="Hướng dẫn sử dụng" bordered style={{background: 'white'}}>
                        <List>
                            {category.map(({  term_id, name, children, slug }, index) => (
                                <List.Item key={term_id} index={index} collection={'annoument'}>
                                    <Link href={'/quan-ly/danh-muc-huong-dan/' + slug}>
                                    <a className={styles.x_guild_title}>
                                        {name}
                                    </a>
                                    </Link>
                                    {
                                        children ?  
                                            <ul className={styles.x_guild_list_posts}>
                                                {children.map(({  term_id, name, slug, count }, index) => (
                                                    <li key={term_id} index={index} collection={'annoument'}>
                                                        <Link href={'/quan-ly/danh-muc-huong-dan/' + slug}>
                                                            <a>
                                                                {name} {count}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul> : ''
                                    }
                                    
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

export default Guile

export async function getServerSideProps() {
    const res = await axios.get(rootURL + 'user/guilde?type=category').then((resonse) => {
        return resonse.data
    }).catch((error) => {
        console.log(error)
    });

    // Pass data to the page via props
    return { props: { 
        category: res.category,
    }}
}