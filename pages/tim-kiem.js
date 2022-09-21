import React, { useEffect, useState } from 'react'
import Brand from '../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Row, Col, Nav, Container, Form, Button, Pagination, Loader, Whisper, IconButton , Popover , Dropdown   } from 'rsuite'
import { useSpring, animated, useChain, useSpringRef, useTransition, config } from "@react-spring/web"
import { listServices } from './api/services'
import { useSession } from "next-auth/react"
import Router, { useRouter } from 'next/router'
import SearchIcon from '@rsuite/icons/Search'
import CloseIcon from '@rsuite/icons/Close'
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine'
import EmailFillIcon from '@rsuite/icons/EmailFill'
import PhoneFillIcon from '@rsuite/icons/PhoneFill'
import axios from 'axios'
import { IoCaretForwardSharp, IoCloseCircleOutline, IoPerson } from 'react-icons/io5'
import styles from '../styles/header.module.css'
import { BlogStyleTwo } from '../components/blog-templates/BlogContent'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Search = () => {
    // Search Form 
    const router = useRouter();
    const [resultSearch, setResultSearch] = useState('');
    const [focusSearch, setFocus] = useState(false);
    const [keySearch, setKeySearch] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);

    const [paged, setPaged] = useState({
        current: 1,
        max:0
    });
     
    const query = router.query.s;  

    const Navigation = () => {
        return (
            <div className={styles.x_pagination}>
                <Pagination total={paged.max} limit={1} activePage={paged.current} onChangePage={(current) => { Next_Pages(current)}} />
            </div>
        )
    }

    const Next_Pages = async (num) => {
        setLoadingSearch(true);
        setPaged({...paged, current: num});
        const resonse = await axios.get(`${rootURL}tim-kiem/bai-viet?query=${keySearch}&p=${num}`).then((res) => res.data);
        if(resonse){
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
          setResultSearch(resonse);
          setLoadingSearch(false);
        }
    }

    const getResult = async () => {
        const response = await axios.get(`${rootURL}tim-kiem/bai-viet?query=${query}&p=1`).then((res) => res.data);
        setKeySearch(query);
        if(response){
            setPaged({max: response.max_num_pages, current: 1});
            setResultSearch(response);
        }
        
    }

    useEffect(() => {
        getResult();
    }, [query])  

    const searchPosts = async (query) => {
        setLoadingSearch(true);
        router.query.s = keySearch;
        router.push(router);
    }

    const removeQueryParam = (param) => {
        const { pathname, query } = router;
        const params = new URLSearchParams(query);
        console.log(query);
        params.delete(param);
        router.replace(
            { pathname, query: params.toString() },
            undefined, 
            { shallow: true }
        );
    };
    

    const handleChangeKeySearch  = (keysearch) => {
        setKeySearch(keysearch);
    }

    return (
        <>
            <div className={styles.x_search_wrapper}>
                <Container>
                    <div className={styles.x_search_input}>
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
                                className={styles.x_searchForm} value={keySearch} onChange={(e) => { handleChangeKeySearch(e.target.value) }} placeholder={ loadingSearch ? 'Đang tải...' : 'Tìm kiếm thông tin...' } />
                                <Button 
                                    className={styles.x_close_button}
                                    onClick={() => { removeQueryParam('s') }}
                                > 
                                    <CloseIcon color='#3d3d3d' width={22} height={22}/>  
                                </Button>
                            </div>
                        </Form>
                    </div>
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
                                                    <a>
                                                        <h3 className={styles.x_search_result_title}>{val.post_title}</h3>
                                                    </a>
                                                </Link>
                                                <p className={styles.x_search_result_excerpt}>{val.post_excerpt}</p>
                                                <Link href={'/bai-viet/' + val.post_name}>
                                                    <a>
                                                        <strong>» Xem thêm</strong>
                                                    </a>
                                                </Link>
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
                </Container>
            </div>
        </>
  )
}

export default Search