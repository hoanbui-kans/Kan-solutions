import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import Router, { useRouter } from 'next/router';
import { useOneTapSignin } from '../components/useOneTapSignin';
import { CompanySchema } from '../pages/api/CompanySchema';
import { useSession } from "next-auth/react"
import Head from 'next/head';
import Script from 'next/script'
import HTMLReactParser from 'html-react-parser';

const site_url = process.env.NEXT_PUBLIC_SITE_URL;

const Layout = ({ children }) => {
    const router = useRouter();
    const pathname = router.pathname;
    const hreflangURI = site_url + pathname;
    const [loading, setLoading] = useState(false);
        Router.events.on('routeChangeStart', () => {
          setLoading(true);
          window.scrollTo(0, 0)
        })
        Router.events.on('routeChangeComplete', () => {
        setLoading(false);
    });

    const { status } = useSession();
    const isSignedIn = status === 'authenticated';
    const { parentContainerId } =  {};
    const [isLoading, setIsLoading] = useState(false);

    const Component = () => {
      const { isLoading } = useOneTapSignin({
        redirect: false,
        parentContainerId: 'googleAuthenticator',
      });
      return (
        <div id="googleAuthenticator" style={{ position: 'fixed', top: '100px', right: '10px', zIndex: 999 }} />
      );
    };

    useEffect(() => {
        if (!isLoading && !isSignedIn) {
          const { google } = window;
          if (google) {
            google.accounts.id.initialize({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
              callback: async (response) => {
                setIsLoading(true);
    
                // Here we call our Provider with the token provided by google
                await signIn('googleonetap', {
                  credential: response.credential,
                  redirect: true,
                  ...opt,
                });
                setIsLoading(false);
              },
              prompt_parent_id: parentContainerId,
              style:
                'position: absolute; top: 100px; right: 30px;width: 0; height: 0; z-index: 1001;',
            });
    
            // Here we just console.log some error situations and reason why the google one tap
            // is not displayed. You may want to handle it depending on yuor application
            google.accounts.id.prompt((notification) => {
              if (notification.isNotDisplayed()) {
                console.log(notification.getNotDisplayedReason());
              } else if (notification.isSkippedMoment()) {
                console.log(notification.getSkippedReason());
              } else if (notification.isDismissedMoment()) {
                console.log(notification.getDismissedReason());
              }
            });
          }
        }
      }, [isLoading, isSignedIn, parentContainerId]);
  return (
    <>
    <Head>
      <meta name="google-site-verification" content="rrhzRHk7SR7nSIFPU8TAfwRLuGUDedgPiC0nccSlKgA" />
      <script type="application/ld+json">{HTMLReactParser(CompanySchema)}</script>
      <link rel="alternate" href={hreflangURI} hrefLang="vi-vn" />
    </Head>
    <Component />
    {
      pathname != '/dang-nhap' && pathname != '/dang-ky' && pathname != '/quan-ly/dang-xuat' && !pathname.includes('/giao-dien/xem-giao-dien/')? 
      <>
        <Header />
          {
              loading ? 
              <Loading /> :
               <main>{children}</main>
          }
        <Footer />
      </>
    :  <main>{children}</main>
    }
    <Script id="gsi" src="https://accounts.google.com/gsi/client" strategy="afterInteractive"/>
    <Script id="googletagmanager" async src="https://www.googletagmanager.com/gtag/js?id=G-DKCRMST66D" strategy="afterInteractive"/>
    <Script id="gtag" strategy="afterInteractive">{
      HTMLReactParser(`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DKCRMST66D');`)
    }</Script>
    <Script id="gtagUri" async src="https://www.googletagmanager.com/gtag/js?id=UA-233414917-1" strategy="afterInteractive"/>
    <Script id="gtagTwo" strategy="afterInteractive">{
      HTMLReactParser(`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-233414917-1');`)
    }</Script>
    <Script id="Tawk_API" type="text/javascript" strategy="afterInteractive">
      {HTMLReactParser(`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/62bebcf2b0d10b6f3e7a491b/1g6sh45mq';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();`)}
    </Script>
    </>
  )
}

export default Layout