import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { Grid, Container, Row, Col, Form, Button, Schema, Loader, Checkbox, Message, useToaster } from 'rsuite'
import Link from 'next/link'
import styles from '../../styles/account.module.css';
import { IoHomeOutline } from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react"
import SocialButton from '../../components/SocialButton';
import { useRouter } from 'next/router';

const Loggout = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if(!session){
    useEffect(() => {
      router.push('/dang-nhap/')
    })
    
    return;
  }

  const userName = session.user ? session.user.user_display_name : '';
  const userEmail = session.user ? session.user.user_email : '';

  return (
    <>
    <Grid className={styles.x_account_container}>
       <Link href = '/'>
         <a className={styles.x_back_home}>
           <IoHomeOutline size={20}/>
           Trở về trang chủ
         </a>
       </Link>
       <Container>
         <Row>
           <Col xs={24}>
             <div className={styles.x_login + ' ' + styles.x_logged_form}>
               <h1 className={styles.x_account_title}>Xin chào {userName}</h1>
               <small>({userEmail})</small>
               <p className={styles.x_greeting}>Bạn đã đăng nhập vào hệ thống của chúng tôi, hãy bắt đầu tạo website của bạn</p>
                <Button className={styles.x_login_button + ' ' + styles.x_margin_bottom} appearance="primary" onClick={() => signOut()}>
                   Đăng xuất
                </Button>
               <SocialButton />
             </div>
           </Col>
         </Row>
       </Container>
     </Grid>
   </>
  )
}

export default Loggout