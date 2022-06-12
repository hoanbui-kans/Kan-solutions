import React, { useEffect, useState } from 'react'
import Brand from '../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Grid, Row, Col, Nav, Container, Form, Button, Pagination, Loader  } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search'
import CloseIcon from '@rsuite/icons/Close'
import { useSpring, animated, useChain, useSpringRef, useTransition, config } from "@react-spring/web"
import styles from '../styles/header.module.css'
import { listServices } from '../pages/api/services'
import Router from 'next/router'
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import EmailFillIcon from '@rsuite/icons/EmailFill';
import PhoneFillIcon from '@rsuite/icons/PhoneFill';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import axios from 'axios'
import { getCookie } from 'cookies-next'

const rootURL = process.env.wp_json_enpoint;

const Left = () => {
    return (
        <>
            <h3 className={styles.x_menu_title}>DEVELOPERS</h3>
                {
                    listServices.map((val, index) => {
                        return(
                            <div className={styles.x_dropbox} key={index}>
                                <Link href={val.link}>
                                    <a className={styles.x_iconLink}>
                                    <span className={styles.x_iconImage}><Image alt='layout' src={val.image} width={24} height={24} /> </span> 
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

const MobileMenu = ({showing}) => {
    return(
        <div 
            className={ showing ? styles.x_mobile_menu + ' ' + styles.x_showing_mobile 
            : styles.x_mobile_menu}
        >
            <div className={styles.x_mobile_menu_content}>
                <ul className={styles.x_mobile_menu_list}>
                    <li>
                        <Link href={'/'}>
                            <a>
                                <ArrowRightIcon width={14} height={14}/> Trang chủ
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/ve-chung-toi'}>
                            <a>
                                <ArrowRightIcon width={14} height={14}/> Về chúng tôi
                            </a>
                        </Link>
                    </li>
                    <li>
                        <span className={styles.x_mobile_dropdown_title}>
                            <ArrowRightIcon width={14} height={14}/> Dịch vụ
                        </span>
                        <div className={styles.x_mobile_services}>
                            <Left />
                            <Right />
                        </div>
                    </li>
                    <li>
                        <Link href={'/tin-tuc'}>
                            <a>
                                <ArrowRightIcon width={14} height={14}/> Tin tức
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/tuyen-dung'}>
                            <a>
                                <ArrowRightIcon width={14} height={14}/> Tuyển dụng
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/lien-he'}>
                            <a>
                                <ArrowRightIcon width={14} height={14}/> Liên hệ
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const Header = () => {
   
    const [open, setOpen] = useState(false);
    const [search, setSearchForm] = useState(false);
    const [fixed, setFixed] = useState(false);
    const [showingMobile, setShowingMobile] = useState(false);
    // Search Form 
    const [resultSearch, setResultSearch] = useState('');
    const [focusSearch, setFocus] = useState(false);
    const [keySearch, setKeySearch] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [storeUser, setStoreUser] = useState('');
    const cookies = getCookie('user');

    useEffect(() => {
        cookies ? 
        setStoreUser(JSON.parse(cookies)) : ''
    }, [])

    const [paged, setPaged] = useState({
        current: 1,
        max:0
      });

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

    Router.events.on('routeChangeStart', () => {
        setOpen(false);
        setShowingMobile(false);
        setFixed(false);
    })
   
    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        scrollTop > 300 ? setFixed(true) : setFixed(false)
    };

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    // Search functions

    const Navigation = () => {
        return (
            <div className={styles.x_pagination}>
                <Pagination total={paged.max} limit={1} activePage={paged.current} onChangePage={(current) => { Next_Pages(current)}} />
            </div>
        )
    }

    const searchPosts = async (query) => {
        setLoadingSearch(true);
        const { data } = await axios.get(`${rootURL}tim-kiem/bai-viet?query=${query}&p=1`).then((res) => res);
        if(data){
            setPaged({current:1, max:data.max_num_pages});
            setResultSearch(data);
            setLoadingSearch(false);
        }
    }

    const Next_Pages = async (num) => {
        setLoadingSearch(true);
        setPaged({...paged, current: num});
        const { data } = await axios.get(`${rootURL}tim-kiem/bai-viet?query=${keySearch}&p=${num}`).then((res) => res);
        if(data){
          setResultSearch(data);
          setLoadingSearch(false);
        }
    }

    return (
      <>
      <div className={styles.x_top_header}>
         <Grid className='x_container'>
                <Container> 
                    <Row className={styles.x_flex}>
                        <Col xs={12} md={12} lg={12}>
                            <strong>CÔNG TY TNHH GIẢI PHÁP KAN</strong>
                        </Col>
                        <Col xs={12} md={12} lg={12} className={styles.x_flex_end}>
                            <ul className={styles.x_top_header_menu}>
                                <li className={styles.x_destop_display}>
                                    <a href={'tel:'}>
                                        <PhoneFillIcon  />
                                        Hotline: 0945 938 489
                                    </a>
                                </li>
                                <li className={styles.x_destop_display}>
                                    <a href={'mailto:contact@kanbox.vn'}>
                                        <EmailFillIcon  />
                                        contact@kanbox.vn
                                    </a>
                                </li>
                                {
                                    storeUser ? 
                                    <>
                                        <li><Link href={'/quan-ly/tai-khoan'}><a>Xin chào {storeUser.user_display_name}</a></Link></li>
                                        <li><Link href={'/quan-ly/dang-xuat'}>Đăng xuất</Link></li>
                                      </>
                                    : <>
                                        <li><Link href={'/dang-nhap'}>Đăng nhập</Link></li>
                                        <li><Link href={'/dang-ky'}>Đăng ký</Link></li>
                                    </>
                                }
                                
                            </ul>
                        </Col>
                    </Row>
                </Container>
          </Grid>
      </div>
      <div className={ fixed ?  styles.x_header_section + ' ' + styles.x_fixed : styles.x_header_section}>
          <div className={styles.x_header}>
                <Grid className='x_container'>
                    <Container> 
                        <Row className={styles.headerMenu}>
                            <Col xs={12} md={12} lg={4}>
                                <div className={styles.x_brand}>
                                    <Image alt='layout' src={Brand} width={140} height={62} />
                                </div>
                            </Col>
                            <Col xs={16} className={styles.x_destop_display}>
                                <Nav>
                                    <div className={styles.mainMenuContainer}>
                                        <ul>
                                            <li>
                                                <Link href={'/'}>Trang chủ</Link>
                                            </li>
                                            <li>
                                                <Link href={'/ve-chung-toi'}>Về chúng tôi</Link>
                                            </li>
                                            <li>
                                                <a onClick={showDropdown}>
                                                    <span>
                                                        Dịch vụ
                                                        <animated.div 
                                                        style={y}
                                                        className={styles.arrow}
                                                        >
                                                            <ArrowDownLineIcon  width={14} height={14}/>
                                                        </animated.div>
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <Link href={'/tin-tuc'}>Tin tức</Link>
                                            </li>
                                            <li>
                                                <Link href={'/tuyen-dung'}>Tuyển dụng</Link>
                                            </li>
                                            <li>
                                                <Link href={'/lien-he'}>Liên hệ</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Nav>
                            </Col>
                            <Col xs={12} md={12} lg={4}>
                                <div className={styles.x_header_button_list}>
                                    <Button className={styles.x_non_background_button} onClick={() => { setSearchForm(true); setOpen(false) }}>
                                        <SearchIcon width={22} height={22}/> 
                                    </Button>
                                    <div className={styles.x_mobile_display}>
                                        <button className={
                                            showingMobile ? 
                                            styles.hamburger + ' ' + styles.hamburger__spin + ' ' + styles.is_active
                                            : styles.hamburger + ' ' + styles.hamburger__spin} 
                                            onClick={() => { setShowingMobile(!showingMobile)}}
                                            type="button">
                                            <span className={styles.hamburger_box}>
                                                <span className={styles.hamburger_inner}></span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
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
    </div>
    <div className={styles.x_mobile_display}>
        <MobileMenu showing={showingMobile}/>
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
                                    {
                                        loadingSearch ? 
                                        <button onClick={() => {searchPosts(keySearch)}} className={styles.x_searchButton}><Loader width={24} height={24}/></button>
                                        : 
                                        <button onClick={() => {searchPosts(keySearch)}} className={styles.x_searchButton}><SearchIcon color="#a4a4a4" width={24} height={24} /></button>
                                    }
                                    
                                    <input 
                                    onFocus={() => { setFocus(true) }}
                                    onBlur={() => { !keySearch ? setFocus(false) : setFocus(true) }}
                                    className={styles.x_searchForm} value={keySearch} onChange={(e) => { setKeySearch(e.target.value)}} placeholder={ loadingSearch ? 'Đang tải...' : 'Tìm kiếm thông tin...' } />
                                </div>
                            </Form>
                            <div className={  loadingSearch ? styles.x_search_result  + ' ' + styles.x_search_result_loading : styles.x_search_result }>
                                    {
                                    resultSearch.posts != undefined ? 
                                    <div className={styles.x_search_result_section}>
                                        {
                                            resultSearch.posts.map((val, index) => {
                                                return(
                                                <div key={index} className={styles.x_search_result_post + ' ' + styles.x_dropbox}>
                                                    <div className={styles.x_search_result_thumbnail}>
                                                    <Image alt='layout' src={val.thumbnail} width={70} height={70}/>
                                                    </div>
                                                    <div className={styles.x_search_result_content}>
                                                    <Link href={val.post_name}>
                                                        <a onClick={() => {setSearchForm(false)}}>
                                                        <h3 className={styles.x_search_result_title}>{val.post_title}</h3>
                                                        </a>
                                                    </Link>
                                                    <p className={styles.x_search_result_excerpt}>{val.post_excerpt}</p>
                                                    </div>
                                                </div>
                                                )
                                            }) 
                                        }
                                    </div>
                                        : ''
                                    }
                                <div className={styles.x_search_footer}>
                                    {
                                        paged.current <= paged.max ? 
                                        <Navigation curent={paged.current} max={paged.max} />
                                        : ''
                                    }
                                    <h3 className={styles.x_search_quest_title}>
                                        {
                                            keySearch ? 
                                            `Bấm enter để nhận kết quả tìm kiếm cho: "${keySearch}"`:
                                            `Bạn đang tìm gì?`
                                        }</h3>
                                </div>
                            </div>
                        </div>
                    </div>
            </div> : ''
         }   
    </>
  )
}

export default Header