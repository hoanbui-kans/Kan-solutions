import React from 'react';
import axios from 'axios';
import { Grid, Container, Row, Col, Button, List } from 'rsuite';
import Link from 'next/link';
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav';
import { IoCaretForwardSharp } from 'react-icons/io5';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Guile = ({category}) => {
  return (
    <>
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
    <section className={styles.x_app_section}>
        <Grid className={styles.x_app_container}>
            <Container>
                <Row className={styles.x_create_section}>
                    <Col xs={24}>
                        <List>
                        {category.map(({  term_id, name, children, slug }, index) => (
                            <List.Item key={term_id} index={index} collection={'annoument'}>
                                <Link href={'/quan-ly/danh-muc-huong-dan/' + slug}>
                                <a>
                                    <IoCaretForwardSharp size={16} /> 
                                    {name}
                                </a>
                                </Link>
                                {
                                    children ?  
                                        <ul>
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
                    </Col>
                </Row>
            </Container>
        </Grid>
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