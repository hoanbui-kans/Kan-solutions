import React, { useEffect, useState } from 'react'
import Brand from '../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Row, Col, Nav, Container, Form, Button, Pagination, Loader, Whisper, IconButton , Popover , Dropdown   } from 'rsuite'
import { useSpring, animated, useChain, useSpringRef, useTransition, config } from "@react-spring/web"
import { listServices } from '../pages/api/services'
import { useSession } from "next-auth/react"
import Router from 'next/router'
import SearchIcon from '@rsuite/icons/Search'
import CloseIcon from '@rsuite/icons/Close'
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine'
import EmailFillIcon from '@rsuite/icons/EmailFill'
import PhoneFillIcon from '@rsuite/icons/PhoneFill'
import axios from 'axios'
import styles from '../styles/header.module.css'
import { IoCaretForwardSharp, IoCloseCircleOutline, IoPerson } from 'react-icons/io5'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

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
                                    <span className={styles.x_iconImage}><Image alt={val.name} src={val.image} width={24} height={24} /> </span> 
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
                    <p><strong><IoCaretForwardSharp size={10}/> Thiết kế website</strong></p>
                    <p className={styles.x_smaller_text}>
                        Dịch vụ tạo website nhanh theo mẫu, thiết kế website cho doanh nghiệp quản trị nội dung bằng website có sẵn, tối ưu chi phí thiết lập ban đầu.
                    </p>
                    <div>
                        <Link href="/dich-vu/tao-website-lading-page-tu-dong">
                            <a className={styles.x_button_inline}>
                                <Button className={styles.x_button_website_create}>
                                    Tạo Website
                                </Button>
                            </a>
                        </Link>
                        <Link href="/dich-vu/thiet-ke-website-tron-goi-cho-doanh-nghiep">
                            <a className={styles.x_button_inline}>
                                <Button className={styles.x_button_website_doanh_nghiep}>
                                    Thiết kế website trọn gói
                                </Button>
                            </a>
                        </Link>
                    </div>
            </div>
            <div className={styles.x_dropbox}>
                    <Link href="/dich-vu/giai-phap-quan-tri-noi-dung-website-cho-doanh-nghiep">
                        <a>
                            <p><strong><IoCaretForwardSharp size={10}/> Quản trị website</strong></p>
                            <p className={styles.x_smaller_text}>
                                Dịch vụ quản trị, quản lý, vận hành, sản xuất nội dung cho website, tối ưu chi phí quản lý, nâng cao hiệu quả chiến dịch.
                            </p>
                        </a>
                    </Link>
            </div>
            <div className={styles.x_dropbox}>
                    <Link href="/dich-vu/giai-phap-marketing-online-cho-doanh-nghiep">
                        <a>
                            <p><strong><IoCaretForwardSharp size={10}/> Giải pháp marketing Online</strong></p>
                            <p className={styles.x_smaller_text}>
                                Hỗ trợ xây dựng các chiến dịch quảng cáo, quảng bá thương hiệu, nghiên cứu, phân tích, tư vấn hỗ trợ.
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
                              Trang chủ
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/ve-chung-toi'}>
                            <a>
                              Về chúng tôi
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/giao-dien'}>Giao diện mẫu</Link>
                    </li>
                    <li>
                        <Link href={'/bai-viet'}>
                            <a>
                              Blog
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/du-an'}>Dự án</Link>
                    </li>
                    <li>
                        <Link href={'/tuyen-dung'}>
                            <a>
                              Tuyển dụng
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/lien-he'}>
                            <a>
                              Liên hệ
                            </a>
                        </Link>
                    </li>
                    <li>
                        <div className={styles.x_mobile_services}>
                            <Right />
                            <Left />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const Header = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [search, setSearchForm] = useState(false);
    const [fixed, setFixed] = useState(false);
    const [showingMobile, setShowingMobile] = useState(false);
    // Search Form 
    const [resultSearch, setResultSearch] = useState('');
    const [focusSearch, setFocus] = useState(false);
    const [keySearch, setKeySearch] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);

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
        opacity: 1,
        height: open ? 485 : 0,
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
        open ? 0.095 : 0.105,
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
        const response = await axios.get(`${rootURL}tim-kiem/bai-viet?query=${query}&p=1`).then((res) => res.data);
        if(!response.error){
            setPaged({current:1, max:response.max_num_pages});
            setResultSearch(response);
        } 
        setLoadingSearch(false);
    }

    const Next_Pages = async (num) => {
        setLoadingSearch(true);
        setPaged({...paged, current: num});
        const resonse = await axios.get(`${rootURL}tim-kiem/bai-viet?query=${keySearch}&p=${num}`).then((res) => res.data);
        if(resonse){
          setResultSearch(resonse);
          setLoadingSearch(false);
        }
    }

    const renderMenu = ({ onClose, left, top, className }, ref) => {
        const handleSelect = eventKey => {
          onClose();
        };
        return (
          <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
            {
                session ? 
                    <>
                    <Dropdown.Item eventKey={1}>
                        <Link href="/quan-ly">
                            Quản lý
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={2}>
                        <Link href="/quan-ly/dang-xuat">
                            Đăng xuất
                        </Link>
                    </Dropdown.Item>
                </>
                : <>
                    <Dropdown.Item eventKey={1}>
                        <Link href="/dang-nhap/">
                            Đăng nhập
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={2}>
                        <Link href="/dang-nhap/">
                            Đăng ký
                        </Link>
                    </Dropdown.Item>
                </>
            }
            </Dropdown.Menu>
            </Popover>
        );
    };

    return (
      <>
      <div className={styles.x_top_header}>
            <Container> 
                    <Row className={styles.x_flex}>
                        <Col xs={14} md={8} lg={8} className={styles.x_top_header_brand}>
                            <strong>CÔNG TY TNHH GIẢI PHÁP KAN</strong>
                        </Col>
                        <Col xs={10} md={16} lg={16} className={styles.x_flex_end}>
                            <ul className={styles.x_top_header_menu}>
                                <li className={styles.x_desktop_display}>
                                    <a href={'tel:0392193639'}>
                                        <PhoneFillIcon  />
                                        039 219 3639
                                    </a>
                                </li>
                                <li className={styles.x_desktop_display}>
                                    <a href={'mailto:contact@kanbox.vn'}>
                                        <EmailFillIcon  />
                                        contact@kanbox.vn
                                    </a>
                                </li>
                                <li><Link href={'/tuyen-dung'}>Tuyển dụng</Link></li>
                                {
                                    session ? 
                                        <li><Link href={'/quan-ly'}><a>{session.user.token.user_display_name}</a></Link></li>
                                    : ''
                                }
                            </ul>
                        </Col>
                    </Row>
            </Container>
      </div>
      <div className={ fixed ?  styles.x_header_section + ' ' + styles.x_fixed : styles.x_header_section}>
          <div className={styles.x_header}>
                <Container> 
                    <Row className={styles.headerMenu}>
                        <Col xs={8} md={12} lg={3}>
                            <div className={styles.x_brand}>
                                <Link href={'/'}>
                                    <a>
                                    <Image alt='Kansite.com.vn' src={Brand} width={140} height={62} />
                                    </a>
                                </Link>
                            </div>
                        </Col>
                        <Col xs={16} className={styles.x_desktop_display}>
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
                                            <Link href={'/giao-dien'}>Giao diện mẫu</Link>
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
                                            <Link href={'/du-an'}>Dự án</Link>
                                        </li>
                                        <li>
                                            <Link href={'/bai-viet'}>Blog</Link>
                                        </li>
                                        <li>
                                            <Link href={'/lien-he'}>Liên hệ</Link>
                                        </li>
                                        <li>
                                            <Button className={styles.x_non_background_button} onClick={() => { setSearchForm(true); setOpen(false) }}>
                                                <SearchIcon width={22} height={22}/> 
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </Nav>
                        </Col>
                        <Col xs={16} md={12} lg={5}>
                            <div className={styles.x_header_button_list}>
                            {
                                    session ? 
                                        <>
                                        <Link href="/quan-ly">
                                            <a className={styles.x_desktop_display}> 
                                                <Button className={styles.x_login_button}>
                                                    Quản lý
                                                </Button>
                                            </a>
                                        </Link>
                                        <Link href="/quan-ly/dang-xuat">
                                            <a className={styles.x_desktop_display}> 
                                                <Button className={styles.x_login_register}>
                                                    Đăng xuất
                                                </Button>
                                            </a>
                                        </Link>
                                      </>
                                    : <>
                                    <Link href="/dang-nhap/">
                                            <a className={styles.x_desktop_display}> 
                                                <Button className={styles.x_login_button}>
                                                    Đăng nhập
                                                </Button>
                                            </a>
                                        </Link>
                                        <Link href="/dang-nhap/">
                                            <a className={styles.x_desktop_display}> 
                                                <Button className={styles.x_login_register}>
                                                    Đăng ký
                                                </Button>
                                            </a>
                                        </Link>
                                    </>
                                }
                                <div className={styles.x_mobile_display}>
                                    <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu}>
                                        <a className={styles.x_account_mobile_button}><IoPerson /> Tài Khoản</a>
                                    </Whisper>
                                </div>
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
    </div>
    <div className={open ? styles.animationHeader : styles.animationHeaderNone}>    
      <div className={styles.x_menu_container}>
            <Container> 
                <animated.div 
                    style={opacity} 
                    className={styles.x_dropdown_inner_shadow}>
                </animated.div>
                <animated.div 
                    style={BackGroundMenu} 
                    className={styles.x_dropdown_bg_menu}>
                        <div className={styles.x_dropdown_bg_full} />
                </animated.div>
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
            </Container> 
        </div>
    </div>
    </div>
    <div 
        onClick={() => {setShowingMobile(false)}}
        className={ showingMobile ? 
        styles.x_backdrop_mobile + ' ' + styles.x_backdrop_mobile_showing 
        : styles.x_backdrop_mobile}
    >
        <span className={styles.x_backdrop_mobile_closing}>
            Đóng
            <IoCloseCircleOutline color={'white'} size={24}/>
        </span>
    </div>                
    <div className={styles.x_mobile_display}>
        <MobileMenu showing={showingMobile}/>
    </div>
    { 
        search ?
            <div 
                className={styles.x_dropdown_x3_menu}>
                    <div className={styles.x_search_modal}>
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
                                    name='seach'
                                    onFocus={() => { setFocus(true) }}
                                    onBlur={() => { !keySearch ? setFocus(false) : setFocus(true) }}
                                    className={styles.x_searchForm} value={keySearch} onChange={(e) => { setKeySearch(e.target.value)}} placeholder={ loadingSearch ? 'Đang tải...' : 'Tìm kiếm thông tin...' } />
                                    <Button className={styles.x_close_button} onClick={() => { setSearchForm(false) }}> 
                                        <CloseIcon color='#3d3d3d' width={22} height={22}/>  
                                    </Button>
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
                                                    {
                                                        val.thumbnail ? 
                                                        <div className={styles.x_search_result_thumbnail}>
                                                            <Image alt={val.post_name} src={val.thumbnail[0]} width={val.thumbnail[1]} height={val.thumbnail[2]}/>
                                                        </div> : ''
                                                    }
                                                    <div className={styles.x_search_result_content}>
                                                    <Link href={'/bai-viet/' + val.post_name}>
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