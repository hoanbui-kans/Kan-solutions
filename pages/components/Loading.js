import React from 'react'
import { Loader } from 'rsuite'
import styles from '../../styles/header.module.css'

const Loading = () => {
  return (
    <div className={styles.x_loading_container}>
      <Loader center content="Đang tải..." vertical />
    </div>
  )
}

export default Loading