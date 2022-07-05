import React from "react";
import s from "./styles.module.scss";

const Voucher = () => {
  const fakeDate = [
    {
      id: "1",
    },
    {
      id: "1",
    },
    {
      id: "1",
    },
    {
      id: "1",
    },
    {
      id: "1",
    },
    {
      id: "1",
    },
    {
      id: "1",
    },
  ];
  return (
    <div className={s.container}>
      {fakeDate.map((item, index) => {
        return (
          <div className={s.box_voucher}>
            <div className={s.left_voucher}>
              <img
                src="https://vcdn.tikicdn.com/cache/128x128/ts/seller/c2/61/91/6c9f5ffdc717a12ddbc00ba810f640af.jpg"
                alt=""
              />
            </div>
            <div className={s.right_voucher}>
              <p className={s.name_voucher}>Giảm 20K</p>
              <p className={s.hsd}>HSD: 30/09/2022</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Voucher;
