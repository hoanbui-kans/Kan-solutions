import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import { useState } from 'react';
import Router from 'next/router';

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(false);
        Router.events.on('routeChangeStart', () => {
        setLoading(true);
        })
        Router.events.on('routeChangeComplete', () => {
        setLoading(false);
    });
  return (
    <>
    <Header/>
        {
            loading ? 
            <Loading /> : <main>{children}</main>
        }
    <Footer />
    </>
  )
}

export default Layout