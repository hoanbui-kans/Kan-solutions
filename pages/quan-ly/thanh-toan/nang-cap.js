import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import { IoCheckmarkOutline, IoStorefront } from "react-icons/io5";
import { ServicesCreateWebsite } from '../../api/HeaderSeo'
import { Container, Row, Col, Button, Divider, Modal  } from 'rsuite'
import styles from '../../../styles/services/webdesign.module.css'
import { HostingTable } from '../../api/services'
import ServicesSubmitForm from '../../../components/handleSubmitServices'

const Upgrade = () => {
    const [open, setOpen] = useState(false);  
    const [service, setService] = useState(''); 

    const handleOpen = (service) => {
        setService(service);
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    return (
        <>
                <section className={styles.x_hosting_section} style={{padding: '55px 0px'}}>
                <Container>
                    <Row className={styles.x_centered}>
                        <Col xs={24}>
                            <div className={styles.x_hosting_title} style={{marginBottom: '35px'}}>
                                <h2 className={styles.x_primary_title}>Bảng giá tạo website wordpress</h2>
                            </div>
                            <div className={styles.x_hosting_table_container}>
                                <Row>
                                    {
                                        HostingTable.map((val, index) => {
                                            return(
                                                <Col xs={24} md={12} lg={8} key={index}>
                                                    <div className={styles.x_hosting}>
                                                        <div className={styles.x_hosting_header}>
                                                            <h3>{val.name}</h3>
                                                            <p>{val.price} /Tháng</p>
                                                            <Button className={styles.x_hosting_button} onClick={() => { handleOpen('Dịch vụ hosting ' + val.name) }}>Đăng ký</Button>
                                                        </div>
                                                        <div className={styles.x_hosting_features}>
                                                            <ul>
                                                                {
                                                                    val.checklist.map((val, index) => {
                                                                        return( 
                                                                            <li key={index}>
                                                                                <span className={styles.x_hosting_check}>
                                                                                    <IoCheckmarkOutline color='white'/>
                                                                                </span>
                                                                                {val}
                                                                            </li>
                                                                        )
                                                                    })    
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }       
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Modal open={open} onClose={handleClose} backdrop="static">
            <Modal.Header>
            <Modal.Title>Đăng ký dịch vụ thiết kế Website</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ServicesSubmitForm service={service}/>
            </Modal.Body>
        </Modal>
        </>
  )
}

export default Upgrade