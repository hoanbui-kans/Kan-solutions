import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import styles from '../styles/themes.module.css'
import { Container, Row, Col, Form, Pagination, Button, Breadcrumb, SelectPicker, List, CheckboxGroup, Checkbox,toaster,Message,ButtonToolbar, Loader } from 'rsuite'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '../components/Loading';
import { Separator } from './giao-dien/[slug]';
import { IoListSharp, IoGridOutline, IoCaretForwardSharp, IoFunnelOutline, IoCloseCircleOutline, IoSearchOutline } from "react-icons/io5";
import HTMLReactParser from 'html-react-parser';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

export const Price = ({data}) => {
    if(data.sale_price){
        let salePercent; 
        salePercent = Math.round(100 - (parseInt(data.sale_price)/parseInt(data.regular_price)*100));
        return (
          <div className={styles.x_styles_price}>
            <span className={styles.x_old_price}>{Separator(data.regular_price)}đ</span>
            <span className={styles.x_newPrice}>{Separator(data.sale_price)}đ</span>
            <span className={styles.x_sale_badge}>-{salePercent}%</span>
          </div>
        )
    };
   
    return(
      <div className={styles.x_styles_price}>
        <span className={styles.simple}>{Separator(data.regular_price)}đ</span>
      </div>
    )
}

export const GD_Box = ({data}) => {
    return (
        <div className={styles.x_gd_box}>
             {
                data.thumbnail ?
                    <div className={styles.x_gd_box_thumbnail}>
                    <Link href={`/giao-dien/${data.post_name}`}>
                        <Image alt={data.post_title} src={data.thumbnail[0]} width={data.thumbnail[1]} height={data.thumbnail[2]}/>
                    </Link>
                </div> : ''
            }
            <div className={styles.x_gd_box_content}>
                <Link href={`/giao-dien/${data.post_name}`}>
                    <a className={styles.x_gd_box_link}>
                        <h3 className={styles.x_gd_box_tittle}>{data.post_title}</h3>
                    </a>
                </Link>
                <div className={styles.x_gd_box_price}>
                    <Price data={data.price}/>
                </div>
                <div className={styles.x_gd_box_button}>
                    <Link href={`/giao-dien/${data.post_name}`}>
                        <a className={styles.x_gd_box_link}>
                            <Button className={styles.x_gd_create_button_box}>
                                Sử dụng mẫu
                           </Button>
                        </a>
                    </Link>
                    <Link href={`/giao-dien/xem-giao-dien/${data.post_name}`}>
                        <a className={styles.x_gd_box_link}>
                           <Button className={styles.x_gd_view_button_box}>
                                Xem giao diện
                           </Button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export const GD_List = ({data}) => {
    return (
        <div className={styles.x_gd_box}>
            <Row>
                {
                    data.thumbnail ?
                    <Col xs={24} md={12}>
                        <div className={styles.x_gd_box_thumbnail}>
                            <Image alt={data.post_title} src={data.thumbnail[0]} width={data.thumbnail[1]} height={data.thumbnail[2]}/>
                        </div>
                    </Col> : ''
                }
                <Col xs={24} md={12}>
                    <div className={styles.x_gd_list_content}>
                        <Link href={`/giao-dien/${data.post_name}`}>
                                <a className={styles.x_gd_box_link}>
                            <h3 className={styles.x_gd_box_tittle}>{data.post_title}</h3>
                            </a>
                        </Link>
                        <p className={styles.x_gd_box_description}>
                            {HTMLReactParser(data.post_excerpt)}
                        </p>
                        <div className={styles.x_gd_list_price}>
                            <Price data={data.price}/>
                        </div>
                        <div className={styles.x_gd_box_button}>
                            <Link href={`/giao-dien/xem-giao-dien/${data.post_name}`}>
                                <a className={styles.x_gd_box_link}>
                                <Button className={styles.x_gd_view_button}>
                                        Xem giao diện
                                </Button>
                                </a>
                            </Link>
                            <Link href={`/giao-dien/${data.post_name}`}>
                                <a className={styles.x_gd_box_link}>
                                    <Button className={styles.x_gd_create_button}>
                                        Sử dụng mẫu
                                    </Button>
                                </a> 
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const Themes = ({gd, nganh, danhmuc, max_pages}) => {

    const [posts, setPosts] = useState(gd);
    const [paged, setPaged] = useState(1);
    const [loading, setLoading] = useState(false);
    const [max_paged, setMax_paged] = useState(max_pages);
    const [formvalue, setFormValue] = useState({
        s: '',
    })
    
    const formRef = useRef();

    const Paged = [
        {
            label: '8 giao diện',
            value: 8,
            role: "Master"
        },
        {
            label: '16 giao diện',
            value: 16,
            role: "Master"
        },
        {
            label: '24 giao diện',
            value: 24,
            role: "Master"
        }
    ];
    
    const[openFilter, setOpenFilter] = useState(false);
    const[displayGrid, setDisplayGrid] = useState(true);
    const[filterNganh, setFilterNganh] = useState([]);
    const[perPage, setPerPage] = useState(Paged[0].value);
    const[keySearch, setKeySearch] = useState('');

    const handleChange = (e) => {
        setFilterNganh(e);
    };

    const HandleSubmitSearch = () => {
        setKeySearch(formvalue.s);
    }

    useEffect(() => {
        const handleUpdateGd = async () => {
            const nganhTerms = filterNganh.join(',');
            // Pass data to the page via props
            setLoading(true);
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            const response = await axios.get(`${rootURL}giao-dien/giao-dien-mau?p=${paged}&perpage=${perPage}&nganh=${nganhTerms}&s=${keySearch}`).then((resonse) => resonse.data);
            if(!response.error){
                setPosts(response.posts);
                setMax_paged(response.max_pages);
            } else {
                toaster.push(<Message type='warning'>Không tìm thấy nội dung với bộ lọc tìm kiếm</Message>);
            }
            setLoading(false);
        }
        handleUpdateGd();
    }, [filterNganh, perPage, keySearch])

    const SortByCategory = ({data}) => {
        return(
            <List className={styles.x_filter_category_list} hover>
                {data.map((val) => {
                    return (
                        <List.Item key={val.term_id} index={val.term_id}>
                            <Link href={'/danh-muc-giao-dien/' + val.slug}>
                                <a className={styles.x_filter_category}>
                                    <IoCaretForwardSharp size={12}/> {val.name}
                                    <span className={styles.x_count}>{val.count}</span>
                                </a>
                            </Link>
                        </List.Item>
                    )
                })}
            </List>
        )
    }

    const SortByJobs = ({data}) => {
      return(
        <CheckboxGroup 
            value={filterNganh}
            name="checkboxList" 
            onChange={(e) => {handleChange(e)}}>
            {data.map((val) => {
                if(val.count != 0){
                    return (
                        <Checkbox key={val.term_id} value={val.slug}>
                            {val.name}
                            <span className={styles.x_count}>{val.count}</span>
                       </Checkbox>
                    )
                } else return '';
            })}
        </CheckboxGroup>
        )
    }

    const Next_Pages = async(num) => {
        const nganhTerms = filterNganh.join(',');
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        setLoading(true);
        setPaged(num);
        const response = await axios.get(`${rootURL}giao-dien/giao-dien-mau?p=${num}&perpage=${perPage}&nganh=${nganhTerms}&s=${keySearch}`).then((resonse) => resonse.data);
        if(response){
            setPosts(response.posts);
            setMax_paged(response.max_pages);
        }
        setLoading(false);
 }

  return (
    <>
    <div className={'x_breadcum_container'}>
        <Container>
            <Row>
                <Col xs={24}>
                    <Breadcrumb className={'x_breadcumb'}>
                        <Breadcrumb.Item as={Link} href="/">Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item active>Giao diện mẫu</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </Container>
    </div>
    <div className={styles.x_gd_section}>
                <Container>
                    <Row>
                        
                        {
                           openFilter ? 
                           <div className={styles.x_close_filter} onClick={() => { setOpenFilter(false) }}>
                                <span className={styles.x_close}>
                                    <IoCloseCircleOutline size={24} color={'white'}/>
                                </span>
                           </div> : ''
                        }
                        <Col xs={24} md={24} lg={6} className={ openFilter ? styles.x_fixed_filter + ' ' + styles.x_fixed_filter_open : styles.x_fixed_filter}>
                            <div className={styles.x_sidebar}>
                                <h3 className={styles.x_gd_title}>Lọc theo danh mục</h3>
                                <SortByCategory data={danhmuc}/>
                                <h3 className={styles.x_gd_title}>Lọc theo ngành</h3>
                                <div className={styles.x_SortByJobs}>
                                    <SortByJobs data={nganh}/>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={18}>
                                <Row className={styles.x_flexing}>
                                    <Col xs={24} md={8}>
                                        <ButtonToolbar className={styles.x_filter_group}>
                                            <Button className={styles.x_fillter_button} onClick={() => { setDisplayGrid(false) }}>
                                                <IoListSharp /> Danh sách
                                            </Button>
                                            <Button className={styles.x_fillter_button} onClick={() => { setDisplayGrid(true) }}>
                                                <IoGridOutline /> Lưới
                                            </Button>
                                            <Button className={styles.x_fillter_button + ' ' + styles.x_filter_button_change} onClick={() => { setOpenFilter(true) }}>
                                                <IoFunnelOutline /> Lọc
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <div className={styles.x_form_filter}>
                                            <Form.Group className={styles.x_margin_x}>
                                                <SelectPicker 
                                                    onChange={(e) => { setPerPage(e) }}
                                                    searchable={false}
                                                    placeholder='Số lượng'
                                                    name='paged'
                                                    data={Paged} 
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Group>
                                            <Form 
                                                fluid
                                                onSubmit={HandleSubmitSearch}
                                                onChange={setFormValue}
                                                className={styles.x_gd_form}
                                                formValue={formvalue}
                                                ref={formRef}
                                                >
                                                <Form.Group className={styles.x_form_search_group}>
                                                            <Form.Control 
                                                                type="text"
                                                                value={EventTarget.value}
                                                                name='s'
                                                                placeholder={'Tìm kiếm giao diện...'}
                                                                className={styles.x_form_search_posts}
                                                            />
                                                </Form.Group>
                                                <Button className={styles.x_search_posts_button} type='submit'>
                                                   {
                                                    loading ? 
                                                    <Loader size={'xs'} speed="fast"/> : 
                                                    <IoSearchOutline size={16} color={"white"} />
                                                   } 
                                                </Button>
                                            </Form>
                                        </div>
                                    </Col>
                                </Row>
                            <Row>
                            {
                            loading ?  <Col xs={24}><Loading /></Col> :
                             <>
                                {
                                    posts.map((val) => {
                                        return  displayGrid ? 
                                        <Col xs={24} md={12} key={val.ID}>
                                            <GD_Box data={val}/>
                                        </Col>
                                        :
                                        <Col xs={24} key={val.ID}>
                                                <GD_List data={val}/>
                                        </Col>
                                    })
                                }
                                {
                                    max_pages >= 2 ? 
                                    <Col xs={24}>
                                        <div className={styles.x_pagination}>
                                            <Pagination total={max_paged} limit={1} activePage={paged} onChangePage={(current) => { Next_Pages(current)}} />
                                        </div>
                                    </Col> : ''
                                }
                             </>
                            }
                         </Row>
                        </Col>
                    </Row>
                </Container>
      </div>
    </>
  )
}

export default Themes

export async function getServerSideProps(context) {

    const page = context.query ? context.query.pages : 1;
    const res = await axios.get(rootURL + 'giao-dien/giao-dien-mau?p=' + page).then((resonse) => resonse.data);
  
    // Pass data to the page via props
    return { props: { 
      gd: res.posts,
      nganh: res.nganh,
      danhmuc: res.danh_muc, 
      max_pages: res.max_pages
   }}
  }