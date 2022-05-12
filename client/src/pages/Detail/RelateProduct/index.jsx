import React from "react";
import styles from "./styles.module.scss";
import relate1 from "../../../assets/detail/relate1.png";
import relate2 from "../../../assets/detail/relate2.png";
import relate3 from "../../../assets/detail/relate3.png";
import relate4 from "../../../assets/detail/relate4.png";
export const RelateProduct = () => {
  const fakeDataRelate = [
    {
      src: relate1,
      name: "Singo Maple",
      discount: "Rp 1.500.000",
      price: "Rp 1.264.000",
      voucher: "20",
    },
    {
      src: relate2,
      name: "Sikka (Ebony & Maple)",
      price: "Rp 1.264.000",
      new: true,
    },
    {
      src: relate3,
      name: "Sunda",
      price: "Rp 1.170.000",
    },
    {
      src: relate4,
      name: "Singo Maple",
      discount: "Rp 1.280.000",
      price: "Rp 960.000",
      voucher: "25",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.relate}>
        <p className={styles.relate__title}>Relate Products</p>
        <hr className={styles.line} />
        <div className={styles.relate__frame__product}>
          {fakeDataRelate.map((item, id) => {
            return (
              <div className={styles.relate__frame__product__one} key={id}>
                {(item.voucher || item.new) && (
                  <div
                    className={styles.voucher}
                    style={{
                      background: `${item.voucher ? "#D84727" : "#01522D"}`,
                    }}
                  >
                    {item.voucher ? `${item.voucher}% OFF` : "NEW"}
                  </div>
                )}
                <div className={styles.relate__frame__product__one__content}>
                  <img
                    src={item.src}
                    alt={item.name}
                    className={
                      styles.relate__frame__product__one__content__image
                    }
                  />
                  <p
                    className={
                      styles.relate__frame__product__one__content__name
                    }
                  >
                    {item.name}
                  </p>
                  {item.discount ? (
                    <p
                      className={
                        styles.relate__frame__product__one__content__discount
                      }
                    >
                      {item.discount}
                      <span
                        className={
                          styles.relate__frame__product__one__content__discount__line
                        }
                      ></span>
                    </p>
                  ) : (
                    ""
                  )}

                  <p
                    className={
                      styles.relate__frame__product__one__content__price
                    }
                  >
                    {item.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
