import React, { useState } from 'react'
import { Container, Row, Col, Navbar, Nav, Form, Button, ButtonToolbar, ButtonGroup, Toggle, Sidenav, Progress, Badge, Panel } from 'rsuite'
import axios from 'axios';
import styles from '../../../styles/account.module.css'
import UserNav from '../../../components/user-manager/UserNav';
import moment from 'moment';
import Link from 'next/link';
import { Separator } from '../../giao-dien/[slug]';
import { IoSearchOutline, 
  IoAlbumsOutline, 
  IoAddSharp, 
  IoLinkOutline, 
  IoBookmarkOutline, 
  IoCalendarClearOutline,
  IoBuild,
  IoWallet,
  IoCellular, 
  IoCalendarOutline } from "react-icons/io5";

const FormData = require('form-data');
const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const ExtentsPost = ({data}) => {
  const request = data.request;
  return(
    <Panel bordered header={data.post_title}>
        <p>Tổng thanh toán {Separator(request.price_bill)}đ</p>
        <Row>
          <Col xs={12}>
            <div className={styles.x_account_button}>
              <Button className={styles.x_banking_infor_button}>
                <IoWallet />
                Chuyển khoản ngân hàng
              </Button>
            </div>
          </Col>
          <Col xs={12}>
            <div className={styles.x_account_button}>
              <Button>
                <IoWallet className={styles.x_momo_banking_service}/>
                Thanh toán bằng ví Momo
              </Button>
            </div>
          </Col>
        </Row>
    </Panel>
  );
}

const Extends = ({posts}) => {
  const [expanded, setExpanded] = useState(false);
  return (
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
                    <Row className={styles.x_create_section}>
                        {
                          posts.length > 0 ? 
                          posts.map((val) => {
                            return(
                              <Col xs={12} key={val.ID}>
                                <ExtentsPost data={val}/>
                              </Col>
                            )
                          }) : 'Chưa có thông tin thanh toán'
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Extends

export async function getServerSideProps(context) {
  const site_id = context.query.site_id;
  const transaction_json = rootURL + 'mservice/get-order-info';

  let fd = new FormData();
  fd.append('site_id', site_id);

  const config = {
    method: 'POST',
    url: transaction_json,
    data : fd,
  };

  const response = await axios(config).then((resonse) => resonse.data);
  console.log(response);
  // Pass data to the page via props
  return { props: { 
      posts: response,
  }}
}