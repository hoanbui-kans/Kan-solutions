import React, { useState } from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";
import { Container, Row, Col, Button, Divider, Modal  } from 'rsuite'
import styles from '../../../styles/services/webdesign.module.css'
import { HostingTable, WebsiteDesignTable } from '../../api/services'
import ServicesSubmitForm from '../../../components/handleSubmitServices'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Upgrade = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);  
    const [service, setService] = useState(''); 
    const router = useRouter()
    const { site_id } = router.query

    const handleOpen = (service) => {
        console.log( service );
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
                                <h3 className={styles.x_section_secondary_title}>Dành cho thành viên</h3>
                                <h2 className={styles.x_primary_title}>Bảng giá xây dựng với KanBox</h2>
                            </div>
                            <div className={styles.x_hosting_table_container}>
                                <Row>
                                    {
                                        HostingTable.map((val, index) => {
                                            if(index == 0){
                                                return "";
                                            }
                                            return(
                                                <Col xs={24} md={12} lg={12} key={index}>
                                                    <div className={styles.x_hosting}>
                                                        <div className={styles.x_hosting_header}>
                                                            <h3>{val.name}</h3>
                                                            <p>{val.price} /Tháng</p>
                                                            <Button className={styles.x_hosting_button} onClick={() => { handleOpen('Đăng ký gói dịch vụ: ' + val.name + ' - site id: ' + site_id) }}>Đăng ký</Button>
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
            <Divider />
            <section className={styles.x_hosting_section}>
                <Container>
                    <Row className={styles.x_centered}>
                        <Col xs={24}>
                            <div className={styles.x_hosting_title}>
                                <h3 className={styles.x_section_secondary_title}>Dành cho đối tác - khách hàng</h3>
                                <h2 className={styles.x_primary_title}>Bảng giá thiết kế website trọn gói</h2>
                            </div>
                            <div className={styles.x_hosting_table_container}>
                                <Row>
                                    {
                                        WebsiteDesignTable.map((val, index) => {
                                            return(
                                                <Col xs={24} md={12} lg={8} key={index}>
                                                    <div className={styles.x_hosting}>
                                                        <div className={styles.x_hosting_header}>
                                                            <h3>{val.name}</h3>
                                                            <p>{val.price}</p>
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