import React from 'react'
import ProductView from '../../components/ProductView';
import AllInfo from '../../components/AllInfo';
import styles from './styles.module.scss'

const Detail = () => {
  return (
    <div className={styles.backgroundContainer}>
      <ProductView />
      <AllInfo/>
    </div>
  )
}

export default Detail;