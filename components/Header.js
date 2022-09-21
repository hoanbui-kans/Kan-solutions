import React, { useEffect, useState } from 'react'
import Brand from '../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Row, Col, Nav, Container, Button, Whisper , Popover , Dropdown   } from 'rsuite'
import { useSpring, animated, useChain, useSpringRef, config } from "@react-spring/web"
import { listServices } from '../pages/api/services'
import { useSession } from "next-auth/react"
import Router from 'next/router'
import SearchIcon from '@rsuite/icons/Search'
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine'
import EmailFillIcon from '@rsuite/icons/EmailFill'
import PhoneFillIcon from '@rsuite/icons/PhoneFill'
import styles from '../styles/header.module.css'
import { IoCaretForwardSharp, IoCloseCircleOutline, IoPerson } from 'react-icons/io5'
import { ThemeCategories } from '../pages/api/services'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Left = () => {
    return (
        <>
            <h3 className={styles.x_menu_title}>ỨNG DỤNG WEB</h3>
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
                    <Link href="/dich-vu/thiet-ke-website-tron-goi-cho-doanh-nghiep"><a><p><strong><IoCaretForwardSharp size={10}/> Thiết kế website</strong></p></a></Link>
                    <p className={styles.x_smaller_text}>
                        Dịch vụ tạo website nhanh theo mẫu, thiết kế website cho doanh nghiệp quản trị nội dung bằng website có sẵn, tối ưu chi phí thiết lập ban đầu.
                    </p>
                    <div>
                        <Link href="/dich-vu/tao-website-lading-page-tu-dong">
                            <a className={styles.x_button_inline}>
                                <Button className={styles.x_button_website_create}>
                                    Tạo Website miễn phí
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

const Theme_categories = ( {category_api} ) => {
    return(
        <>
            <div className={styles.x_categories_card}>
               <Link href={category_api.link}>
                    <a>
                        <Image src={category_api.image} width={300} height={200}/>
                        <h4 className={styles.x_categories_card_title}>{category_api.title}</h4>
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
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openThemesMenu, setOpenThemesMenu] = useState(false);
    const [fixed, setFixed] = useState(false);
    const [showingMobile, setShowingMobile] = useState(false);

    const dropdownMenu = [Left, Right];

    const y = useSpring({
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        config: config.stiff,
    });

    const y_categories = useSpring({
        transform: openThemesMenu ? "rotate(180deg)" : "rotate(0deg)",
        config: config.stiff,
    })


    const opacity = useSpring({
        opacity: open ? 1 : 0,
        config: config.stiff,
    })

    const opacity_themes = useSpring({
        opacity: openThemesMenu ? 1 : 0,
        config: config.stiff,
    })

   // Build a spring and catch its ref
    const springBackground = useSpringRef();
    const springBGThemeCategories = useSpringRef();
    
    const BackGroundMenu = useSpring({
        opacity: 1,
        height: open ? 485 : 0,
        y: open ? 0 : -280,
        ref: springBackground,
        config: config.slow,
    })

    const BackGroundMenu_themes = useSpring({
        opacity: 1,
        height: openThemesMenu ? 485 : 0,
        y: openThemesMenu ? 0 : -280,
        ref: springBackground,
        config: config.slow,
    })

    // Build a spring and catch its ref
    const springApi = useSpringRef()
    const springApiThemeCategories = useSpringRef()
    
    const transit = useSpring({
        ref: springApi,
        config: config.slow,
        from: { 
            opacity: 0,
            transform: 'translateY(0px)',
            delay: 200 
        },
        to: {
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(-50px)' :  'translateY(0px)'
        },
    })

    const transit_themes = useSpring({
        ref: springApiThemeCategories,
        config: config.slow,
        from: { 
            opacity: 0,
            transform: 'translateY(0px)',
            delay: 200 
        },
        to: {
            opacity: openThemesMenu ? 1 : 0,
            transform: openThemesMenu ? 'translateY(-40px)' :  'translateY(0px)'
        },
    })


     // This will orchestrate the two animations above, comment the last arg and it creates a sequence
     useChain(open ? [springBackground, springApi] : [springApi, springBackground], [
        0,
        open ? 0.42 : 0.205,
    ])

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(openThemesMenu ? [springBGThemeCategories, springApiThemeCategories] : [ springApiThemeCategories, springBGThemeCategories], [
        0,
        openThemesMenu ? 0.42 : 0.205,
    ])

    const showDropdown = () => {
        setOpen(open => !open);
        setOpenDropdown(!open);
        setOpenThemesMenu(false);
    }

    const showDropdownThemes = () => {
        setOpenThemesMenu(openThemesMenu => !openThemesMenu)
        setOpenDropdown(!openThemesMenu);
        setOpen(false);
    }

    const closeAllDropdown = () => {
        setOpenDropdown(false);
        setOpenThemesMenu(false);
        setOpen(false);
    }

    Router.events.on('routeChangeStart', () => {
        setOpen(false);
        setOpenThemesMenu(false);
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
                        <Link href="/dang-ky/">
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
                                            <Link href={'/ve-chung-toi'}>Giới thiệu</Link>
                                        </li>
                                        <li>
                                            <a onClick={showDropdownThemes}>
                                                <span>
                                                    Giao diện mẫu
                                                    <animated.div 
                                                    style={y_categories}
                                                    className={styles.arrow}
                                                    >
                                                        <ArrowDownLineIcon  width={14} height={14}/>
                                                    </animated.div>
                                                </span>
                                            </a>
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
                                           <Link href="/tim-kiem">
                                                <a>
                                                    <Button className={styles.x_non_background_button}>
                                                        <SearchIcon width={22} height={22}/> 
                                                    </Button>
                                                </a>
                                            </Link>
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
                                        <Link href="/dang-ky/">
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
    {/* Dropdown service menu */}
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
                        dropdownMenu.map((Item, index) =>
                            <div key={index} className={styles.x_dropdown_x3_menu}>
                                <Item />
                            </div>
                        )
                    }   
                </animated.div>
            </Container> 
        </div>
    </div>
    {/* EndDropdown Service menu */}
    {/* Dropdown list Categories */}
    <div className={openThemesMenu ? styles.animationHeader : styles.animationHeaderNone}>    
      <div className={styles.x_menu_container}>
            <Container> 
                <animated.div 
                    style={opacity_themes} 
                    className={styles.x_dropdown_inner_shadow}>
                </animated.div>
                <animated.div 
                    style={BackGroundMenu_themes} 
                    className={styles.x_dropdown_bg_menu}>
                        <div className={styles.x_dropdown_bg_full} />
                </animated.div>
                <animated.div className={styles.x_dropdownMenu} style={transit_themes}>
                    <Row>
                        <Col xs={24}>
                            <h3 style={{fontSize: 20, lineHeight: '20px', marginBottom: 0}}>Giao diện mẫu website miễn phí</h3>
                            <hr/>
                            <p style={{marginBottom: 12}}>
                                Chúng tôi cung cấp cho bạn giải pháp xây dựng website miễn phí dựa trên nền tảng Wordpress <br/>
                                Giải pháp xây dựng website tự động đầy đủ chức năng chỉ với 1 click, quản lý bằng nền tảng<br/>
                                Tìm hiểu thêm các mẫu giao diện cơ bản:
                            </p>
                        </Col>
                        {
                            ThemeCategories.map((val, index) => 
                               <Col xs={4} key={index}>
                                    <Theme_categories category_api={val} />
                                </Col>
                            )
                        }  
                         <Col xs={24}>
                            <Link href="/dich-vu/tao-website-lading-page-tu-dong">
                                <a className={styles.x_button_inline}>
                                    <Button className={styles.x_button_website_create}>
                                        XEM TẤT CẢ GIAO DIỆN
                                    </Button>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </animated.div>
                <Row>
                            
                </Row>
            </Container> 
        </div>
    </div>

        {
            openDropdown ? <div className={styles.x_closing_dropdown} onClick={closeAllDropdown}></div> : ""
        }
        {/* End Dropdown list Categories */}
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
    </>
  )
}

export default Header