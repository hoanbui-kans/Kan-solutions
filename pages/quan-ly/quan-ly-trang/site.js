import { useState, useEffect } from 'react';
import {    
    Container,
    Row,
    Col,
    Form,
    Button,
    Modal,
    Sidenav,
    toaster,
    Loader,
    InputGroup,
    Message,
    Table,
    Input,
    Progress,
    ButtonToolbar, 
    SelectPicker
} from 'rsuite';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image'; 
import UserNav from '../../../components/user-manager/UserNav';
import styles from '../../../styles/account.module.css';
import MenuIcon from '@rsuite/icons/Menu';
import {
  IoLinkOutline, 
  IoCalendarClearOutline,
  IoCalendarOutline,
  IoPaperPlane,
  IoArrowForwardSharp  } from "react-icons/io5";
import Link from 'next/link';  
import moment from 'moment';
import 'moment/locale/vi'
import { RateUser } from '../../api/services';
import { locales } from '../../api/locales';
import dynamic from 'next/dynamic'
import HTMLReactParser from 'html-react-parser';

const Chart = dynamic(
  () => {
    return ( import('react-apexcharts') )
  },
  { ssr: false }
)
 
const FormData = require('form-data');
const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON
const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_ID

const SiteEditor = ({site_content}) => {
  const { data: session } = useSession();
  const [data, setSiteData] = useState(site_content);
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

  const [LineStroke, setLineStroke] = useState({
    strokeColor: '#4caf50',
    status: 'success'
  });

  const [percent, setPercent] = useState('');
  const SiteIcon = data.site_icon && data.site_icon != 'empty' ? data.site_icon : '/icons/favicon.png'
  const StoreAvaiable = parseInt(data.quota);
  const DisplayAvaiableUpload = StoreAvaiable < 1024 ? StoreAvaiable + 'mb' : (StoreAvaiable/1024) + 'gb';
  const Uploaded = parseInt(data.upload);
  const DisplayUploaded = Uploaded < 1024 ? Uploaded + 'mb' : (Uploaded/1024) + 'gb'
  const Remain = StoreAvaiable - Uploaded;
  const registed = new Date(data.registered);
  const current = new Date();
  const DateRegisted = moment(registed).format('LL');
  const expired = data.get_expire ? new Date(parseInt(data.get_expire, 10) * 1000) : "";
  const expiredDate = expired ? moment(expired).format('LL') : "";
  
  function convertToSlug(Text){
    if(Text.length > 30){
      toaster.push(<Message showIcon={true} type={'warning'}>Chỉ được phép tối đa 30 ký tự</Message>);
    } else {
      let path = Text
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'');
      setPathName(path);
    }
  }

  const expiredClass = current <= expired ? styles.x_danger : styles.x_success;
  const chartValue = {
      options: { 
          colors: ['#e74c3c', '#2d88e2'],
          legend: {
              position: 'right',
              horizontalAlign: 'center',
              stroke: {
                  show: true,
              }
      },
      dataLabels: {
          enabled: true,
          position: 'bottom',
          style:{
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#000'
          },
          background: {
              enabled: true,
              foreColor: '#333',
              padding: 4,
              borderRadius: 2,
          },
          dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45
          }
          },
          labels: ['Đã tải lên', 'Còn trống'],
          theme: {
          mode: 'light', 
          palette: 'palette1', 
          monochrome: {
              enabled: false,
              color: '#255aee',
              shadeTo: 'light',
              shadeIntensity: 0.65
          },
      }
      },
      series: [Uploaded, Remain],
  }

  const site_lever = RateUser.filter((value) => {
      if(value.lever == data.lever){
          return value;
      }
  })[0];

  useEffect(() => {
      let total = expired - registed;
      let progress = current - registed;
      let percentNumber =  Math.round(progress/ total * 100 );
      if( percentNumber > 100 ){
        percentNumber = 100;
      }
      if(percent >= 0 && percent <= 50){
          setLineStroke({
              strokeColor: '#4caf50',
              status: 'success'
          });
      } else if(percent> 50 && percent <= 75){
          setLineStroke({
              strokeColor: '#ffc107',
              status: 'active'
          });
      } else if(percent > 75 && percent <= 100){
          setLineStroke({
              strokeColor: '#f44336',
              status: 'fail'
          });
      } else {
          setLineStroke({
              strokeColor: '#b02318',
              status: 'fail'
          });
      }
      
      setPercent(percentNumber);

  }, [percent])

  // Handle Change Doimain
  const [openReplaced, setOpenReplaced] = useState(false);
  const [loadingReplace, setLoadingReplace] = useState(false);
  const [domainReplaced, setDoimainReplaced] = useState('');
  const [domain, setDoimain] = useState(data.domain);
  const [pathName, setPathName] = useState('');

  const handleCloseReplaced = () => {
    setOpenReplaced(false);
  }
  const relaceDoimain = () => {
    setOpenReplaced(true);
  }


  let avaiable_domains = [{
    "label": 'kanbox.vn',
    "value": 'master',
    "role": "Master"
  }];

  data.avaiable_domain ? 
  data.avaiable_domain.map((value) => {
      if(value.status == 'khoi-tao' && value.doimain != data.domain){
        avaiable_domains.push({
          "label": value.domain,
          "value": value.ID,
          "role": "Master"
        })
      }
  }) : "";

  const HandleReplaceDomain = async() => {
    setLoadingReplace(true);
    // Validate doimain master
    if(domainReplaced == 'master'){
      if(pathName.length == 0){
        toaster.push(<Message showIcon={true} type={'warning'}>Đường dẫn không hợp lệ</Message>);
        setLoadingReplace(false);
        return;
      }
    } 

    const WP_JSON_URL = ROOT_URL + 'domain/add_website';
    let fd = new FormData();
    fd.append('site_id', data.blog_id);
    fd.append('domain_id', domainReplaced);
    fd.append('user_email', session.user.token.user_email);
    fd.append('path_name', pathName);
    const config = {
        method: 'POST',
        data: fd,
        url: WP_JSON_URL,
    }
    const response = await axios(config).then((res) => res.data).catch((error) => { console.log(error)});
    let type = 'warning';
    if(!response){
        toaster.push(<Message showIcon={true} type={'warning'}>Đã có lỗi xảy ra, xin vui lòng thử lại</Message>);
        return;
    }
    if(!response.error) { type = 'success'; }
    toaster.push(<Message showIcon={true} type={type}>{response.message}</Message>);
    setLoadingReplace(false);
    setTimeout(() => {
         location.reload();
    }, 1000);
  }
  console.log(showMobileNav);
  return (
    <>
      <section className={styles.x_app_section}>
          <Container>
            <Row>
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
                        <>
                          <div className={styles.x_account_nav}>
                              <Sidenav expanded={expanded}>
                                  <Sidenav.Body>
                                      <UserNav active={'quan-ly'} expanded={expanded}/>
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
                          </div> 
                          <div className={styles.x_overlay}></div>
                        </>
                        : ''
                    }
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                    <Row>
                      <Col xs={24} md={12}>
                        <div className={styles.x_blog}>
                            <Row>
                                <Col xs={24}>
                                    <a className={styles.x_blog_single_link} target={'_blank'} rel="noreferrer" href={data.home}>
                                      <Button className={styles.x_blog_single_link_button}> 
                                          <IoLinkOutline size={18} color='#999'/>
                                          Xem
                                      </Button>
                                    </a>
                                    <div className={styles.x_blog_content}>
                                      <div className={styles.x_flex_blog_image}>
                                              <span className={styles.x_blog_favicon}>
                                                  <Image width={40} height={40} alt={data.blogname} src={ SiteIcon } />
                                              </span>
                                              <div className={styles.x_single_blog_flex_content}>
                                                  <Link href={'/quan-ly/quan-ly-trang/site?id=' + data.blog_id}>
                                                      <a>
                                                          <h3>{data.blogname}</h3>
                                                          <p>{data.home}</p>
                                                      </a>
                                                  </Link>
                                              </div>
                                        </div>
                                    </div>
                                    <div className={styles.x_change_domain}>
                                      <Form 
                                        fluid
                                      >
                                        <Form.Group>
                                          <Form.ControlLabel>Thay đổi tên miền <a href="https://kansite.com.vn/bai-viet/huong-dan-tro-ten-mien-ve-server" rel="noreferrer"><small>(Xem hướng dẫn)</small></a></Form.ControlLabel>
                                          <Form.Control disabled name="domain" type="text" defaultValue={domain} onChange={(e) => {setDoimain(e)}} />
                                        </Form.Group>
                                        <Form.Group>
                                          {
                                            site_lever && site_lever.lever > 0 ?
                                              <Button 
                                                appearance="primary"  
                                                onClick={relaceDoimain}>Thay đổi tên miền
                                              </Button>
                                            : <Link href={'/quan-ly/thanh-toan/nang-cap?site_id=' + data.blog_id}>
                                                <a>
                                                  <Button 
                                                    appearance="primary"  
                                                    onClick={relaceDoimain}>Nâng cấp website
                                                  </Button>
                                                </a>
                                              </Link>
                                          }
                                        </Form.Group>
                                      </Form>
                                      {
                                        site_lever && site_lever.lever > 0 ?
                                        <p style={{margin: '15px 0px'}}>Vui lòng trỏ tên miền về <strong>{SERVER_IP}</strong></p>
                                        : 
                                        <p style={{margin: '15px 0px', fontSize: 14}}>Bạn hãy đăng ký thành viên để thực hiện tính năng này</p>
                                      }
                                    </div>
                                </Col>
                                <Col xs={24}>
                                  <h3 className={styles.x_single_site_heading}>Thời gian sử dụng</h3>
                                  <Progress.Line percent={parseInt(percent ? percent : 0)} strokeColor={LineStroke.strokeColor}/>
                               </Col>
                            </Row>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                          <div className={styles.x_blog}>
                              <Row>
                                <Col xs={24}>
                                  <h3 className={styles.x_single_site_heading}>Thông tin gói dịch vụ</h3>
                                </Col>
                                <Col xs={24}>
                                    <div className={styles.x_blog_meta_single}>
                                      <Row>
                                          <Col xs={12} md={12}>
                                            <div>
                                                <p className={styles.x_blog_meta_single_title}><IoCalendarClearOutline /> Ngày đăng ký:</p> 
                                                <span className={styles.x_date_single_badge}>{ DateRegisted }</span>
                                            </div>
                                            </Col>
                                              <Col xs={12} md={12}>
                                                <div className={expiredClass}>
                                                    <p className={styles.x_blog_meta_single_title}><IoCalendarOutline /> Sử dụng đến:</p>
                                                    <span className={styles.x_date_single_badge}>{expiredDate ? expiredDate : "Không giới hạn"}</span>
                                                </div>
                                              </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col xs={24}>
                                    <div className={styles.x_packaged}>
                                        <Row>
                                          <Col xs={12} md={12}>
                                            <div className={styles.x_single_qouta_info}>
                                                <p>Gói dịch vụ:</p>
                                                <strong>{ site_lever ? site_lever.name : ""}</strong>
                                            </div>
                                          </Col>
                                          <Col xs={12} md={12}>
                                            <div className={styles.x_single_qouta_info}>
                                                <p>Giới hạn:</p>
                                                <strong>{DisplayAvaiableUpload}</strong>
                                            </div>
                                          </Col>
                                          <Col xs={12} md={12}>
                                            <div className={styles.x_single_qouta_info}>
                                              <p>Đã tải lên:</p>
                                              <strong>{DisplayUploaded}</strong>
                                            </div>
                                          </Col>
                                          <Col xs={12} md={12}>
                                              <div className={styles.x_single_qouta_info}>
                                                  <p>Bài viết:</p>
                                                  <strong>{data.post_count}</strong>
                                              </div>
                                          </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col xs={24}>
                                      <ButtonToolbar style={{marginBottom: 15}}>
                                              <Link href={'/quan-ly/thanh-toan/nang-cap?site_id=' + data.blog_id}>
                                                  <a>
                                                    <Button className={styles.x_upgrade_single_button + ' ' + styles.x_upgrade_button}>
                                                        Nâng cấp website
                                                    </Button>
                                                  </a>
                                              </Link>
                                              <Link href={'/quan-ly/thanh-toan/gia-han?site_id=' + data.blog_id}>
                                                  <Button className={styles.x_extend_single_button + ' ' + styles.x_extend_button}>
                                                      Quản trị website
                                                  </Button>
                                              </Link>
                                        </ButtonToolbar>
                                </Col>
                            </Row>
                        </div>
                      </Col>
                    </Row>
                    <div className={styles.x_blog}>
                        <Row>
                          <Col xs={24}>
                              <h3 className={styles.x_single_site_heading}>Chi tiết sử dụng</h3>
                              <div className={styles.x_blog_single_chart}>
                                  <Chart options={chartValue.options} labels={chartValue.labels} series={chartValue.series} type="donut" width="340" />
                              </div>
                          </Col>
                        </Row>
                    </div>
                    <div className={styles.x_blog}>
                        <Row>
                          <Col xs={24}>
                              <h3 className={styles.x_single_site_heading}>Các thông báo</h3>
                              <div className={styles.x_annoucement}>
                              {
                                  data.log ? 
                                  <Table
                                      height={400}
                                      data={data.log}
                                    >
                                      <Table.Column flexGrow={1} align="center" fixed>
                                        <Table.HeaderCell><strong>Thời gian</strong></Table.HeaderCell>
                                        <Table.Cell dataKey="time">
                                          {rowData => rowData.time}
                                        </Table.Cell>
                                      </Table.Column>
                                
                                      <Table.Column flexGrow={2} fixed>
                                        <Table.HeaderCell><strong>Nội dung thông báo</strong></Table.HeaderCell>
                                        <Table.Cell dataKey="log">
                                          {rowData => HTMLReactParser(rowData.log)}
                                        </Table.Cell>
                                      </Table.Column>
                                
                                    </Table>
                                  : <p><strong>Chưa có thông báo nào</strong></p>
                                 }
                              </div>
                          </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
          </Container>
      </section>
      {
        
        site_lever && site_lever.lever > 0 ?      
          <Modal open={openReplaced} onClose={handleCloseReplaced} backdrop="static">
            <Modal.Header>
              <Modal.Title><strong>Thay đổi tên miền</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5><span style={{color: "red"}}>LƯU Ý:</span> Thay đổi tên miền</h5>
              <div className={styles.x_board_domain_change}>
                  <p style={{margin: '7px 0px'}}><small>Thông tin tên miền của bạn sẽ được thay đổi</small></p>
                  <span className={styles.x_current_domain}>
                      { data.domain }
                  </span>
                  <span className={styles.x_domain_change_arrow}>
                    <IoArrowForwardSharp />
                  </span>
                  <SelectPicker onChange={(e) => setDoimainReplaced(e)} style={{width: 200}} placeholder="Lựa chọn tên miền" data={avaiable_domains} locale={locales.Picker}>
                  </SelectPicker>
                  {
                    domainReplaced == 'master' ?
                    <>
                      <p style={{margin: '7px 0px'}}><small>Sử dụng đường dẫn mặc định vd: kansite</small></p>
                      <InputGroup style={{maxWidth: 410}}>
                        <InputGroup.Addon>
                          <span>kanbox.vn/</span>
                        </InputGroup.Addon>
                        <Input value={pathName} onChange={(e) => convertToSlug(e)}/>
                      </InputGroup>
                    </> : ""
                  }
              </div>
              <p style={{lineHeight: '18px', marginBottom: 20}}>
                <small>
                <span style={{color: "red"}}>*</span>
                Thông tin tên miền của bạn có thể mất vài tiếng để chạy bình thường sau khi trỏ thành công, xin vui lòng nhấp vào <Link href="/quan-ly/ho-tro">hỗ trợ</Link> để nhận trợ giúp nhanh nhất</small>
              </p>
              <Button onClick={HandleReplaceDomain} disabled={domainReplaced ? false : true} type="submit" className={styles.x_change_domain_button}>
                  { loadingReplace ? <Loader size={22}/> : <IoPaperPlane size={16}/> }
                  Thay đổi tên miền
              </Button>
            </Modal.Body>
        </Modal> : ""
    }  

    </>
  )
}

export default SiteEditor

export async function getServerSideProps (context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';
  let fd = new FormData();
  fd.append('site_id', context.query.id);

  const config = {
    method: 'POST',
    data: fd,
    url: ROOT_URL + 'quan-ly/trang',
    headers: { 
      'Authorization':  `Bearer ${token}`
    }
  };

  let response = '';

  response = await axios(config)
    .then(function (response) {
        return response.data
    }).catch(function (error) {
        console.log(error);
    });

  return { props: {
      site_content:  !response.error ? response : [],
  }};
}