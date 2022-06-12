import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import { useState } from 'react';
import Router, { useRouter } from 'next/router';

const Layout = ({ children }) => {
    const location = useRouter().asPath
    const [loading, setLoading] = useState(false);
        Router.events.on('routeChangeStart', () => {
          setLoading(true);
          window.scrollTo(0, 0)
        })
        Router.events.on('routeChangeComplete', () => {
        setLoading(false);
    });
  return (
    location != '/dang-nhap' && location != '/dang-ky' ? 
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