import React, { useState } from 'react'
import { Nav } from 'rsuite'
import Link from 'next/link'
import styles from '../../styles/account.module.css'
// Import Icons
import DashboardIcon from '@rsuite/icons/Dashboard';
import GearIcon from '@rsuite/icons/Gear';
import PcIcon from '@rsuite/icons/Pc';
import ImportIcon from '@rsuite/icons/Import';
import CreativeIcon from '@rsuite/icons/Creative';
import SpeakerIcon from '@rsuite/icons/Speaker';

const UserNav = () => {
    return (
        <>
        <Nav className={styles.x_account_nav}>
                <Nav.Item as={'span'} eventKey="1" icon={<DashboardIcon />}>
                    <Link href={'/quan-ly/tai-khoan'}>
                        Tổng quan về tài khoản
                    </Link>
                </Nav.Item>
                <Nav.Menu placement="rightStart" eventKey="2" title="Quản lý trang web" icon={<PcIcon />}>
                    <Nav.Item as={'span'} eventKey="2-1">
                        <Link href={'/quan-ly/tai-khoan'}>
                            Tất cả các trang
                        </Link>
                    </Nav.Item>
                    <Nav.Item as={'span'} eventKey="2-1">
                        <Link href={'/quan-ly/thanh-toan'}>
                            Quản lý thanh toán
                        </Link>
                    </Nav.Item>
                    <Nav.Item as={'span'} eventKey="2-1">
                        <Link href={'/quan-ly/ho-tro-truc-tuyen'}>
                            Hỗ trợ trực tuyến
                        </Link>
                    </Nav.Item>
                </Nav.Menu>
                <Nav.Menu placement="rightStart" eventKey="3" title="Cài đặt" icon={<GearIcon />}>
                    <Nav.Item as={'span'} eventKey="3-1">
                        <Link href={'/quan-ly/chinh-sua-thong-tin'}>
                            Chỉnh sửa thông tin
                        </Link>
                    </Nav.Item>
                </Nav.Menu>
                <Nav.Item as={'span'} icon={<SpeakerIcon />} eventKey="4">
                    <Link href="/quan-ly/thong-bao">
                        Thông báo
                    </Link>
                </Nav.Item>
                <Nav.Item as={'span'} icon={<ImportIcon />} eventKey="5">
                    <Link href="/quan-ly/huong-dan">
                        Hướng dẫn sử dụng
                    </Link>
                </Nav.Item>
                <Nav.Menu placement="rightStart" eventKey="6" title="Dịch vụ" icon={<CreativeIcon  />}>
                    <Nav.Item as={'span'} eventKey="6-1">
                        <Link href="/dich-vu/thiet-ke-website-tron-goi-cho-doanh-nghiep">Thiết kế website</Link>
                    </Nav.Item>
                    <Nav.Item as={'span'} eventKey="6-2">
                        <Link href="/dich-vu/giai-phap-quan-tri-noi-dung-website-cho-doanh-nghiep">Quản trị website</Link>
                    </Nav.Item>
                    <Nav.Item as={'span'} eventKey="6-3">
                        <Link href="/dich-vu/giai-phap-marketing-online-cho-doanh-nghiep">Giải pháp marketing online</Link>
                    </Nav.Item>
                </Nav.Menu>   
            </Nav>
        </>
    )
}

export default UserNav