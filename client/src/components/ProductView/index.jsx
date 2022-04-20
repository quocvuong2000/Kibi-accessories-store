import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import imgMain from '../../assets/detail/watch_main.png'
import pre2 from '../../assets/detail/preview_prod_2.png'
import pre3 from '../../assets/detail/preview_prod_3.png'
import pre4 from '../../assets/detail/preview_prod_4.png'
import model1 from '../../assets/detail/model1.png'
import model2 from '../../assets/detail/model2.png'
import { ShoppingCartSimple } from 'phosphor-react'

const listImgPreview = [
  {
    src: imgMain
  },
  {
    src: pre2
  },
  {
    src: pre3
  },
  {
    src: pre4
  }
]



const ProductView = () => {
  const [src, setSrc] = useState(imgMain);
  const [srcMain, setSrcMain] = useState(imgMain);
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSrcMain(src);
    setShow(true);
  }, [src])

  const handleClickSrcImagePreview = (e) => {
    setSrc(e.target.src);
    setShow(true);
  }

  const handleAnimation = (e) => {
    setShow(false);
  }


  const upQty = () => {
    setQty(qty + 1);
    console.log(qty);
    console.log('up');
  }

  const downQty = () => {
    if (qty === 1) {
      return
    } else {
      setQty(qty - 1);
    }

  }


  return (
    <div className={`${styles.container} flex`}>
      <div className={`${styles.frame_product} flex`}>
        <div className={styles.preview_product}>
          <div className={styles.frame_img_preview}>
            {listImgPreview.map((item, id) => {
              return (
                <div className={styles.img_preview}>
                  <img src={item.src} alt="" onClick={handleClickSrcImagePreview} />
                </div>
              )
            })}
            <div className={`${styles.img_main} ${show === true ? styles.show : ''}`} onAnimationEnd={handleAnimation}>
              <img src={srcMain} alt="watch" />
              {/* <img src={srcMain} alt="watch" /> */}
            </div>
          </div>

        </div>

        <div className={styles.frame_info_product}>
          <div className={styles.info_product}>
            <p className={styles.title}>
              WAY KAMBAS MINI EBONY
            </p>
            <p className={styles.price_before}>
              Rp 1.280.000
              <span className={styles.line}></span>
            </p>
            <p className={styles.price_after}>
              Rp 1.024.000
            </p>
            <p className={styles.model}>
              <p className={styles.title_modle}>Choose Model</p>
              <div className={styles.frame_model}>
                <div className={styles.item_model}>
                  <img src={model1} alt="" className={styles.bo} />
                </div>
                <div className={styles.item_model}>
                  <img src={model2} alt="" className={styles.bo} />
                </div>
              </div>
            </p>
            <div className={styles.function}>
              <div className={styles.qty} >
                <div className={styles.sub} onClick={downQty}>
                  <p className={styles.icon_sub}></p>
                </div>
                <p className={styles.count}>{qty}</p>
                <div className={styles.add} onClick={upQty}>
                  <p className={styles.icon_add}></p>
                  <p className={styles.icon_add2}></p>
                </div>
              </div>

              <button className={styles.add_to_cart}>
                <ShoppingCartSimple size={20} /> Add to cart
              </button>

              <button className={styles.buy_now}>
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;