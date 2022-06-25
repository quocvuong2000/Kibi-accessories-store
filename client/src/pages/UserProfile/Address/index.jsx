import { message, Modal } from "antd";
import { Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../../../api/Address";
import EditAddress from "../EditAddress";
import UpdateAddress from "../UpdateAddress";
import s from "./styles.module.scss";
const Address = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listAddress, setListAddress] = useState([]);
  const user = useSelector((state) => state.user);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [itemedit, setItemEdit] = useState([]);

  useEffect(() => {
    getAddress(user.currentUser.username).then((res) => {
      if (res) {
        setListAddress(res);
      }
    });
    // console.log("a");
  }, [reload]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteAddressFunction = (id, itemid) => {
    deleteAddress(id, itemid).then((res) => {
      if (res) {
        message.success("Delete success");
        setReload(!reload);
      }
    });
  };

  const handleCreateAddress = (username, reciname, reciphone, address) => {
    createAddress(username, reciname, reciphone, address).then((res) => {
      if (res) {
        setReload(!reload);
        message.success("Create success");
      }
    });
  };

  const handleEditAddress = (id, itemid, address) => {
    updateAddress(id, itemid, address).then((res) => {
      if (res) {
        setReload(!reload);
        message.success("Update success");
      }
    });
  };

  return (
    <>
      <div className={s.container}>
        <p className={s.title}>Address</p>
        {listAddress[0]?.addressList?.map((item, index) => {
          return (
            <div className={s.box_address} key={index}>
              <div className={s.address_left}>
                <p className={s.name_user}>
                  {item.recipientName}
                  {item.isDefault && item.isDefault === true && (
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
                  )}
                </p>
                <p className={s.address_user}>
                  <span className={s.opa}>Địa chỉ:</span> {item.address}
                </p>
                <p className={s.phone_user}>
                  <span className={s.opa}>Điện thoại:</span>{" "}
                  {item.recipientPhone}
                </p>
              </div>
              <div className={s.address_right}>
                <p
                  className={s.text_edit}
                  onClick={() => {
                    setItemEdit(item);
                    setEdit(true);
                    showModal();
                  }}
                >
                  Edit
                </p>
                <Trash
                  size={20}
                  onClick={() => {
                    deleteAddressFunction(listAddress[0]._id, item._id);
                  }}
                />
              </div>
            </div>
          );
        })}
        <button
          className={s.add_address}
          onClick={() => {
            setEdit(false);
            showModal();
          }}
        >
          <Plus size={25} weight="fill" /> Add address
        </button>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={s.wrapInformation}
      >
        {edit === true ? (
          <EditAddress
            address={itemedit}
            handle={handleEditAddress}
            addressId={listAddress[0]._id}
          />
        ) : (
          <UpdateAddress handle={handleCreateAddress} />
        )}
      </Modal>
    </>
  );
};

export default Address;
