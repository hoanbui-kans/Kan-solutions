import { useState, useRef, useEffect } from 'react';
import {    
    Container,
    Row,
    Col,
    Button,
    Modal,
    Sidenav,
    Pagination,
    toaster,
    Message,
    Table,
    FlexboxGrid ,
    List,
} from 'rsuite';
import axios from 'axios';
import Image from 'next/image'; 
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import styles from '../../styles/account.module.css';
import UserNav from '../../components/user-manager/UserNav';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import Router from 'next/router'
import { Separator } from '../giao-dien/[slug]';
import { locales } from '../api/locales';
import 'moment/locale/vi'

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

const PaymentInfo = ({posts}) => {
    const mservice_qr_uri = `${ROOT_URL}mservice/qr`;
    const mservice_atm_uri = `${ROOT_URL}mservice/atm`;
    const [loading_create, set_loading_create] = useState(false);
    const [formValue, setFormvalue] = useState({
        order_id: ''
    });
    const[showMobileNav, setShowMobileNav] = useState(false);

    // Modal tạo dữ liệu 
    const [open, setOpen] = useState(false);  
    const handleClose = () => setOpen(false);

    const handleOpen = (site_info) => {
        setFormvalue({
            order_id: site_info.ID,
        });
        setOpen(true)
    };

    const HandleRequestPaymentMomo = async (type) => {
            set_loading_create(type);
            let request_uri = mservice_qr_uri;
            if(type == 'atm'){
                request_uri = mservice_atm_uri;
            }
            let fd = new FormData();
            fd.append('order_id', formValue.order_id);
            const config = {
                method: 'post',
                url: request_uri,
                data : fd,
            };
            
            const response = await axios(config).then((res) => {
                return res.data
            }).catch(function (error) {
                console.log(error);
            });
        
            
            if(response){
            let type = 'success';
            if(response.error){
                type = 'warning';
                <Message showIcon type='error'>{response.message}</Message>
            } else {
                toaster.push(<Message showIcon type={type}>{response.message}</Message>);
                set_loading_create(false);
                setFormvalue(false);
                setOpen(false);
                if(response.payment_link){
                    Router.push(response.payment_link)
                }
               console.log(response)
            }
        }
    }
    // Hiển thị
    const { data: session } = useSession();
    const [expanded, setExpanded] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [countTable, setCountTable] = useState(1); 

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const [Site_data, set_Site_data] = useState([])

    useEffect(() => {
        const newData = posts.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        });
        set_Site_data(newData);
    }, [page, limit])

    let checked = false;
    let indeterminate = false;

    if (checkedKeys.length === Site_data.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < Site_data.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? Site_data.map(item => item.id) : [];
        setCheckedKeys(keys);
    };

    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };
    useEffect(() => {
        console.log(checkedKeys);
    }, [checkedKeys])

    const NameCell = ({ rowData, dataKey, ...props }) => {
        return (
          <Table.Cell {...props}>
            {/* <Whisper placement="top" speaker={speaker}>
              <a>{rowData[dataKey].toLocaleString()}</a>
            </Whisper> */}
            <span className={styles.x_badge}>
                { rowData[dataKey].services ? rowData[dataKey].services : 'Chưa có thông tin'}
            </span>
          </Table.Cell>
        );
      };
      
      const ActionCell = ({ rowData, dataKey, ...props }) => {
        return (
          <Table.Cell {...props} className="link-group">
            {
               rowData.request.billing_status ?
               rowData.request.billing_status.value != 'success' ? 
               <Button appearance="primary" onClick={() => {handleOpen(rowData)}}>
                    <CreditCardPlusIcon style={{marginRight: 5}}/>
                    Thanh toán
                </Button>
                : 
                <Button color="green" appearance="primary">
                    <CreditCardPlusIcon style={{marginRight: 5}}/>
                    Đã thanh toán
                </Button>
                :<Button disabled color="red" appearance="primary" onClick={() => {handleOpen(rowData)}}>
                    <CreditCardPlusIcon style={{marginRight: 5}}/>
                    Tạm đóng
                </Button>
            }
          </Table.Cell>
        );
      };

    const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
    };

    let index = 1;
  return (
    <>
    <section className={styles.x_app_section}>
        <Container>
            <Row>
                <Col xs={24} md={!expanded ? 2 : 6}>
                    <Button onClick={() => {setShowMobileNav(!showMobileNav)}} color={'primary'} style={{width: '100%'}}>Menu</Button>
                    <div className={showMobileNav ? styles.x_account_nav_show : styles.x_account_nav}>
                        <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
                            <Sidenav.Body>
                                <UserNav active={'thanh-toan'} expanded={expanded}/>
                                <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                            </Sidenav.Body>
                            <Button onClick={() => {setShowMobileNav(!showMobileNav)}} color={'primary'} style={{width: '100%'}}>Menu</Button>
                        </Sidenav>
                    </div>
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                <Table 
                    rowHeight={60} 
                    height={500} 
                    data={Site_data} 
                    id="table" 
                    loading={loading}
                    bordered
                    cellBordered
                    wordWrap= 'normal'
                    style={{wordBreak: 'normal'}}
                >
                            <Table.Column width={50} align="center" resizable>
                                <Table.HeaderCell>STT</Table.HeaderCell>
                                <Table.Cell dataKey="counter" />
                            </Table.Column>

                            <Table.Column width={200} resizable>
                                <Table.HeaderCell>Tên hóa đơn</Table.HeaderCell>
                                <Table.Cell>{(rowData) => rowData.post_title }</Table.Cell>
                            </Table.Column>

                            <Table.Column width={160}>
                                <Table.HeaderCell>Gói dịch vụ</Table.HeaderCell>
                                <NameCell dataKey="request" />
                            </Table.Column>

                            <Table.Column width={200}>
                                <Table.HeaderCell>Ngày yêu cầu</Table.HeaderCell>
                                <Table.Cell>{(rowData) => {  
                                    const DateRegisted = moment(rowData.post_date).format('LL');
                                    return DateRegisted
                                }}
                                </Table.Cell>
                            </Table.Column>
                            
                            <Table.Column width={200}>
                                <Table.HeaderCell>Tình trạng thanh toán</Table.HeaderCell>
                                <Table.Cell>{(rowData) =>  rowData.request.billing_status ? rowData.request.billing_status.label : 'Chưa có thông tin'}</Table.Cell>
                            </Table.Column>

                            <Table.Column width={200}>
                                <Table.HeaderCell>Số tiền thanh toán</Table.HeaderCell>
                                <Table.Cell>{(rowData) => rowData.request.price_bill ? Separator(rowData.request.price_bill) + 'đ' : 'Chưa có thông tin'}</Table.Cell>
                            </Table.Column>

                            <Table.Column width={160} fixed="right" align='center'>
                                <Table.HeaderCell>Hành động</Table.HeaderCell>
                                <ActionCell dataKey="id" />
                            </Table.Column>
                        </Table>
                        <div style={{ padding: 20 }}>
                            <Pagination
                                prev
                                next
                                first
                                last
                                ellipsis
                                locale={locales.Pagination}
                                boundaryLinks
                                maxButtons={5}
                                size="xs"
                                layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                                total={posts.length}
                                limitOptions={[10, 20, 30, 40, 50]}
                                limit={limit}
                                activePage={page}
                                onChangePage={setPage}
                                onChangeLimit={handleChangeLimit}
                            />
                        </div>
                </Col>
            </Row>
        </Container>
    </section>

    <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title><strong>Thanh toán dịch vụ</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
               <List>
                <List.Item key={'momo_banking'} index={1}>
                    <Row height={200}>
                        <Col xs={4}>
                            <span style={{display: 'block', background: 'whitesmoke', padding: 8, borderRadius: '.35rem'}}>
                                <Image src="/payment/qr/momo.svg" width={50} height={50} alt="Thanh toán momo"/>
                            </span>
                        </Col>
                        <Col xs={12}>
                             <div>
                                <h3 style={{fontSize: 18, lineHeight:'28px', margin: 0}}>Thanh Toán bằng Ví MoMo</h3>
                                <p>Thanh toán trực tuyến bằng ví điện tử Momo</p>
                            </div>
                        </Col>
                        <Col xs={8}>
                           <Button 
                                onClick={() => {HandleRequestPaymentMomo('qr')}}
                                color="primary" 
                                style={loading_create == 'qr' ? {pointerEvents: 'none', margin: 'auto'} : {pointerEvents: 'all', margin: 'auto'}}>
                                      {loading_create == 'qr' ? 'Đang tải' : 'Thanh toán'}
                            </Button>
                        </Col>
                      </Row>
                    </List.Item>
                    <List.Item key={'atm_banking'} index={2}>
                        <Row>
                            <Col xs={4}>
                                <span style={{display: 'block', background: 'whitesmoke', padding: 8, borderRadius: '.35rem'}}>
                                    <Image src="/payment/qr/banking-direct.svg" width={50} height={50} alt="Thanh toán ngân hàng"/>
                                </span>
                            </Col>
                            <Col xs={12}>
                                <div>
                                    <h3 style={{fontSize: 18, lineHeight:'28px', margin: 0}}>Chuyển khoản ngân hàng</h3>
                                    <p>Thanh toán bằng chuyển khoản ngân hàng</p>
                                </div>
                            </Col>
                            <Col xs={8}>
                            <Button color="primary" style={{margin: 'auto'}}>Thanh toán</Button>
                            </Col>
                        </Row>
                    </List.Item>
               </List>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default PaymentInfo

export async function getServerSideProps (context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';
  const config = {
    headers: { 
      'Authorization':  `Bearer ${token}`
    }
  };
  const URL =  ROOT_URL + 'mservice/get-order-info';
  let response = '';

  response = await axios.post(URL, false, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });

  return { props: {
      posts:  response ? response : [],
  }};
}