import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import styles from '../../styles/themes.module.css'
import { Container, Row, Col, Form, Pagination, Button, Breadcrumb, SelectPicker, List, CheckboxGroup, Panel, Checkbox, toaster,Message,ButtonToolbar, Loader } from 'rsuite'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '../../components/Loading';
import { Separator } from '../giao-dien/[slug]';
import { IoListSharp, IoGridOutline, IoCaretForwardSharp, IoFunnelOutline, IoCloseCircleOutline, IoSearchOutline } from "react-icons/io5";
import Head from 'next/head';
import HTMLReactParser from 'html-react-parser';
import { Price, GD_Box, GD_List } from '../giao-dien';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Themes = ({gd, nganh, danhmuc, max_pages, slug, current}) => {

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
            label: '12 giao diện',
            value: 12,
            role: "Master"
        },
        {
            label: '24 giao diện',
            value: 24,
            role: "Master"
        },
        {
            label: '36 giao diện',
            value: 36,
            role: "Master"
        }
    ];
    
    const[openFilter, setOpenFilter] = useState(false);
    const[displayGrid, setDisplayGrid] = useState(true);
    const[perPage, setPerPage] = useState(Paged[0].value);
    const[keySearch, setKeySearch] = useState('');

    const[softData, setSortData] = useState({
        keySearch: '',
        perPage: Paged[0].value,
        filterNganh: [],
        paged: 1,
        max_paged: max_pages
    });

    const handleChange = (e) => {
        handleUpdateGd({...softData, filterNganh: e, paged: 1});
    };

    const HandleSubmitSearch = () => {
        handleUpdateGd({...softData, keySearch: formvalue.s, paged: 1});
    }

    const HandleChangePerpage = (e) => {
        handleUpdateGd({...softData, perPage: e ? e : 12, paged: 1});
    }

    const Next_Pages = (num) => {
        handleUpdateGd({...softData, paged: num});
    }

    const handleUpdateGd = async (data) => {
        const filterData = data;
        setSortData(filterData);
        const nganhTerms = filterData.filterNganh.join(',');
        // Pass data to the page via props
        setLoading(true);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        const response = await axios.get(`${rootURL}danh-muc-giao-dien/giao-dien-mau?danh_muc=${slug}&p=${filterData.paged}&perpage=${filterData.perPage}&nganh=${nganhTerms}&s=${filterData.keySearch}`).then((resonse) => resonse.data);
        if(!response.error){
            setPosts(response.posts);
            setSortData({...filterData, max_paged: response.max_pages});
        } else {
            toaster.push(<Message type='warning'>Không tìm thấy nội dung với bộ lọc tìm kiếm</Message>);
        }
        setLoading(false);
    }

    const SortByCategory = ({data}) => {
        return (
            <List className={styles.x_filter_category_list} hover>
                {
                    data.map((val) => {
                        return (
                            <List.Item key={val.term_id} index={val.term_id}>
                                <Link
                                    href={'/danh-muc-giao-dien/' + val.slug}
                                    className={styles.x_filter_category}>

                                    <IoCaretForwardSharp size={12}/> {val.name}
                                    <span className={styles.x_count}>{val.count}</span>

                                </Link>
                            </List.Item>
                        );
                    })
                }
            </List>
        );
    }

    const SortByJobs = ({data}) => {
        return(
          <CheckboxGroup 
              value={softData.filterNganh}
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

  return <>
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
  <div className={styles.x_website_banner}>
      <Container>
          <Row>
              <Col xs={24}>
                  <Link href="/dang-ky">

                      <Image style={{borderRadius: '.75rem'}} src="/banner/free-banner.webp" quality={100} width={1800} height={549} alt="Đăng ký thành viên"/>

                  </Link>
              </Col>
          </Row>
      </Container>
  </div>
  <div className={styles.x_gd_section}>
              <div className={ openFilter ? styles.x_fixed_filter + ' ' + styles.x_fixed_filter_open : styles.x_fixed_filter}>
                  <div className={styles.x_sidebar}>
                      <h3 className={styles.x_gd_title}>Lọc theo danh mục</h3>
                      <SortByCategory data={danhmuc}/>
                      <h3 className={styles.x_gd_title}>Lọc theo ngành</h3>
                      <div className={styles.x_SortByJobs}>
                          <SortByJobs data={nganh}/>
                      </div>
                  </div>
              </div>
              {
                  openFilter ? 
                      <div className={styles.x_close_filter} onClick={() => { setOpenFilter(false) }}>
                          <span className={styles.x_close}>
                              <IoCloseCircleOutline size={24} color={'white'}/>
                          </span>
                      </div> : ''
              }
              <Container>
                  <Row>
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
                      <Col xs={24} md={24} lg={24}>
                              <Row className={styles.x_flexing}>
                                  <Col xs={24} md={10} lg={12}>
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
                                  <Col xs={24} md={14} lg={12}>
                                      <div className={styles.x_form_filter}>
                                          <Form.Group className={styles.x_margin_x}>
                                              <SelectPicker 
                                                  onChange={(e) => { HandleChangePerpage(e) }}
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
                                 posts.length > 0
                                 ? <>
                                    {
                                      posts.map((val) => {
                                          return  displayGrid ? 
                                          <Col xs={24} md={12} lg={8} key={val.ID}>
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
                                              <Pagination total={softData.max_paged} limit={1} activePage={softData.paged} onChangePage={(current) => { Next_Pages(current)}} />
                                          </div>
                                      </Col> : ''
                                  }
                                  </>
                                  :
                                  <Col xs={24}>
                                    <h3 style={{fontSize:'18px', textAlign: 'center'}}>Không có trong kết quả tìm kiếm</h3>
                                  </Col>
                              }
                           </>
                          }
                          {
                              current.description ? 
                              <>
                                  <Panel bordered className={styles.x_category_description}>
                                          {
                                              HTMLReactParser( current.description )
                                          }
                                  </Panel>
                              </> : ''    
                          }
                       </Row>
                      </Col>
                  </Row>
              </Container>
    </div>
  </>;
}

export default Themes

export async function getServerSideProps(context) {
    const page = context.query ? context.query.pages : 1;
    const slug = context.query.slug;
    const res = await axios.get(rootURL + 'danh-muc-giao-dien/giao-dien-mau?danh_muc='+ slug +'&p=' + page + '&perpage=9').then((resonse) => resonse.data);
    // Pass data to the page via props
    return { props: { 
      slug: slug,
      gd: !res.error ? res.posts : '',
      nganh: res.nganh,
      danhmuc: res.danh_muc, 
      max_pages: res.max_pages,
      current: res.current,
   }}
  }