import React, { useState } from 'react'
import { Sidenav, Nav } from 'rsuite'
import Link from 'next/link';

// Import Icons
import GridIcon from '@rsuite/icons/Grid';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GearIcon from '@rsuite/icons/Gear';
import CreativeIcon from '@rsuite/icons/Creative';
import SpeakerIcon from '@rsuite/icons/Speaker';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';

import PageIcon from '@rsuite/icons/Page';
import ParagraphIcon from '@rsuite/icons/Paragraph';
import SiteIcon from '@rsuite/icons/Site';
import GlobalIcon from '@rsuite/icons/Global';
import MessageIcon from '@rsuite/icons/Message';
import PeoplesIcon from '@rsuite/icons/Peoples';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import DocPassIcon from '@rsuite/icons/DocPass';
import ProjectIcon from '@rsuite/icons/Project';

import styles from '../../../styles/dashboard.module.css';

const adminNav = [
    {
        title: 'Quản lý trang',
        link: '/admin/trang',
        icon: <PageIcon />
    },
    {
        title: 'Bài viết',
        link: '/admin/bai-viet',
        icon: <ParagraphIcon />,
        children: [
            {
                title: 'Thêm bài mới',
                link: '/admin/bai-viet/them-bai-viet',
            },
            {
                title: 'Danh mục bài viết',
                link: '/admin/bai-viet/danh-muc-bai-viet',
            },
            {
                title: 'Thẻ bài viết',
                link: '/admin/bai-viet/the-bai-viet',
            }
        ]
    },{
        title: 'Giao diện mẫu',
        link: '/admin/giao-dien',
        icon: <SiteIcon />,
        children:  [
            {
                title: 'Thêm giao diện mới',
                link: '/admin/giao-dien/them-giao-dien',
            },
            {
                title: 'Danh mục giao diện',
                link: '/admin/giao-dien/danh-muc-giao-dien',
            }
        ]
    },
    {
        title: 'Dịch vụ',
        link: '/admin/dich-vu',
        icon: <GlobalIcon />,
        children: [
            {
                title: 'Thêm dịch vụ mới',
                link: '/admin/dich-vu/them-dich-vu',
            },
            {
                title: 'Danh mục dịch vụ',
                link: '/admin/dich-vu/danh-muc-dich-vu',
            }
        ]
    },
    {
        title: 'Khách hàng',
        link: '/admin/khach-hang',
        icon: <UserInfoIcon />,
        children: [
            {
                title: 'Thêm khách hàng mới',
                link: '/admin/khach-hang/them-khach-hang',
            },
            {
                title: 'Danh mục khách hàng',
                link: '/admin/khach-hang/danh-muc-khach-hang',
            }
        ]
    },
    {
        title: 'Hợp đồng',
        link: '/admin/hop-dong',
        icon: <DocPassIcon />,
        children: [
            {
                title: 'Thêm hợp đồng mới',
                link: '/admin/hop-dong/them-hop-dong',
            },
            {
                title: 'Danh mục hợp đồng',
                link: '/admin/hop-dong/danh-muc-hop-dong',
            }
        ]
    },
    {
        title: 'Quản lý dự án',
        link: '/admin/du-an',
        icon: <ProjectIcon />,
        children: [
            {
                title: 'Thêm dự án mới',
                link: '/admin/du-an/them-du-an',
            },
            {
                title: 'Danh mục dự án',
                link: '/admin/du-an/danh-muc-du-an',
            }
        ]
    },
    {
        title: 'Bình luận',
        link: '/admin/binh-luan',
        icon: <MessageIcon />,
        children: [
            {
                title: 'Thêm bình luận mới',
                link: '/admin/binh-luan/them-binh-luan',
            }
        ]
    },
    {
        title: 'Thành viên',
        link: '/admin/thanh-vien',
        icon: <MessageIcon />,
        children: [
            {
                title: 'Thêm Thành viên mới',
                link: '/admin/thanh-vien/them-thanh-vien',
            }
        ]
    },
    {
        title: 'Cài đặt thông tin',
        link: '/admin/cai-dat',
        icon: <PeoplesIcon />
    },
]
const index = ({active}) => {
    return (
        <>
        <Sidenav 
        className={styles.x_dashboard_sidenav_content}
        appearance="subtle"
        >
            <Sidenav.Header>
                <Nav>
                    <Nav.Item as={'span'} eventKey="quan-ly" icon={<GridIcon />}>
                        <Link href={'/admin'}>
                        Quản trị
                        </Link>
                    </Nav.Item>
                 </Nav>
            </Sidenav.Header>
        <Sidenav.Body>
        <Nav activeKey={active}>
            {
                adminNav.map((value, index) => {
                    if(value.children){
                        return (
                            <Nav.Menu key={index} placement="rightStart" eventKey={value.link} title={value.title} icon={value.icon}>
                                {
                                    value.children.map((val, _i) => {
                                        return (
                                            <Nav.Item key={_i} as={'span'} eventKey={`${value.link}-${val.link}`}>
                                                <Link href={val.link}>{val.title}</Link>
                                            </Nav.Item>
                                        )
                                    })
                                }
                            </Nav.Menu>   
                        )
                    }
                    return (
                        <Nav.Item key={index} as={'span'} icon={value.icon} eventKey={value.link}>
                            <Link href={value.link}>{value.title}</Link>
                        </Nav.Item>
                    )
                })
            }
            </Nav>
        </Sidenav.Body>
        </Sidenav>
        </>
    )
}

export default index