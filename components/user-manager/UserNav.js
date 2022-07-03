import React from 'react'
import { Navbar, Nav } from 'rsuite'
import Link from 'next/link'
import { IoLogOutOutline } from 'react-icons/io5'
import styles from '../../styles/account.module.css'
const UserNav = () => {
  return (
    <div>
        <Navbar className={styles.x_app_nav}>
            <Navbar.Brand className={styles.x_brand} as={'div'}>QUẢN LÝ TÀI KHOẢN</Navbar.Brand>
                <Nav>
                <Nav.Item as={'span'}>
                    <Link href={'/quan-ly/chinh-sua-thong-tin'}>
                        Quản lý thông tin
                    </Link>
                </Nav.Item>
                <Nav.Item as={'span'}>
                    <Link href="/quan-ly/thong-bao">
                        Thông báo mới
                    </Link>
                </Nav.Item>
                <Nav.Item as={'span'}>
                    <Link href="/quan-ly/huong-dan">
                        Hướng dẫn sử dụng
                    </Link>
                </Nav.Item>
                <Nav.Menu title="Dịch vụ">
                    <Nav.Item as={'span'}>
                        <Link href="/dich-vu/thiet-ke-website">Thiết kế website</Link>
                    </Nav.Item>
                    <Nav.Item as={'span'}>
                        <Link href="/dich-vu/quan-tri-website">Quản trị website</Link>
                    </Nav.Item>
                    <Nav.Item as={'span'}>
                        <Link href="/dich-vu/marketing-online">Giải pháp marketing online</Link>
                    </Nav.Item>
                </Nav.Menu>
                </Nav>
                <Nav pullRight>
                <Nav.Item as={'span'} icon={<IoLogOutOutline />}>
                    <Link href='/quan-ly/dang-xuat'>
                        Đăng xuất
                    </Link>
                </Nav.Item>
                </Nav>
        </Navbar>
    </div>
  )
}

export default UserNav