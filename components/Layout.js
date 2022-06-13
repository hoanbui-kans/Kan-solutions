import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import { useState } from 'react';
import Router from 'next/router';

const Layout = ({ children }) => {
    const Component = children.type.name;
    const [loading, setLoading] = useState(false);
        Router.events.on('routeChangeStart', () => {
          setLoading(true);
          window.scrollTo(0, 0)
        })
        Router.events.on('routeChangeComplete', () => {
        setLoading(false);
    });
  return (
    Component != 'Login' && Component != 'Register' ? 
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