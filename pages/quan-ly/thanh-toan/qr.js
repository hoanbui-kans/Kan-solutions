import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Panel, Button } from 'rsuite';
import { IoCheckmarkOutline, IoHome } from "react-icons/io5";
import styles from '../../../styles/account.module.css';
import Link from 'next/link';
import Image from 'next/image';
const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const qr = ({response}) => {
  return (
    !response.error ? 
        <>
            <section className={styles.x_qr_pay_section}>
                <Container>
                    <Row>
                        <Col xs={24}>
                            <Panel bordered className={styles.x_payment_infor}>
                                <IoCheckmarkOutline size={100} color="var(--x-success-color)"/>
                                <h1>Thanh toán hoàn tất</h1>
                                <Link href="/quan-ly/tai-khoan">
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
    : ''
  )
}

export default qr

export async function getServerSideProps(context) {
    const FormData = require('form-data');
    let fd = new FormData();
    const update_transaction_json = rootURL + 'mservice/update-transaction'
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
                console.log(key, element)
                fd.append(key, element);
            }
    }

    const config = {
      method: 'POST',
      url: update_transaction_json,
      data : fd,
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