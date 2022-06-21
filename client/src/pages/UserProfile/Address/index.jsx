import { Trash } from "phosphor-react";
import React from "react";
import s from "./styles.module.scss";
import { Plus } from "phosphor-react";
const Address = () => {
  const data = [
    {
      name: "NGUYỄN DƯƠNG ANH HUY",
      address:
        "Đường số 3 P.216 Chưng cư An Hòa 1 Trần Trọng Cung Quận 7 TPHCM, Phường Tân Thuận Đông, Quận 7, Hồ Chí Minh",
      phone: "0348098023",
    },
    {
      name: "NGUYỄN DƯƠNG ANH HUY",
      address:
        "Đường số 3 P.216 Chưng cư An Hòa 1 Trần Trọng Cung Quận 7 TPHCM, Phường Tân Thuận Đông, Quận 7, Hồ Chí Minh",
      phone: "0348098023",
    },
    {
      name: "NGUYỄN DƯƠNG ANH HUY",
      address:
        "Đường số 3 P.216 Chưng cư An Hòa 1 Trần Trọng Cung Quận 7 TPHCM, Phường Tân Thuận Đông, Quận 7, Hồ Chí Minh",
      phone: "0348098023",
    },
  ];
  return (
    <div className={s.container}>
      <p className={s.title}>Address</p>
      {data.map((item, index) => {
        return (
          <div className={s.box_address}>
            <div className={s.address_left}>
              <p className={s.name_user}>
                {item.name}
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
                  </svg>
                  <span>Defalt address</span>
                </span>
              </p>
              <p className={s.address_user}>
                <span className={s.opa}>Địa chỉ:</span> {item.address}
              </p>
              <p className={s.phone_user}>
                <span className={s.opa}>Điện thoại:</span> {item.phone}
              </p>
            </div>
            <div className={s.address_right}>
              <p className={s.text_edit}>Edit</p>
              <Trash size={20} />
            </div>
          </div>
        );
      })}
      <button className={s.add_address}>
        <Plus size={25} weight="fill" /> Add address
      </button>
    </div>
  );
};

export default Address;
