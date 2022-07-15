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
    Column,
    Checkbox,
    Whisper ,
    IconButton ,
    Divider  ,
    Popover,
    Dropdown 
} from 'rsuite';
import axios from 'axios';
import Image from 'next/image'; 
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import styles from '../../../styles/account.module.css';
import UserNav from '../../../components/user-manager/UserNav';
import EditIcon from '@rsuite/icons/Edit';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import { IoPaperPlane } from "react-icons/io5"
import { RateUser } from '../../api/services';

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

const Create_Order = ({blogInfor}) => {
    // Modal tạo dữ liệu 
    const [open, setOpen] = useState(false);  
    const handleClose = () => setOpen(false);
    const handleOpen = (site_info) => {
        const site_lever = RateUser.filter((value) => {
            if(value.lever == site_info.lever){
                return value;
            }
        })
        setFormvalue({
            title: 'Gia hạn website ' + site_info.blogname,
            site_id: site_info.blog_id,
            price_bill: site_lever[0].price,
        });
        setOpen(true)
    };
    // Truy xuất dữ liệu
    const formRef = useRef();
    const Create_Order_Json = `${ROOT_URL}mservice/create-order`;
    const [loading_create, set_loading_create] = useState(false);
    const [formValue, setFormvalue] = useState({
        title: '',
        site_id: '',
        price_bill: '',
    });
    const handleCreateOrder = async () => {
        set_loading_create(true);
        let fd = new FormData();
        fd.append('title', formValue.title);
        fd.append('site_id', formValue.site_id);
        fd.append('price_bill', formValue.price_bill);
        const token = session ? session.user.token.token : '';
        const config = {
            method: 'post',
            url: Create_Order_Json,
            data : fd,
            headers: { 
                'Authorization':  `Bearer ${token}`,
            }
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
            response.invalid_fields.map((val) => {
            setTimeout(() => {
                toaster.push(<Message showIcon type='error'>{val.message}</Message>);
            }, 1000);
            })
        }
         toaster.push(<Message showIcon type={type}>{response.message}</Message>);
        } else {
            toaster.push(<Message type='error'>Đã có lỗi xảy ra, xin vui lòng thử lại</Message>);
        }
        set_loading_create(false);
        setFormvalue({
            title: '',
            site_id: '',
            price_bill: '',
        })
    }
    // Hiển thị
    const { data: session } = useSession();
    const [expanded, setExpanded] = useState(false);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const [Site_data, set_Site_data] = useState([])

    useEffect(() => {
        const newData = blogInfor.filter((v, i) => {
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

    const model = Schema.Model({
        'title': Schema.Types.StringType().isRequired('Chưa nhập thông tin.'),
        'price_bill': Schema.Types.NumberType().isRequired('Chưa nhập thông tin.'),
    });

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
            <Divider vertical />
            <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
              <IconButton appearance="subtle" icon={<EditIcon />} />
            </Whisper>
          </Table.Cell>
        );
      };

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
                <Table rowHeight={60} height={640} data={Site_data} id="table" loading={loading}>
                            <Column width={50} align="center">
                                <Table.HeaderCell style={{ padding: 0 }}>
                                    <div style={{ lineHeight: '40px' }}>
                                        <Checkbox
                                        inline
                                        checked={checked}
                                        indeterminate={indeterminate}
                                        onChange={handleCheckAll}
                                        />
                                    </div>
                                </Table.HeaderCell>
                                <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
                            </Column>
                            <Column width={80} align="center">
                                <Table.HeaderCell>Site</Table.HeaderCell>
                                <ImageCell dataKey="site_icon" />
                            </Column>

                            <Column width={250}>
                                <Table.HeaderCell>Tên trang web</Table.HeaderCell>
                                <Table.Cell>{(rowData) => {
                                    return(
                                        <a href={rowData.siteurl} target='_blank'>{rowData.blogname}</a>
                                    )}
                                }</Table.Cell>
                            </Column>

                            <Column width={140}>
                                <Table.HeaderCell>Ngày đăng ký</Table.HeaderCell>
                                <Table.Cell>{(rowData) => {  
                                    const registed = new Date(rowData.registered);
                                    const DateRegisted = moment(registed).format('L');
                                    return(
                                        <Button className={styles.x_date_button}>{DateRegisted}</Button>
                                    ) }}
                                </Table.Cell>
                            </Column>

                            <Column width={140}>
                                <Table.HeaderCell>Ngày hết hạn</Table.HeaderCell>
                                <Table.Cell>{(rowData) =>  { 
                                    const expired = new Date(parseInt(rowData.get_expire, 10) * 1000);
                                    const expiredDate = moment(expired).format('L');
                                    return (
                                        <Button className={styles.x_date_button}>{expiredDate}</Button>
                                    ) }}
                                </Table.Cell>
                            </Column>

                            <Column width={140}>
                                <Table.HeaderCell>Tình trạng</Table.HeaderCell>
                                <Table.Cell>{(rowData) =>  { 
                                    const expired = new Date(parseInt(rowData.get_expire, 10) * 1000);
                                    const expiredDate = moment(expired).format('L');
                                    const current = new Date();
                                    return (
                                        <Button appearance="primary" color={current > expired ? 'red' : 'green'} className={styles.x_date_button}>{current > expired ? 'Hết hạn' : 'Sử dụng'}</Button>
                                    ) }}
                                </Table.Cell>
                            </Column>

                            <Column width={160}>
                                <Table.HeaderCell>Cấp độ</Table.HeaderCell>
                                <NameCell dataKey="lever" />
                            </Column>

                            <Column width={300}>
                                <Table.HeaderCell>email</Table.HeaderCell>
                                <Table.Cell>{rowData => <a href={`mailto:${rowData.email}`}>{rowData.email}</a>}</Table.Cell>
                            </Column>
                            <Column width={120} fixed="right">
                                <Table.HeaderCell>Hành động</Table.HeaderCell>
                                <ActionCell dataKey="id" />
                            </Column>
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
                                total={blogInfor.length}
                                limitOptions={[10, 20]}
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
          <Modal.Title>Đăng ký tư vấn các dịch vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form
                   fluid
                   ref={formRef} 
                   onSubmit={handleCreateOrder}
                   model={model} 
                   onChange={setFormvalue}
                   formValue={formValue}
                >
                <Form.Group>
                    <Form.ControlLabel>Tiêu đề</Form.ControlLabel>
                    <Form.Control value={formValue.title} name="title" placeholder={"Thanh toán hóa đơn - tên hóa đơn - website"} type="text"></Form.Control>
                </Form.Group> 
                <Form.Group>
                    <Form.ControlLabel>Giá trị thanh toán</Form.ControlLabel>
                    <Form.Control value={formValue.price} name="price_bill" placeholder={"Số tiền yêu cầu thanh toán"} type="number"></Form.Control>
                </Form.Group>     
                <Form.Group>
                    <Button type="submit" color="primary" className={styles.x_create_order_button}>
                        {
                            loading ? <Loader size={22}/> : <IoPaperPlane size={16}/>
                        }
                        Đăng hóa đơn
                    </Button>
                </Form.Group>                                
           </Form>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default Create_Order

export async function getServerSideProps (context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';
  const config = {
    headers: { 
      'Authorization':  `Bearer ${token}`
    }
  };
  const URL =  ROOT_URL + 'quan-ly/tai-khoan';
  let response = '';

  response = await axios.post(URL, false, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });

  return { props: {
      blogInfor:  response ? response : [],
      role: token ? token : 'Không có'
  }};
}