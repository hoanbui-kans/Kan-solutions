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
    SelectPicker ,
    IconButton ,
    Divider  ,
    Popover,
    Dropdown 
} from 'rsuite';
import axios from 'axios';
import Image from 'next/image'; 
import moment from 'moment';
import { getSession } from 'next-auth/react';
import styles from '../../../styles/account.module.css';
import UserNav from '../../../components/user-manager/UserNav';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import { IoPaperPlane } from "react-icons/io5"
import { RateUser } from '../../api/services';
import { locales } from '../../api/locales';
import MenuIcon from '@rsuite/icons/Menu';

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

const Create_Order = ({list_blog}) => {
    // Modal tạo dữ liệu 
    const [blogInfor, setblogInfor] = useState(list_blog);
    const [Site_data, set_Site_data] = useState([]);
    const [open, setOpen] = useState(false);  
    const [openUpdate, setOpenUpdate] = useState(false); 
    const [openDelete, setOpenDelete] = useState(false); 
    const [transactionUpdate, setTransactionUpdate] = useState(false);

    // Selecpicker email
    let selectDataEmail = [{
        "label": 'Chọn tất cả địa chỉ Email',
        "value": 'all',
        "role": "Master"
    }];
    
    let newDataEmail = [];

    // Title picker
    let selectDataTitle = [{
        "label": 'Chọn tất cả trang web',
        "value": 'all',
        "role": "Master"
    }];
    let newDataTitle = [];

    list_blog.map((val) => {
        newDataTitle.push({
            name: val.blogname ? val.blogname : 'Chưa có tiêu đề' + ' - ' + val.blog_id,
            id: val.blog_id,
        });
        if(val.list_email.length > 0){
            val.list_email.map((val) => {
                if(!newDataEmail.includes(val)){
                    newDataEmail.push(val)
                }
            })
        }
    })

    newDataTitle.map((val) => {
        selectDataTitle.push({
            "label": val.name,
            "value": val.id,
            "role": "Master"
        })
    })

    newDataEmail.map((val) => {
        selectDataEmail.push({
            "label": val,
            "value": val,
            "role": "Master"
        })
    })

    const handleSelectBlogName = (blog_id) => {
        if(blog_id == 'all' || blog_id == null){
            set_Site_data(blogInfor);
            return;
        }
        const selectedSite = blogInfor.filter((val) => {
            if(val.blog_id == blog_id){
                return val;
            }
        });
        set_Site_data(selectedSite);
    }

    const handleSelectBlogEmail = (email) => {
        if(email == 'all' || email == null){
            set_Site_data(blogInfor);
            return;
        }
        const selectedSite = blogInfor.filter((val) => {
            if(val.list_email.includes(email)){
                return val;
            }
        });
        set_Site_data(selectedSite);
    }

    const handleCloseDelete = () => setOpenDelete(false);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const handleClose = () => setOpen(false);

    const handleOpenUpdate = (site_info) => {
        setTransactionUpdate(site_info);
        setFormvalue({
            title: 'Gia hạn website ' + site_info.blogname,
            site_id: site_info.blog_id,
            price_bill: site_info.transactions[0].request.price_bill,
        });
        setOpenUpdate(true)
    };

    const handleOpenDelete = (site_info) => {
        setTransactionUpdate(site_info);
        const site_lever = RateUser.filter((value) => {
            if(value.lever == site_info.lever){
                return value;
            }
        })
        setFormvalue({
            title: 'Gia hạn website ' + site_info.blogname,
            site_id: site_info.blog_id,
            price_bill: site_lever[0].price,
            services: site_lever[0].name,
        });
        setOpenDelete(true)
    };

    const handleOpen = (site_info) => {
        const site_lever = RateUser.filter((value, i) => {
            if(value.lever == site_info.lever){
                return value;
            }
        })
        setFormvalue({
            title: 'Gia hạn website ' + site_info.blogname,
            site_id: site_info.blog_id,
            price_bill: site_lever[0].price,
            services: site_lever[0].name,
        });
        setOpen(true)
    };
    // Truy xuất dữ liệu
    const formRef = useRef();
    const Create_Order_Json = `${ROOT_URL}mservice/create-order`;
    const Update_Order_Json = `${ROOT_URL}mservice/update-order`;
    const Delete_Order_Json = `${ROOT_URL}mservice/delete-order`;

    const [loading_create, set_loading_create] = useState(false);
    const [formValue, setFormvalue] = useState({
        title: '',
        site_id: '',
        services: '',
        price_bill: '',
    });

    const model = Schema.Model({
        'title': Schema.Types.StringType().isRequired('Chưa nhập thông tin.'),
        'price_bill': Schema.Types.NumberType().isRequired('Chưa nhập thông tin.'),
    });

    const handleUpdateOrder = async () => {
            set_loading_create(true);
            let title = formValue.title;
            let site_id = formValue.site_id;
            let price_bill = formValue.price_bill;
            let services = formValue.services;

            let fd = new FormData();
            fd.append('title', title);
            fd.append('site_id', site_id);
            fd.append('price_bill', price_bill);
            fd.append('services', services);
            fd.append('ID', transactionUpdate.transactions[0].ID);
            
            
            const config = {
                method: 'post',
                url: Update_Order_Json,
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
                let newData = blogInfor.filter((value) => {
                    if(value.blog_id == site_id){
                        let transaction = [];
                        transaction.push(response.transactions);
                        value.transactions = transaction;
                    }
                    return value;
                });
                setblogInfor(newData);
                toaster.push(<Message showIcon type={type}>{response.message}</Message>);
            }
            set_loading_create(false);
            setFormvalue({
                title: '',
                site_id: '',
                price_bill: '',
                services: ''
            });
            setTransactionUpdate(false);
            setOpenUpdate(false);
        }
    }

    const handleDeleteOrder = async () => {
            set_loading_create(true);
            let site_id = formValue.site_id;
            let fd = new FormData();
            fd.append('ID', transactionUpdate.transactions[0].ID);
            const config = {
                method: 'post',
                url: Delete_Order_Json,
                data : fd,
            };
            
            const response = await axios(config).then((res) => {
                return res.data
            }).catch(function (error) {
                set_loading_create(false);
                toaster.push(<Message showIcon type={'warning'}>Lỗi chia sẻ dữ liệu hệ thống</Message>);
            });

            if(response){
            let type = 'success';
            if(response.error){
                type = 'warning';
                <Message showIcon type='error'>{response.message}</Message>
            } else {
                let newData = blogInfor.filter((value) => {
                    if(value.blog_id == site_id){
                        let transaction = [];
                        value.transactions = transaction;
                    }
                    return value;
                });
                setblogInfor(newData);
                toaster.push(<Message showIcon type={type}>{response.message}</Message>);
            }
            set_loading_create(false);
            setFormvalue({
                title: '',
                site_id: '',
                price_bill: '',
                services: ''
            });
            setTransactionUpdate(false);
            setOpenDelete(false);
        }
    }

    const handleCreateOrder = async () => {
            set_loading_create(true);
            let title = formValue.title;
            let site_id = formValue.site_id;
            let price_bill = formValue.price_bill;
            let services = formValue.services;

            let fd = new FormData();
            fd.append('title', title);
            fd.append('site_id', site_id);
            fd.append('price_bill', price_bill);
            fd.append('services', services);
            
            const config = {
                method: 'post',
                url: Create_Order_Json,
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
                 let newData = blogInfor.filter((value) => {
                    if(value.blog_id == site_id){
                        let transaction = [];
                        transaction.push(response.transactions);
                        value.transactions = transaction;
                    }
                    return value;
                });
                
                setblogInfor(newData);
                toaster.push(<Message showIcon type={type}>{response.message}</Message>);
            }
            set_loading_create(false);
            setFormvalue({
                title: '',
                site_id: '',
                price_bill: '',
                services: ''
            });
            setOpen(false);
        }
    }
    // Hiển thị
    const [expanded, setExpanded] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

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

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    useEffect(() => {
        console.log(checkedKeys);
    }, [checkedKeys])

    useEffect(() => {
        set_Site_data(blogInfor);
    }, [blogInfor])

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
        const keys = checked ? Site_data.map(item => item) : [];
        setCheckedKeys(keys);
    };

    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };

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
                {site_lever[0].name ? site_lever[0].name : 'Không có thông tin'}
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
      
      const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => {
        return(
            <Table.Cell {...props} style={{ padding: 0 }}>
              <div style={{ lineHeight: '46px' }}>
                <Checkbox
                  value={rowData}
                  inline
                  onChange={onChange}
                  checked={checkedKeys.some(item => item === rowData)}
                />
              </div>
            </Table.Cell>
          )
      };
      
      const RenderMenu = ({ onClose, left, top, className, rowData }, ref) => {
        const handleSelect = eventKey => {
            switch (eventKey) {
                case 1:
                    
                break; 
                case 2:
                    
                break; 
                default: '';
            }
            onClose();
        };
        return (
          <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
              <Dropdown.Item eventKey={1}>Chỉnh sửa</Dropdown.Item>
              <Dropdown.Item eventKey={2}>Xóa</Dropdown.Item>
            </Dropdown.Menu>
          </Popover>
        );
      };
      
      const ActionCell = ({ rowData, dataKey, ...props }) => {
        return (
          <Table.Cell {...props} className="link-group">
            {
                rowData.transactions ? 
                rowData.transactions.length == 0 ?
                <IconButton appearance="subtle" onClick={() => {handleOpen(rowData)}} icon={<CreditCardPlusIcon color='red'/>} />
                :  <>
                        <IconButton appearance="subtle" icon={<EditIcon />} onClick={() => { handleOpenUpdate(rowData) }}/>
                        <Divider vertical />
                        <IconButton appearance="subtle" icon={<CloseIcon />} onClick={() => { handleOpenDelete(rowData)}}/>
                    </>
                : ''
            }
          </Table.Cell>
        );
      };

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
                    >   <MenuIcon />
                            Menu quản lý
                        </Button>
                    {
                        showMobileNav ?
                        <div className={styles.x_account_nav}>
                            <Sidenav expanded={expanded}>
                                <Sidenav.Body>
                                    <UserNav active={'thanh-toan'} expanded={expanded}/>
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
                        </div> : ''
                    }
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                    <Row style={{marginBottom: 15}}>
                        <Col xs={24} md={12}>
                            <label style={{marginBottom: 5, display: 'block'}}>Tìm kiếm tên giao diện</label>
                            <SelectPicker onChange={handleSelectBlogName} data={selectDataTitle} style={{ width: '100%' }} />
                        </Col>
                        <Col xs={24} md={12}>
                            <label style={{marginBottom: 5, display: 'block'}}>Tìm kiếm theo địa chỉ email</label>
                            <SelectPicker onChange={handleSelectBlogEmail} data={selectDataEmail} style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Table 
                        rowHeight={60} 
                        height={640} 
                        data={Site_data} 
                        id="table" 
                        loading={loading}
                        bordered
                        cellBordered
                        affixHeader
                        affixHorizontalScrollbar
                        >
                            <Table.Column width={50} align="center">
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
                            </Table.Column>
                            <Table.Column width={80} align="center">
                                <Table.HeaderCell>Sites</Table.HeaderCell>
                                <ImageCell dataKey="site_icon" />
                            </Table.Column>

                            <Table.Column width={250}>
                                <Table.HeaderCell>Tên trang web</Table.HeaderCell>
                                <Table.Cell>{(rowData) => {
                                    return(
                                        <a href={rowData.siteurl} target='_blank' rel="noreferrer">{rowData.blogname ? rowData.blogname : 'KANSITE_NONAME'}</a>
                                    )}
                                }</Table.Cell>
                            </Table.Column>

                            <Table.Column width={140}>
                                <Table.HeaderCell>Ngày đăng ký</Table.HeaderCell>
                                <Table.Cell>{(rowData) => {  
                                    const registed = new Date(rowData.registered);
                                    const DateRegisted = moment(registed).format('L');
                                    return(
                                        <Button className={styles.x_date_button}>{DateRegisted}</Button>
                                    ) }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={140}>
                                <Table.HeaderCell>Ngày hết hạn</Table.HeaderCell>
                                <Table.Cell>{(rowData) =>  { 
                                    const expired = rowData.get_expire ? new Date(parseInt(rowData.get_expire, 10) * 1000) : "";
                                    const expiredDate = expired ? moment(expired).format('L'): "";
                                    return (
                                        <Button className={styles.x_date_button}>{expiredDate ? expiredDate : "Không giới hạn"}</Button>
                                    ) }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={140}>
                                <Table.HeaderCell>Tình trạng</Table.HeaderCell>
                                <Table.Cell>{(rowData) =>  { 
                                    const expired = rowData.get_expire ? new Date(parseInt(rowData.get_expire, 10) * 1000) : '';
                                    const expiredDate = expired ? moment(expired).format('L') : '';
                                    const current = new Date();
                                    return (
                                        <Button appearance="primary" color={current > expired && rowData.get_expire ? 'red' : 'green'} className={styles.x_date_button}>{current > expired && rowData.get_expire ? 'Hết hạn' : 'Sử dụng'}</Button>
                                    ) }}
                                </Table.Cell>
                            </Table.Column>

                            <Table.Column width={160}>
                                <Table.HeaderCell>Cấp độ</Table.HeaderCell>
                                <NameCell dataKey="lever" />
                            </Table.Column>

                            {/* <Table.Column width={300}>
                                <Table.HeaderCell>email</Table.HeaderCell>
                                <Table.Cell>{rowData => <a href={`mailto:${rowData.email}`}>{rowData.email}</a>}</Table.Cell>
                            </Table.Column> */}
                            
                            <Table.Column width={120} fixed="right" align="center">
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
                                locale={locales.Pagination}
                                maxButtons={5}
                                size="xs"
                                layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                                total={blogInfor.length}
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
          <Modal.Title>Tạo hóa đơn thanh toán</Modal.Title>
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
                    <Form.Control value={formValue ? formValue.title : ''} name="title" placeholder={"Thanh toán hóa đơn - tên hóa đơn - website"} type="text"></Form.Control>
                </Form.Group> 
                <Form.Group>
                    <Form.ControlLabel>Giá trị thanh toán</Form.ControlLabel>
                    <Form.Control value={formValue ? formValue.price : ''} name="price_bill" placeholder={"Số tiền yêu cầu thanh toán"} type="number"></Form.Control>
                </Form.Group>     
                <Form.Group>
                    <Button type="submit" color="green" className={loading_create ? styles.x_create_order_button_disabled : styles.x_create_order_button}>
                        { loading_create ? <Loader size={22}/> : <IoPaperPlane size={16}/> }
                        Đăng hóa đơn
                    </Button>
                </Form.Group>                                
           </Form>
        </Modal.Body>
    </Modal>

    <Modal open={openUpdate} onClose={handleCloseUpdate} backdrop="static">
        <Modal.Header>
        <Modal.Title>Cập nhật hóa đơn thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form
                fluid
                ref={formRef} 
                onSubmit={handleUpdateOrder}
                model={model} 
                onChange={setFormvalue}
                formValue={formValue}
                >
                <Form.Group>
                    <Form.ControlLabel>Tiêu đề</Form.ControlLabel>
                    <Form.Control value={transactionUpdate ? transactionUpdate.transactions[0].title : ''} name="title" placeholder={"Thanh toán hóa đơn - tên hóa đơn - website"} type="text"></Form.Control>
                </Form.Group> 
                <Form.Group>
                    <Form.ControlLabel>Giá trị thanh toán</Form.ControlLabel>
                    <Form.Control value={transactionUpdate ? transactionUpdate.transactions[0].price : ''} name="price_bill" placeholder={"Số tiền yêu cầu thanh toán"} type="number"></Form.Control>
                </Form.Group>     
                <Form.Group>
                    <Button type="submit" color="green" className={loading_create ? styles.x_create_order_button_disabled : styles.x_create_order_button}>
                        { loading_create ? <Loader size={22}/> : <IoPaperPlane size={16}/> }
                        Cập nhật hóa đơn
                    </Button>
                </Form.Group>                                
        </Form>
        </Modal.Body>
    </Modal>

    <Modal open={openDelete} onClose={handleCloseDelete} backdrop="static">
        <Modal.Header>
        <Modal.Title>Xóa hóa đơn thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form
                fluid
                ref={formRef} 
                onSubmit={handleDeleteOrder}
                onChange={setFormvalue}
                formValue={formValue}
            >
                <Form.Group>
                    <Form.ControlLabel>Tiêu đề</Form.ControlLabel>
                    <Form.Control value={transactionUpdate ? transactionUpdate.transactions[0].title : ''} name="title" placeholder={"Thanh toán hóa đơn - tên hóa đơn - website"} type="text"></Form.Control>
                </Form.Group> 
                <Form.Group>
                    <Form.ControlLabel>Giá trị thanh toán</Form.ControlLabel>
                    <Form.Control value={transactionUpdate ? transactionUpdate.transactions[0].price : ''} name="price_bill" placeholder={"Số tiền yêu cầu thanh toán"} type="number"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button type="submit" color="green" className={loading_create ? styles.x_create_order_button_disabled : styles.x_create_order_button}>
                        { loading_create ? <Loader size={22}/> : <IoPaperPlane size={16}/> }
                        Xóa hóa đơn thanh toán
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
  const URL =  ROOT_URL + 'quan-ly/tai-khoan/admin';
  let response = '';

  response = await axios.post(URL, false, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });

  return { props: {
      list_blog:  response ? response : [],
  }};
}