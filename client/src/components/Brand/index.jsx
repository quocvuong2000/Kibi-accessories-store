import React from "react";
import styles from "./styles.module.scss";
import brand1 from "../../assets/detail/brand/brand1.png";
import brand2 from "../../assets/detail/brand/brand2.png";
import brand3 from "../../assets/detail/brand/brand3.png";
import brand4 from "../../assets/detail/brand/brand4.png";
import brand5 from "../../assets/detail/brand/brand5.png";
import brand6 from "../../assets/detail/brand/brand6.png";
import brand7 from "../../assets/detail/brand/brand7.png";
import brand8 from "../../assets/detail/brand/brand8.png";
import brand9 from "../../assets/detail/brand/brand9.png";
import brand10 from "../../assets/detail/brand/brand10.png";

export const Brand = () => {
  const dataBrand = [
    {
      src: brand1,
      name: "bni",
    },
    {
      src: brand2,
      name: "permatabank",
    },
    {
      src: brand3,
      name: "mastercard",
    },
    {
      src: brand4,
      name: "danamon",
    },
    {
      src: brand5,
      name: "visa",
    },
    {
      src: brand6,
      name: "mandiri",
    },
    {
      src: brand7,
      name: "kredivo",
    },
    {
      src: brand8,
      name: "uob",
    },
    {
      src: brand9,
      name: "gopay",
    },
    {
      src: brand10,
      name: "standard chartered",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        {dataBrand.map((item, id) => {
          return (
            <React.Fragment key={id}>
              <div className={styles.brand__img}>
                <img src={item.src} alt={item.name} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
