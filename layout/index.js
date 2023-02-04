import React from 'react'
import Header from '../template-parts/Header'
import Footer from '../template-parts/Footer'
import NextNProgress from 'nextjs-progressbar';
import { useRouter } from 'next/router';
import SidebarNav from '../components/dashboard-components/SidebarNav';
import style from '../styles/dashboard.module.css';

const Layout = ({ children }) => {
  const { asPath } = useRouter();
  const ArrayPath = asPath.split('/');
  const AdminPath = ArrayPath.find((value) => value == 'admin');
  if(AdminPath){
    return (
     <>
        <div className={style.x_dashboard_container}>
            <div className={style.x_dashboard_sidenav}>
              <SidebarNav />
            </div>
            <div className={style.x_dashboard_content}>
              { children }
            </div>
        </div>
      </>
    )
  } else {
    return (
      <>
          <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true}/>
          <Header />
            {
                <main>
                  {children}
                </main>
            }
          <Footer />
      </>
    )
  }
}

export default Layout