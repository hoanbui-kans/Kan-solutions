import { useState } from 'react'
import { Navbar, Nav, Modal, Col  } from 'rsuite'
import Link from 'next/link'
import styles from '../../../styles/themepreview.module.css'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { IoHome,
   IoDesktopOutline,
   IoPhonePortraitOutline,
   IoTabletLandscapeOutline,
   IoPersonCircleOutline,
   IoCopyOutline,
   IoEarthSharp,
   IoReaderOutline }  from "react-icons/io5";
import HTMLReactParser from 'html-react-parser'
import ServicesSubmitForm from '../../../components/handleSubmitServices'
import Head from 'next/head'
import md5 from 'md5'

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON;
const ThemeViews = ({data, link_theme}) => {

  const [open, setOpen] = useState(false);  
  const [service, setService] = useState(''); 

  const handleOpen = (service) => {
     setService(service);
     setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const ViewScreen = {
    desktop : {
      marginTop: '0px',
      width: '100%',
      height: 'calc(100vh - 56px)'
    },
    tablet : {
      marginTop: '15px',
      width: '768px',
      height: '840px'
    },
    mobile : {
      marginTop: '15px',
      width: '412px',
      height: '680px'
    }
  }

  const [screen, setScreen] = useState(ViewScreen.desktop);

  return (
   <>
   <Head>
    { HTMLReactParser(data.yoast_head.html.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
   </Head>
   <div className={styles.x_preview_container}>
      <Navbar className={styles.x_nav_flex}>
          <Col xs={8}>
              <Navbar.Brand className={styles.x_preview_brand} as={'div'}>
                <Link href="/giao-dien"> 
                    <a className={styles.x_centered}>
                      <IoHome size={18}/>
                    </a>
                </Link>
              </Navbar.Brand>
            </Col>
          <Col xs={8}>
            <Nav className={styles.x_nav_centered + ' ' + styles.x_showin_desktop}>
              <Nav.Item className={styles.x_centered} onClick={ () =>{ setScreen(ViewScreen.desktop) } }>
                <IoDesktopOutline size={16}/> 
                Desktop
              </Nav.Item>
              <Nav.Item className={styles.x_centered} onClick={ () =>{ setScreen(ViewScreen.tablet) } }>
                <IoTabletLandscapeOutline size={16}/>
                Tablet
              </Nav.Item>
              <Nav.Item className={styles.x_centered} onClick={ () =>{ setScreen(ViewScreen.mobile) } }>
                <IoPhonePortraitOutline size={16}/>
                Mobile
              </Nav.Item>
            </Nav>
            <Nav className={styles.x_nav_centered + ' ' + styles.x_showin_mobile}>
              <Nav.Menu title="Thiết bị" icon={<IoTabletLandscapeOutline size={16}/>}>
                <Nav.Item className={styles.x_centered} onClick={ () =>{ setScreen(ViewScreen.desktop) } }>
                    <IoDesktopOutline size={16}/> 
                    Desktop
                  </Nav.Item>
                  <Nav.Item className={styles.x_centered} onClick={ () =>{ setScreen(ViewScreen.tablet) } }>
                    <IoTabletLandscapeOutline size={16}/>
                    Tablet
                  </Nav.Item>
                  <Nav.Item className={styles.x_centered} onClick={ () =>{ setScreen(ViewScreen.mobile) } }>
                    <IoPhonePortraitOutline size={16}/>
                    Mobile
                  </Nav.Item>
              </Nav.Menu>
            </Nav>
          </Col>
          <Col xs={8}>
              <Nav className={styles.x_nav_end + ' ' + styles.x_showin_desktop}>
                {
                  link_theme ? 
                  <Nav.Item className={styles.x_centered} href={link_theme}>
                  <IoCopyOutline size={16}/>
                  Chọn mẫu này
                </Nav.Item> :
                <Nav.Item as={'span'}>
                    <Link href="/dang-nhap/">
                      <a className={styles.x_centered}>
                        <IoPersonCircleOutline size={16}/>
                        Đăng nhập
                      </a>
                    </Link>
                </Nav.Item>
                }
                <Nav.Item 
                  className={styles.x_centered} 
                  onClick={() => {handleOpen('Đăng ký tư vấn mẫu giao diện' + data.post_title)}}
                  >
                  <IoReaderOutline size={16}/>
                  Tư vấn mẫu
                </Nav.Item>
                <Nav.Item as={'span'}>
                    <a href={data.themeinfor.link} className={styles.x_centered}>
                      <IoEarthSharp size={16}/>
                      Xem trực tiếp
                    </a>
                  </Nav.Item>
              </Nav>
              <Nav className={styles.x_nav_centered + ' ' + styles.x_showin_mobile}>
                <Nav.Menu title="Chọn mẫu">
                  {
                    link_theme ? 
                    <Nav.Item as={'span'}>
                      <a className={styles.x_centered} href={link_theme} style={{color: '#575757'}}>
                        <IoCopyOutline size={16}/>
                        Chọn mẫu này
                      </a>
                    </Nav.Item> :
                    <Nav.Item as={'span'}>
                        <Link href="/dang-nhap/">
                          <a className={styles.x_centered}>
                            <IoPersonCircleOutline size={16}/>
                            Đăng nhập
                          </a>
                        </Link>
                    </Nav.Item>
                    }
                    <Nav.Item 
                      className={styles.x_centered} 
                      onClick={() => {handleOpen('Đăng ký tư vấn mẫu giao diện' + data.post_title)}}
                      >
                      <IoReaderOutline size={16}/>
                      Đăng ký tư vấn
                    </Nav.Item>
                     <Nav.Item as={'span'}>
                        <a href={data.themeinfor.link} className={styles.x_centered}>
                          <IoEarthSharp size={16}/>
                          Xem trực tiếp
                        </a>
                    </Nav.Item>
                  </Nav.Menu>
              </Nav>
          </Col>
      </Navbar>
      <div 
        className={styles.x_preview_screen_container} 
        style={{
          width: screen.width, 
          height: screen.height, 
          marginTop: screen.marginTop, 
          maxHeight: 'calc(100vh - 56px)',
          maxWidth: '100%'
        }}>
        <iframe width="100%" 
          height={'100%'} 
          src={data.themeinfor.link} 
          frameBorder="0" 
          noresize="noresize" 
          data-view="fullScreenPreview">
        </iframe>
      </div>
    </div>
    <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Đăng ký tư vấn giao diện mẫu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
  </>
  )
}

export default ThemeViews

export async function getServerSideProps(context) {
    // Create API
    const session = await getSession(context);
    const slug = context.params.slug;
    const res = await axios.get(ROOT_URL + 'giao-dien/single?slug=' + slug).then((resonse) => resonse.data);
    // Create API
    let CreateURI = '';
    if(session){
      const user_nicename = session.user.user_nicename
      const SITE_URL = process.env.ORIGINAL_URL;
      const API_KEY = res.ID + user_nicename;
      const HASH_API_KEY = md5(API_KEY);
      CreateURI = session ? SITE_URL + '/?theme_id=' + res.ID + '&user_name='+ user_nicename +'&public_key=' + HASH_API_KEY : '';
    }
    // Pass data to the page via props
    return { 
    props: { 
        data: res,
        link_theme: CreateURI
    }}
  }