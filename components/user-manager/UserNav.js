import React, { useState } from 'react'
import { Nav } from 'rsuite'
import Link from 'next/link'
import styles from '../../styles/account.module.css'
// Import Icons
import DashboardIcon from '@rsuite/icons/Dashboard';
import GearIcon from '@rsuite/icons/Gear';
import DocPassIcon from '@rsuite/icons/DocPass';
import CreativeIcon from '@rsuite/icons/Creative';
import SpeakerIcon from '@rsuite/icons/Speaker';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import MessageIcon from '@rsuite/icons/Message';

const UserNav = ({active}) => {
    return (
        <>
        <Nav className={styles.x_account_nav} activeKey={active}>
                <Nav.Item as={'span'} eventKey="quan-ly" icon={<DashboardIcon />}>
                        <Link href={'/quan-ly'}>
                            Tất cả các trang
                        </Link>
                 </Nav.Item>
                <Nav.Item as={'span'} eventKey="thanh-toan" icon={<CreditCardPlusIcon />}>
                    <Link href={'/quan-ly/thanh-toan'}>
                        Quản lý thanh toán
                    </Link>
                </Nav.Item>
                <Nav.Item as={'span'}  icon={<GearIcon/>} eventKey="chinh-sua-tai-khoan">
                        <Link href={'/quan-ly/chinh-sua-thong-tin'}>
                           Chỉnh sửa thông tin
                        </Link>
                </Nav.Item>
                <Nav.Item as={'span'} icon={<SpeakerIcon />} eventKey="thong-bao">
                    <Link href="/quan-ly/thong-bao">
                        Thông báo
                    </Link>
                </Nav.Item>
                <Nav.Item as={'span'} icon={<DocPassIcon />} eventKey="huong-dan">
                    <Link href="/quan-ly/huong-dan">
                        Hướng dẫn sử dụng
                    </Link>
                </Nav.Item>
                <Nav.Item as={'span'} icon={<MessageIcon />} eventKey="ho-tro">
                    <Link href={'/quan-ly/ho-tro-truc-tuyen'}>
                        Hỗ trợ trực tuyến
                    </Link>
                </Nav.Item>
                <Nav.Menu placement="rightStart" eventKey="dich-vu" title="Dịch vụ" icon={<CreativeIcon />}>
                    <Nav.Item as={'span'} eventKey="7-1">
                        <Link href="/dich-vu/thiet-ke-website-tron-goi-cho-doanh-nghiep">Thiết kế website</Link>
                    </Nav.Item>
                    <Nav.Item as={'span'} eventKey="7-2">
                        <Link href="/dich-vu/giai-phap-quan-tri-noi-dung-website-cho-doanh-nghiep">Quản trị website</Link>
                    </Nav.Item>
                    <Nav.Item as={'span'} eventKey="7-3">
                        <Link href="/dich-vu/giai-phap-marketing-online-cho-doanh-nghiep">Giải pháp marketing online</Link>
                    </Nav.Item>
                </Nav.Menu>   
            </Nav>
        </>
    )
}

export default UserNav