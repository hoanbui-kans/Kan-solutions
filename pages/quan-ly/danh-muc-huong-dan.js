import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, List, Sidenav, Panel, Breadcrumb } from 'rsuite';
import Link from 'next/link';
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import HTMLReactParser from 'html-react-parser';
import { HomePageSeo } from '../api/HeaderSeo';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const GuileCategory = ({category}) => {
    const { data: session } = useSession();
    const [expanded, setExpanded] = useState(true);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleResize = () => {
        setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        });
    }

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        window.addEventListener("resize", handleResize, false);
    }, [true]);

    useEffect(() => {
        dimensions.width <= 992 ? setShowMobileNav(false) : setShowMobileNav(true); 
    }, [dimensions]);

  return (
    <>
    <Head>
        { HTMLReactParser(HomePageSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
    </Head>
    <section className={styles.x_app_section}>
        <Container>
            <Row className={styles.x_create_section}>
                <Col xs={24} md={!expanded ? 2 : 6}>
                    <Button 
                        onClick={() => {setShowMobileNav(!showMobileNav)}} 
                        className={styles.x_mobile_menu_button} 
                        style={{width: '100%'}}
                    >   
                    {
                        showMobileNav ?
                        <>
                            <div className={styles.x_account_nav}>
                                <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
                                    <Sidenav.Body>
                                    <UserNav active={'huong-dan'} expanded={expanded}/>
                                    <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
                                    </Sidenav.Body>
                                    <Button 
                                            className={styles.x_nav_mobile_close_button}
                                            onClick={() => {setShowMobileNav(!showMobileNav)}} 
                                            appearance="primary" 
                                            style={{width: '100%'}}
                                        >
                                            Đóng
                                    </Button>
                                </Sidenav>
                            </div> 
                            <div className={styles.x_overlay}></div>
                        </>
                        : ''
                    }
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                    <Panel bordered style={{background: 'white'}}>
                        <Breadcrumb className={styles.x_breadcumb}>
                            <Breadcrumb.Item as={Link} href="/quan-ly">Quản lý</Breadcrumb.Item>
                            <Breadcrumb.Item active>Hướng dẫn sử dụng</Breadcrumb.Item>
                        </Breadcrumb> 
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
                                                               <p>{name} <span className={styles.x_document_count}> {count} </span></p>
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

export default GuileCategory

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