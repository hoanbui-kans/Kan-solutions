import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Panel, Button, List } from 'rsuite';
import { getSession } from 'next-auth/react';
import { IoHome, IoShieldCheckmarkSharp, IoTimeSharp, IoShieldHalf } from "react-icons/io5";
import styles from '../../../styles/account.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '../../giao-dien/[slug]';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const Header =({data}) => {
    switch(data.resultCode){
        case '0':
            return(
                <div className={styles.x_order_header}>
                   <h3>Hóa đơn: {data.orderId}</h3>
                    <div className={styles.x_order_message}>
                        <span className={styles.x_order_icons}>
                        <IoShieldCheckmarkSharp size={50} color="#1abc9c"/>
                    </span>
                    <h1> 
                        Thanh toán thành công
                    </h1>
                    </div>
                </div>
            );
        break;
        case '1':
            return(
                <div className={styles.x_order_header}>
                   <h3>Hóa đơn: {data.orderId}</h3>
                    <div className={styles.x_order_message}>
                        <span className={styles.x_order_icons}>
                        <IoTimeSharp size={50} color="#27ae60"/>
                    </span>
                        <h1> 
                            Đang chờ thanh toán
                        </h1>
                    </div>
                </div>
            );
        break;
        default: 
        return(
            <div className={styles.x_order_header}>
               <h3>Hóa đơn: {data.orderId}</h3>
                <div className={styles.x_order_message}>
                    <span className={styles.x_order_icons}>
                    <IoShieldHalf size={50} color="#34495e"/>
                </span>
                <h1> 
                    Thanh toán thất bại
                </h1>
                </div>
            </div>
        );
    }
}

const qr = ({response}) => {
  const POST = response.post;
  return (
    POST ? 
        <>
            <section className={styles.x_qr_pay_section}>
                <Container>
                    <Row>
                        <Col xs={24}>
                            <Panel bordered className={styles.x_payment_infor}>
                                <Header data={POST}/>
                                <List>
                                    <List.Item key={1} index={1} className={styles.x_list}>
                                        {POST.orderInfo}
                                    </List.Item>
                                    <List.Item key={2} index={2} className={styles.x_list}>
                                        Tổng thanh toán: {Separator(POST.amount)}
                                    </List.Item>
                                    <List.Item key={3} index={3} className={styles.x_list}>
                                        Tình trạng thanh toán: {POST.message}
                                    </List.Item>
                                </List>
                                <Link href="/quan-ly">
                                    <a>
                                        <Button className={styles.x_return_to_dashboard}>
                                            <IoHome />
                                            Trở về quản lý tài khoản
                                        </Button>
                                    </a>
                                </Link>
                            </Panel>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    : <>
        <section className={styles.x_qr_pay_section}>
            <Container>
                <Row>
                    <Col xs={24}>
                        <Panel bordered className={styles.x_payment_infor}>
                            <h3 style={{marginBottom: 35, textAlign: 'center'}}>Xin lỗi!! <br />Không có thông tin thanh toán</h3>
                            <Link href="/quan-ly">
                                <a>
                                    <Button className={styles.x_return_to_dashboard}>
                                        <IoHome />
                                        Trở về quản lý tài khoản
                                    </Button>
                                </a>
                            </Link>
                        </Panel>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default qr

export async function getServerSideProps (context) {
    const session = await getSession(context);
    const token = session ? session.user.token.token : '';
    const FormData = require('form-data');
    let fd = new FormData();
    const update_transaction_json = rootURL + 'mservice/v1/update-transaction'
    const transaction = context.query;

    if(!transaction){
        return { props: { 
            response: {
                'message': 'Thông tin thanh toán chưa được cập nhật.',
                'error': true
            }
        }}
    }
        
    for (const key in transaction) {
            if (Object.hasOwnProperty.call(transaction, key)) {
                const element = transaction[key];
                fd.append(key, element);
            }
    }

    const config = {
      method: 'POST',
      url: update_transaction_json,
      data : fd,
      headers: { 
        'Authorization':  `Bearer ${token}`
      }
    };

    const response = await axios(config).then((res) => {
      return res.data
    }).catch(function (error) {
      console.log(error);
    });
    // Pass data to the page via props
    return { props: { 
        response: response
   }}
 
  }