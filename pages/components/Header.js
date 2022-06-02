import React, { useEffect, useState } from 'react'
import Brand from '../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Grid, Row, Col, Nav, Container, Form, Button } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search';
import CloseIcon from '@rsuite/icons/Close';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import { useSpring, animated, useChain, useSpringRef, useTransition, config } from "@react-spring/web";
import styles from '../../styles/header.module.css';
import { listServices } from '../api/services';

const Left = () => {
    return (
        <>
            <h3 className={styles.x_menu_title}>DEVELOPERS</h3>
                {
                    listServices.map((val, index) => {
                        return(
                            <div className={styles.x_dropbox}>
                                <Link href={val.link}>
                                    <a className={styles.x_iconLink}>
                                    <span className={styles.x_iconImage}><Image src={val.image} width={24} height={24} /> </span> 
                                    {val.name}</a>
                                </Link>
                            </div>
                        )
                    })
                }
        </>
    )
}

const Right = () => {
    return (
        <>
            <h3 className={styles.x_menu_title}>DỊCH VỤ PHÁT TRIỂN WEB</h3>
            <div className={styles.x_dropbox}>
                    <Link href="/">
                        <a>
                            <p><strong>Quản trị website</strong></p>
                            <p className={styles.x_smaller_text}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta  sunt explicabo.
                            </p>
                        </a>
                    </Link>
            </div>
            <div className={styles.x_dropbox}>
                    <Link href="/">
                        <a>
                            <p><strong>SEO website</strong></p>
                            <p className={styles.x_smaller_text}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta  sunt explicabo.
                            </p>
                        </a>
                    </Link>
            </div>
            <div className={styles.x_dropbox}>
                    <Link href="/">
                        <a>
                            <p><strong>Giải pháp marketing Online</strong></p>
                            <p className={styles.x_smaller_text}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta  sunt explicabo.
                            </p>
                        </a>
                    </Link>
            </div>
        </>
    )
}

const Header = () => {

    const [open, setOpen] = useState(false);
    const [search, setSearchForm] = useState(false);
    const [focusSearch, setFocus] = useState(false);
    const [keySearch, setKeySearch] = useState('');

    const dropdownMenu = [Left, Right];

    const y = useSpring({
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        config: config.stiff,
    })

    const opacity = useSpring({
        opacity: open ? 1 : 0,
        config: config.stiff,
    })

   // Build a spring and catch its ref
    const springBackground = useSpringRef()

    const BackGroundMenu = useSpring({
        opacity: open ? 1 : 0,
        y: open ? 0 : -280,
        ref: springBackground,
        config: config.slow,
    })

    // Build a spring and catch its ref
    const springApi = useSpringRef()

    const transit = useSpring({
        ref: springApi,
        config: config.slow,
        from: { 
            opacity: 0,
            transform: 'translateY(0px)' 
        },
        to: {
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(-40px)' :  'translateY(0px)'
        },
    })

    // Build a transition and catch its ref
    const transApi = useSpringRef();

    const transition = useTransition( open ? dropdownMenu : [] , {
        ref: transApi,
        trail: 300/dropdownMenu.length,
        from: { opacity: 0 , y: -60, PointerEvent: 'none'}, 
        enter: { opacity: 1, y: 0, PointerEvent: 'all' },
        leave: { opacity: 0, y: -60, PointerEvent: 'none'},
        config: config.slow,
        key: item => item.key,
    })

     // This will orchestrate the two animations above, comment the last arg and it creates a sequence
     useChain(open ? [springBackground, springApi, transApi] : [transApi, springApi, springBackground], [
        0,
        open ? 0.1 : 0.15,
    ])

    const showDropdown = () => {
        setOpen(open => !open)
    }
     return (
      <>
      <div className={styles.x_header_section}>
        <Grid className='x_container'>
            <Container> 
                <Row className={styles.headerMenu}>
                    <Col xs={4}>
                        <div className={styles.x_brand}>
                            <Image src={Brand} width={140} height={62} />
                        </div>
                    </Col>
                    <Col xs={16}>
                    <Nav>
                        <div className={styles.mainMenuContainer}>
                            <ul>
                                <li>
                                    <Link href={'/'}>Trang chủ</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>Về chúng tôi</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>
                                        <a>
                                            <span>
                                            Dịch vụ
                                            <animated.div 
                                            style={y}
                                            className={styles.arrow}
                                            >
                                                <ArrowDownLineIcon  width={14} height={14} onClick={showDropdown}/>
                                            </animated.div>
                                        </span>
                                    </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/tin-tuc'}>Tin tức</Link>
                                </li>
                                <li>
                                    <Link href={'/'}>Liên hệ</Link>
                                </li>
                            </ul>
                        </div>
                    </Nav>
                    </Col>
                    <Col xs={4}>
                            <Button onClick={() => { setSearchForm(true); setOpen(false) }}>
                                <SearchIcon width={22} height={22}/> 
                            </Button>
                    </Col>
                </Row>
        </Container>
    </Grid>
    </div>
    <div className={open ? styles.animationHeader : styles.animationHeaderNone}>
        <Container className={styles.x_menu_container}> 
            <animated.div 
                style={opacity} 
                className={styles.x_dropdown_inner_shadow}>
            </animated.div>
            <animated.div 
                style={BackGroundMenu} 
                className={styles.x_dropdown_bg_menu}>
                    <div className={styles.x_dropdown_bg_full} />
             </animated.div>
             <Grid className={'x_container'}>
                <animated.div className={styles.x_dropdownMenu} style={transit}>
                    {
                        transition((style, Item) => 
                            <animated.div className={styles.x_dropdown_x3_menu}
                                        style={{...style}}>
                                    <Item />
                            </animated.div>
                            )
                    }   
                </animated.div>
            </Grid>
        </Container> 
    </div>
    { 
        search ?
            <div 
                className={styles.x_dropdown_x3_menu}>
                    <div className={styles.x_search_modal}>
                        <div className={styles.x_close_button}>
                            <Button onClick={() => { setSearchForm(false) }}> 
                                <CloseIcon color='#3d3d3d' width={22} height={22}/>  
                            </Button>
                        </div>
                        <div className={styles.x_search_section}>
                            <Form className={!focusSearch ? styles.x_searchHeader : styles.x_searchHeader_devide}>
                                <div className={styles.x_searchController}>
                                    <button className={styles.x_searchButton}><SearchIcon color="#a4a4a4" width={24} height={24} /></button>
                                    <input 
                                    onFocus={() => { setFocus(true) }}
                                    onBlur={() => { !keySearch ? setFocus(false) : setFocus(true) }}
                                    className={styles.x_searchForm} value={keySearch} onChange={(e) => { setKeySearch(e.target.value)}} placeHolder="Tìm kiếm thông tin..." />
                                </div>
                            </Form>
                            <div className={  focusSearch ?  styles.x_search_result  + ' ' + styles.x_search_result_showing :  styles.x_search_result  + ' ' + styles.x_search_result_hidden}>
                                <h3 className={styles.x_search_quest_title}>
                                    {
                                        keySearch ? 
                                        `Kết quả tìm kiếm cho: "${keySearch}"`:
                                        `Bạn đang tìm gì?`
                                    }</h3>
                            </div>
                        </div>
                    </div>
            </div> : ''
         }   
    </>
  )
}

export default Header