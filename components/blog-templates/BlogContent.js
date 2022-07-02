import React from 'react'
import { Row, Col, Button } from 'rsuite'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/blog.module.css'
import ArowBackIcon from '@rsuite/icons/ArowBack';

const TermList = ({data}) => {
  if(data == undefined ) return '';
  return(
    <ul className={styles.x_blog_terms_list}>
      {
        data.map((val) =>{
          return(
            <li key={val.term_id}>
              <Link href={`danh-muc/${val.slug}`}> 
                <a className={styles.x_category_link}>
                  {val.name}
                </a>
              </Link>
            </li>
          )
        })
      } 
    </ul>
  )

}
export const BlogStyleOne = ({data}) => {
  return (
    <div className={styles.x_blog_one_section}>
      <Row>
        <Col xs={24} md={12}>
          {
            data.thumbnail ?  
            <div className={styles.x_blog_one_thumbnail}>
                <Image alt='layout' src={ data.thumbnail[0] } width={600} height={360} layout={'fill'}/>
            </div> : ''
          }
         
        </Col>
        <Col xs={24} md={12}>
          <div className={styles.x_blog_one_content}>
            <TermList data={data.terms} />
            <Link href={'/bai-viet/' + data.post_name}>
              <a>
                <h3 className={styles.x_blog_one_title}>{data.post_title}</h3>
              </a>
            </Link>
            <p className={styles.x_blog_one_description}>{data.post_excerpt}</p>
            <Link href={'/bai-viet/' + data.post_name}>
              <a><Button className={styles.x_blog_one_button}>Xem thêm</Button></a>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export const BlogStyleTwo = ({data}) => {
  return (
    <div className={styles.x_blog_two_section}>
      {
        data.thumbnail ? <div className={styles.x_blog_two_thumbnail}>
          <Image alt='layout' src={ data.thumbnail[0] } width={400} height={240} />
        </div> : ''
      }
      <div className={styles.x_blog_two_content}>
        <TermList data={data.terms} />
        <Link href={'/bai-viet/' + data.post_name}>
          <a>
            <h3 className={styles.x_blog_two_title}>{data.post_title}</h3>
          </a>
        </Link>
        <p className={styles.x_blog_two_description}>{data.post_excerpt}</p>
        <Link href={'/bai-viet/' + data.post_name}>
          <a className={styles.x_blog_two_link}>
            <span>Xem thêm</span>
            <span className={styles.x_blog_two_link_icon}>
              <ArowBackIcon width={16} height={16}/>
            </span>
          </a>
        </Link>
      </div>
  </div>
  )
}