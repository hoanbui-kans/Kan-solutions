import React from 'react'
import { Container, Row, Col, Button } from 'rsuite'
import Link from 'next/link'
import styles from '../../styles/account.module.css';
import { IoHomeOutline } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react"
import SocialButton from '../../components/SocialButton';
import Image from 'next/image';

const Loggout = () => {
  const {data: session} = useSession();
  if(!session){
    return (
      <section className={styles.x_account_container}>
      <span className={styles.x_neumorphic}>
          <Image alt='layout' src={'/layout/decorations-01.svg'} width={800} height={800}/>
      </span>
      <Container className={styles.x_container}>
        <Row>
          <Col xs={24}>
            <div className={styles.x_login + ' ' + styles.x_logged_form}>
            <Link href = '/'>
                    <a className={styles.x_back_home}>
                      <IoHomeOutline size={20}/>
                      Trở về trang chủ
                    </a>
                </Link>
              <h1 className={styles.x_account_title}>Bạn chưa đăng nhập</h1>
              <p className={styles.x_greeting}>xin vui lòng click vào link đăng nhập phía bên dưới</p>
                <Link href={'/dang-nhap/'}>
                  <a>
                    <Button className={styles.x_login_button + ' ' + styles.x_margin_bottom}>
                      Đăng nhập
                    </Button>
                  </a>
              </Link>
              <SocialButton />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    )
  }
  const userName = session.user.token.user_display_name;
  const userEmail = session.user.token.user_email;
  
  return (
    <>
    <section className={styles.x_account_container}>
      <span className={styles.x_neumorphic}>
            <Image alt='layout' src={'/layout/decorations-01.svg'} width={800} height={800}/>
      </span>
       <Container className={styles.x_container}>
         <Row>
           <Col xs={24}>
             <div className={styles.x_login + ' ' + styles.x_logged_form}>
                <Link href = '/'>
                    <a className={styles.x_back_home}>
                      <IoHomeOutline size={20}/>
                      Trở về trang chủ
                    </a>
                </Link>
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
     </section>
   </>
  )
}

export default Loggout