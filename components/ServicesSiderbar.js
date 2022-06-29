import React from 'react'
import { listServices } from '../pages/api/services'
import styles from '../styles/page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import FormTuVan from './FormTuVan'

const ServicesSiderbar = ({title}) => {
  return (
    <>
    <h3 className={styles.x_service_list_title}> Danh sách dịch vụ </h3>
      {
          listServices.map((val, index) => {
              return(
                  <div className={styles.x_dropbox} key={index}>
                      <Link href={val.link} >
                          <a className={styles.x_iconLink}>
                          <span className={styles.x_iconImage}><Image alt='layout' src={val.image} width={24} height={24} /> </span> 
                          {val.name}</a>
                      </Link>
                  </div>
              )
          })
      }
      <h3 className={styles.x_service_list_title}> Đăng ký tư vấn </h3>
      <FormTuVan title={title}/>
    </>
  )
}

export default ServicesSiderbar