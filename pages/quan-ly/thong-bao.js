import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, List, Sidenav, Panel } from 'rsuite';
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav';
import MenuIcon from '@rsuite/icons/Menu';
const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Annoucement = ({bai_viet}) => {
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
                                    <UserNav active={'thong-bao'} expanded={expanded}/>
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
                    <Panel header={<strong>Bảng tin Kansite</strong>} bordered style={{background: 'white'}}>
                        <List>
                            {bai_viet.map(({  ID, post_title, post_excerpt }, index) => (
                                <List.Item className={styles.x_annoucement} key={ID} index={index} collection={'annoument'}>
                                    <h3>{post_title}</h3>
                                    <p>{post_excerpt}</p>
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