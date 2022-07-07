import React from "react";
import s from "./styles.module.scss";
import img from "../../../assets/home/image 6.png";
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
    <>
      <div className={s.title}>
        <h3 className={s.tde}>
          <span>Voucher</span>
        </h3>
      </div>
      <div className={s.container}>
        {fakeDate.map((item, index) => {
          return (
            <div className={s.box_voucher}>
              <div className={s.left_voucher}>
                <img src={img} alt="" />
              </div>
              <div className={s.right_voucher}>
                <p className={s.name_voucher}>Giảm 20K</p>
                <p className={s.hsd}>HSD: 30/09/2022</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Voucher;
