import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import Router, { useRouter } from 'next/router';
import { useOneTapSignin } from '../components/useOneTapSignin';
import Script from 'next/script'
import Head from 'next/head';
import CompanySchema from './CompanySchema';
import { useSession } from "next-auth/react"


const Layout = ({ children }) => {
    const router = useRouter();
    const pathname = router.pathname;
    const { data: session } = useSession();
    
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
    pathname != '/dang-nhap' && pathname != '/dang-ky' && pathname != '/quan-ly/dang-xuat' && !pathname.includes('/giao-dien/xem-giao-dien/')? 
      <>
        <Component />
        <Head>
            <meta name="google-site-verification" content="rrhzRHk7SR7nSIFPU8TAfwRLuGUDedgPiC0nccSlKgA" />
        </Head>
        <Script
              src="https://accounts.google.com/gsi/client"
              strategy="afterInteractive"
            />
        <CompanySchema />
        <Header />
          {
              loading ? 
              <Loading /> :
               <main>{children}</main>
          }
        <Footer />
      </>
    :  <main>{children}</main>
  )
}

export default Layout