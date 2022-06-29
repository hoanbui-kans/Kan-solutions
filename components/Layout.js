import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import { useState } from 'react';
import Router, { useRouter } from 'next/router';

const Layout = ({ children }) => {
    const router = useRouter();
    const pathname = router.pathname;
    
    const [loading, setLoading] = useState(false);
        Router.events.on('routeChangeStart', () => {
          setLoading(true);
          window.scrollTo(0, 0)
        })
        Router.events.on('routeChangeComplete', () => {
        setLoading(false);
    });
  return (
    pathname != '/dang-nhap' && pathname != '/dang-ky' && pathname != '/quan-ly/dang-xuat' && !pathname.includes('/giao-dien/xem-giao-dien/')? 
      <>
        <Header />
          {
              loading ? 
              <Loading /> : <main>{children}</main>
          }
        <Footer />
      </>
    :  <main>{children}</main>
  )
}

export default Layout