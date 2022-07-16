import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import { useSelector } from "react-redux";
import { getVoucher } from "../../../api/Voucher";
import nFormatter from "../../../utils/convertToK";
import ConvertDate from "../../../utils/convertDate";
import AppLoader from "../../../components/AppLoader";
import EmptyPage from "../../../components/Empty";
import voucher from "../../../assets/voucher.png";

const Voucher = () => {
  const user = useSelector((state) => state.user);
  const [listVoucher, setListVoucher] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getVoucher(user.currentUser?.username)
      .then((res) => {
        setListVoucher(res.data);
      })
      .finally((res) => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading === true && <AppLoader />}
      <div className={s.title}>
        <h3 className={s.tde}>
          <span>Voucher</span>
        </h3>
      </div>
      {listVoucher?.voucher?.length > 0 ? (
        <div className={s.container}>
          {listVoucher?.voucher?.map((item, index) => {
            return (
              <div className={s.box_voucher} key={index}>
                <div className={s.voucher}>
                  <img src={voucher} alt="" />
                </div>
                <p className={s.sale}>Giảm {nFormatter(item.salePrice, 0)}</p>
                <p className={s.expire}>{ConvertDate(item.expireDay)}</p>
                <p className={s.sale2}>{nFormatter(item.salePrice, 0)}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyPage />
      )}
    </>
  );
};
export default Voucher;
