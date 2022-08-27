import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Sidenav, Panel, Breadcrumb, Button } from 'rsuite';
import Link from 'next/link';
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav';
import MenuIcon from '@rsuite/icons/Menu';
import { FormLienHe } from '../lien-he';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import HTMLReactParser from 'html-react-parser';
import { HomePageSeo } from '../api/HeaderSeo';

const Supporter = () => {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(true);
  const[showMobileNav, setShowMobileNav] = useState(false);
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
                    <MenuIcon />
                            Menu quản lý
                        </Button>
                    {
                        showMobileNav ?
                        <div className={styles.x_account_nav}>
                            <Sidenav expanded={expanded}>
                                <Sidenav.Body>
                                    <UserNav active={'ho-tro-truc-tuyen'} expanded={expanded}/>
                                    <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
                                    <Button 
                                        className={styles.x_nav_mobile_close_button}
                                        onClick={() => {setShowMobileNav(!showMobileNav)}} 
                                        appearance="primary" 
                                        style={{width: '100%'}}
                                    >
                                        Đóng
                                    </Button>
                                </Sidenav.Body>
                            </Sidenav>
                        </div> : ''
                    }
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                    <Panel bordered style={{background: 'white'}}>
                        <Breadcrumb className={styles.x_breadcumb}>
                            <Breadcrumb.Item as={Link} href="/quan-ly">Quản lý</Breadcrumb.Item>
                            <Breadcrumb.Item active>Hỗ trợ trực tuyến</Breadcrumb.Item>
                        </Breadcrumb> 
                        <FormLienHe />
                    </Panel>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default Supporter