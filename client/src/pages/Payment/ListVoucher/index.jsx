import { Empty, Radio } from "antd";
import ConvertDate from "../../../utils/convertDate";
import nFormatter from "../../../utils/convertToK";
import s from "./styles.module.scss";

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
            {props.listVoucher.voucher.map((item, index) => {
              return (
                <Radio
                  value={item._id}
                  salePrice={item.salePrice}
                  nameVoucher={item.voucherName}
                >
                  <div className={s.box_voucher} key={index}>
                    <div className={s.left_voucher}>
                      {/* <img src={img} alt="" /> */}
                    </div>
                    <div className={s.right_voucher}>
                      <p className={s.name_voucher}>
                        Giảm {nFormatter(item.salePrice, 0)}
                      </p>
                      <p className={s.hsd}>
                        HSD: {ConvertDate(item.expireDay)}
                      </p>
                    </div>
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
