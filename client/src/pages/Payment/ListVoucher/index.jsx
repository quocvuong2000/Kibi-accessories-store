import { Empty, message, Radio } from "antd";
import ConvertDate from "../../../utils/convertDate";
import nFormatter from "../../../utils/convertToK";
import s from "./styles.module.scss";
import voucher from "../../../assets/voucher.png";
import numberWithCommas from "../../../utils/numberWithCommas";
const ListVoucher = (props) => {
  const onChange = (id, salePrice, nameVoucher) => {
    props.setIdVoucher(id);
    props.setSalePrice(salePrice);
    props.setNameVoucher(nameVoucher);
  };
  return (
    <div className={s.container}>
      {props.listVoucher.voucher?.length > 0 ? (
        <div className={s.box_list_voucher}>
          <Radio.Group
            onChange={(e) => {
              if (parseFloat(props.totalPrice) >= parseFloat(e.target.total)) {
                onChange(
                  e.target.value,
                  e.target.salePrice,
                  e.target.nameVoucher
                );
              } else {
                message.error(
                  `Voucher chỉ áp dụng cho đơn hàng lớn hơn ${numberWithCommas(
                    e.target.total
                  )} VND`
                );
              }
            }}
          >
            {props.listVoucher?.voucher?.map((item, index) => {
              return (
                <Radio
                  value={item._id}
                  salePrice={item.salePrice}
                  nameVoucher={item.voucherName}
                  total={item.totalPrice || 0}
                  key={index}
                  disabled={props.totalPrice < item.totalPrice}
                >
                  <div className={s.box_voucher}>
                    <div className={s.voucher}>
                      <img src={voucher} alt="" />
                    </div>
                    <p className={s.sale}>
                      Giảm {nFormatter(item.salePrice, 0)}
                    </p>
                    <p className={s.expire}>{ConvertDate(item.expireDay)}</p>
                    <p className={s.sale2}>{nFormatter(item.salePrice, 0)}</p>
                    {parseFloat(props.totalPrice) <
                      parseFloat(item.totalPrice) && (
                      <p className={s.error_voucher}>
                        Voucher chỉ áp dụng cho đơn hàng lớn hơn &nbsp;
                        {numberWithCommas(item.totalPrice)} VND
                      </p>
                    )}
                  </div>
                </Radio>
              );
            })}
          </Radio.Group>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default ListVoucher;
