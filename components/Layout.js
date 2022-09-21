import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'
import Router, { useRouter } from 'next/router';
import { useOneTapSignin } from '../components/useOneTapSignin';
import { useSession } from "next-auth/react"
import Head from 'next/head';
import Script from 'next/script'
import HTMLReactParser from 'html-react-parser';
import SchemaSite from '../components/Schema';

const site_url = process.env.NEXT_PUBLIC_SITE_URL;

const Layout = ({ children }) => {
    const router = useRouter();
    const pathname = router.pathname;

    const [hreflangURI, sethreflangURI] = useState('');
    const [loading, setLoading] = useState(false);

    Router.events.on('routeChangeStart', () => {
      setLoading(true);
      window.scrollTo(0, 0)
    })

    Router.events.on('routeChangeComplete', () => {
        setLoading(false);
    });

    const { status } = useSession();
    const { data: session } = useSession();
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
      sethreflangURI(`${site_url}${pathname}`);
    },[router.pathname])

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
    
    let off = false;

    useEffect(() => {
      if(!off){
        console.log('%cKAN SOLUTION', 'color: #2d88e2; font-size: 34px; line-height: 38px; font-weight: 900;');
        console.log('https://kansite.com.vn/');
      }
      off = true;
    }, [off])

    const SearchBoxSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": site_url,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": site_url + "/tim-kiem?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }

    return (
        <>
        <Head>
          <meta name="google-site-verification" content="rrhzRHk7SR7nSIFPU8TAfwRLuGUDedgPiC0nccSlKgA" />
          <link rel="alternate" href={hreflangURI} hrefLang="vi-vn" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SearchBoxSchema)}} />
        </Head>
        <SchemaSite />
        <Script id="Kansite_Analytics" async src="https://www.googletagmanager.com/gtag/js?id=G-Y0ZHL4GN97"></Script>
        <Script id="analytic-config">
          {
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Y0ZHL4GN97');`
          }
        </Script>
        <Script id="gtag-config">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PQ9SVQ4');`}</Script>
        {
         HTMLReactParser(`<!-- Google Tag Manager (noscript) -->
         <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQ9SVQ4"
         height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
         <!-- End Google Tag Manager (noscript) -->`)
        }
        <Component />
        <Header />
          {
              loading ? 
              <Loading /> :
              <main>
                { children }
              </main>
          }
        <Footer />
        <Script id="gsi" src="https://accounts.google.com/gsi/client" strategy="afterInteractive"/>
        { !session ?
            <Script id="Tawk_API" type="text/javascript" strategy="afterInteractive">
            {
              `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='https://embed.tawk.to/62bebcf2b0d10b6f3e7a491b/1g6sh45mq';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();`
            }
          </Script> : ''
        }
    </>
  )
}

export default Layout