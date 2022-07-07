import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import img from "../../../assets/home/image 6.png";
import { useSelector } from "react-redux";
import { getVoucher } from "../../../api/Voucher";
import nFormatter from "../../../utils/convertToK";
import ConvertDate from "../../../utils/convertDate";
const Voucher = () => {
  const user = useSelector((state) => state.user);
  const [listVoucher, setListVoucher] = useState([]);
  useEffect(() => {
    getVoucher(user.currentUser?.username).then((res) => {
      console.log("res:", res);
      setListVoucher(res.data);
    });
  }, []);
  return (
    <>
      <div className={s.title}>
        <h3 className={s.tde}>
          <span>Voucher</span>
        </h3>
      </div>
      <div className={s.container}>
        {listVoucher?.voucher?.map((item, index) => {
          return (
            <div className={s.box_voucher} key={index}>
              <div className={s.left_voucher}>
                <img src={img} alt="" />
              </div>
              <div className={s.right_voucher}>
                <p className={s.name_voucher}>
                  Giảm {nFormatter(item.salePrice, 0)}
                </p>
                <p className={s.hsd}>HSD: {ConvertDate(item.expireDay)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Voucher;
