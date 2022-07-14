import { Empty, Radio } from "antd";
import ConvertDate from "../../../utils/convertDate";
import nFormatter from "../../../utils/convertToK";
import s from "./styles.module.scss";
import voucher from "../../../assets/voucher.png";
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
              onChange(
                e.target.value,
                e.target.salePrice,
                e.target.nameVoucher
              );
            }}
          >
            {props.listVoucher?.voucher?.map((item, index) => {
              return (
                <Radio
                  value={item._id}
                  salePrice={item.salePrice}
                  nameVoucher={item.voucherName}
                  key={index}
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
