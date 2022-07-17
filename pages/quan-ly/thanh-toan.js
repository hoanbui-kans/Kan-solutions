import { useState, useRef, useEffect } from 'react';
import {    
    Container,
    Row,
    Col,
    Form,
    Button,
    Modal,
    Sidenav,
    Pagination,
    Schema,
    toaster,
    Loader,
    Message,
    Table,
    Checkbox,
    FlexboxGrid ,
    List,
    IconButton ,
    Divider  ,
    Popover,
    Dropdown 
} from 'rsuite';
import axios from 'axios';
import Image from 'next/image'; 
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import styles from '../../styles/account.module.css';
import UserNav from '../../components/user-manager/UserNav';
import EditIcon from '@rsuite/icons/Edit';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import { IoPaperPlane } from "react-icons/io5"
import { RateUser } from '../api/services';
import Router from 'next/router'

import 'moment/locale/vi'

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

const PaymentInfo = ({posts}) => {
    // Truy xuất dữ liệu
    const formRef = useRef();
    const mservice_qr_uri = `${ROOT_URL}mservice/qr`;
    const [loading_create, set_loading_create] = useState(false);
    const [formValue, setFormvalue] = useState({
        order_id: '',
    });

    // Modal tạo dữ liệu 
    const [open, setOpen] = useState(false);  
    const handleClose = () => setOpen(false);

    const handleOpen = (site_info) => {
        console.log(site_info);
        setFormvalue({
            order_id: site_info.ID,
        });
        setOpen(true)
    };

    const HandleRequestPaymentMomo = async () => {
            set_loading_create(true);
            let fd = new FormData();
            fd.append('order_id', formValue.order_id);
            const config = {
                method: 'post',
                url: mservice_qr_uri,
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
                Router.push(response.payment_link)
            }

        }
    }
    // Hiển thị
    const { data: session } = useSession();
    const [expanded, setExpanded] = useState(false);
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
        const site_lever = RateUser.filter((value) => {
            if(value.lever == rowData[dataKey]){
                return value;
            }
        })
        return (
          <Table.Cell {...props}>
            {/* <Whisper placement="top" speaker={speaker}>
              <a>{rowData[dataKey].toLocaleString()}</a>
            </Whisper> */}
            <span className={styles.x_badge}>
                {site_lever[0].name}
            </span>
          </Table.Cell>
        );
      };
      
      const ImageCell = ({ rowData, dataKey, ...props }) => {
        const url = rowData[dataKey] && rowData[dataKey] != 'empty' ? rowData[dataKey] : '/icons/favicon.png';
        return (
            <Table.Cell {...props} style={{ padding: 0 }}>
                <div
                    style={{
                        width: 40,
                        height: 40,
                        background: '#f5f5f5',
                        borderRadius: 20,
                        marginTop: 2,
                        overflow: 'hidden',
                        display: 'inline-block'
                    }}
                >
                    <Image src={url} width={40} height={40} alt={rowData.blogname}/>
                </div>
            </Table.Cell>
      )
      };
      
      const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
        <Table.Cell {...props} style={{ padding: 0 }}>
          <div style={{ lineHeight: '46px' }}>
            <Checkbox
              value={rowData[dataKey]}
              inline
              onChange={onChange}
              checked={checkedKeys.some(item => item === rowData[dataKey])}
            />
          </div>
        </Table.Cell>
      );
      
      const renderMenu = ({ onClose, left, top, className }, ref) => {
        const handleSelect = eventKey => {
            onClose();
        };
        return (
          <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
              <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
              <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
              <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
              <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
              <Dropdown.Item eventKey={7}>About</Dropdown.Item>
            </Dropdown.Menu>
          </Popover>
        );
      };
      
      const ActionCell = ({ rowData, dataKey, ...props }) => {
        return (
          <Table.Cell {...props} className="link-group">
            <IconButton appearance="subtle" onClick={() => {handleOpen(rowData)}} icon={<CreditCardPlusIcon />} />
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
                    <div>
                        <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
                            <Sidenav.Body>
                            <UserNav expanded={expanded}/>
                            <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                            </Sidenav.Body>
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
                            <Table.Column width={50} align="center" fixed resizable>
                                <Table.HeaderCell>STT</Table.HeaderCell>
                                <Table.Cell dataKey="counter" />
                            </Table.Column>

                            <Table.Column width={200}>
                                <Table.HeaderCell>Tên hóa đơn</Table.HeaderCell>
                                <Table.Cell>{(rowData) => rowData.post_title }</Table.Cell>
                            </Table.Column>

                            <Table.Column width={160}>
                                <Table.HeaderCell>Gói dịch vụ</Table.HeaderCell>
                                <Table.Cell>{(rowData) =>  {return false}}</Table.Cell>
                            </Table.Column>

                            <Table.Column width={200}>
                                <Table.HeaderCell>Ngày đăng ký</Table.HeaderCell>
                                <Table.Cell>{(rowData) => {  
                                    const DateRegisted = moment(rowData.post_date).format('LL');
                                    return DateRegisted
                                }}
                                </Table.Cell>
                            </Table.Column>
                            
                            <Table.Column width={200}>
                                <Table.HeaderCell>Tình trạng thanh toán</Table.HeaderCell>
                                <Table.Cell>{(rowData) =>  rowData.request.billing_status ? rowData.request.billing_status.label : ''}</Table.Cell>
                            </Table.Column>

                            <Table.Column width={200}>
                                <Table.HeaderCell>Số tiền thanh toán</Table.HeaderCell>
                                <Table.Cell>{(rowData) =>  rowData.request.price_bill}</Table.Cell>
                            </Table.Column>

                            <Table.Column width={120} fixed="right">
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
                    <FlexboxGrid>
                        {/*icon*/}
                        <FlexboxGrid.Item colspan={4} style={styleCenter}>
                            <span style={{background: 'whitesmoke', padding: 8, borderRadius: '.35rem'}}>
                                <Image src="/payment/qr/momo.svg" width={50} height={50} alt="Thanh toán momo"/>
                            </span>
                        </FlexboxGrid.Item>
                        {/*base info*/}
                        <FlexboxGrid.Item
                            colspan={12}
                            style={{
                            ...styleCenter,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            overflow: 'hidden',
                            }}
                        >
                             <div>
                                <h3 style={{fontSize: 18, lineHeight:'28px', margin: 0}}>Momo QR code</h3>
                                <p>Thanh toán trực tuyến bằng ví điện tử Momo</p>
                            </div>
                        </FlexboxGrid.Item>
                        {/*uv data*/}
                        <FlexboxGrid.Item
                            colspan={8}
                            style={{
                            ...styleCenter,
                            }}
                        >
                           <Button 
                                onClick={() => {HandleRequestPaymentMomo()}}
                                color="primary" 
                                style={loading_create ? {pointerEvents: 'none'} : {pointerEvents: 'all'}}>
                                        {loading_create ? 'Đang tải' : 'Thanh toán'}
                            </Button>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </List.Item>
                    <List.Item key={'atm_banking'} index={2}>
                        <FlexboxGrid>
                            {/*icon*/}
                            <FlexboxGrid.Item colspan={4} style={styleCenter}>
                                <span style={{background: 'whitesmoke', padding: 8, borderRadius: '.35rem'}}>
                                    <Image src="/payment/qr/banking.svg" width={50} height={50} alt="Thanh toán ngân hàng"/>
                                </span>
                            </FlexboxGrid.Item>
                            {/*base info*/}
                            <FlexboxGrid.Item
                                colspan={12}
                                style={{
                                ...styleCenter,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                overflow: 'hidden',
                                }}
                            >
                                <div>
                                    <h3 style={{fontSize: 18, lineHeight:'28px', margin: 0}}>Tài khoản ngân hàng</h3>
                                    <p>Thanh toán trực tuyến bằng thẻ ATM</p>
                                </div>
                            </FlexboxGrid.Item>
                            {/*uv data*/}
                            <FlexboxGrid.Item
                                colspan={8}
                                style={{
                                ...styleCenter,
                                }}
                            >
                            <Button color="primary">Thanh toán</Button>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </List.Item>
                    <List.Item key={'atm_banking'} index={2}>
                        <FlexboxGrid>
                            {/*icon*/}
                            <FlexboxGrid.Item colspan={4} style={styleCenter}>
                                <span style={{background: 'whitesmoke', padding: 8, borderRadius: '.35rem'}}>
                                    <Image src="/payment/qr/banking-direct.svg" width={50} height={50} alt="Thanh toán ngân hàng"/>
                                </span>
                            </FlexboxGrid.Item>
                            {/*base info*/}
                            <FlexboxGrid.Item
                                colspan={12}
                                style={{
                                ...styleCenter,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                overflow: 'hidden',
                                }}
                            >
                                <div>
                                    <h3 style={{fontSize: 18, lineHeight:'28px', margin: 0}}>Chuyển khoản ngân hàng</h3>
                                    <p>Thanh toán trực tuyến bằng thẻ ATM</p>
                                </div>
                            </FlexboxGrid.Item>
                            {/*uv data*/}
                            <FlexboxGrid.Item
                                colspan={8}
                                style={{
                                ...styleCenter,
                                }}
                            >
                            <Button color="primary">Thanh toán</Button>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
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

  response = await axios.get(URL, false, config)
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