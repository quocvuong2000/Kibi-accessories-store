import { Col, message, Modal, Radio, Row, Space } from "antd";
import { House } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-cards";
import { createAddress } from "../../../api/Address";
import addressImg from "../../../assets/checkout/Wavy Buddies - Address.png";
import UpdateAddress from "../../UserProfile/UpdateAddress";
import AddressItem from "./AdderssItem/AddressItem";
import classes from "./styles.module.scss";

const SelectAddress = ({
  address,
  hanldeSelectAddress,
  reload,
  setReload,
  branchList,
  handleGetBranchId,
  cart,
}) => {
  const [value, setValue] = useState(
    address.length !== 0 ? address.find((el) => el.isDefault === true)?._id : {}
  );

  useEffect(() => {
    if (address.length !== 0) {
      setValue(address.find((el) => el.isDefault === true)?._id);
    }
  }, [address]);

  const [valueBranch, setValueBranch] = useState(
    branchList?.branches?.length !== 0
      ? branchList?.branches?.find((el) => el.isDefault === true)?._id
      : ""
  );

  const [branchName, setBranchName] = useState(
    branchList?.branches?.length !== 0
      ? branchList?.branches?.find((el) => el.isDefault === true)?.address
      : ""
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onChangeBranch = (e) => {
    setValueBranch(e.target.value);
    setBranchName(e.target.name);
  };

  const handleCreateAddress = (
    username,
    reciname,
    reciphone,
    address,
    ward,
    district,
    city
  ) => {
    createAddress(
      username,
      reciname,
      reciphone,
      address,
      ward,
      district,
      city
    ).then((res) => {
      if (res) {
        setReload(!reload);
        message.success("Create success");
      }
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    let temp = [];
    cart._products?.forEach((item) => {
      temp = temp.concat(
        ...item.branches.map((branch) => {
          if (branch.quantity >= item.quantity) {
            return branch;
          }
        })
      );
    });
    setValueBranch(temp.find((el) => el !== undefined)?.branchId);
    setBranchName(temp.find((el) => el !== undefined)?.branchName);
  }, [cart._products]);

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={classes.wrapInformation}
      >
        <UpdateAddress handle={handleCreateAddress} />
      </Modal>
      {branchList?.branches?.length !== 0 && (
        <Radio.Group
          onChange={onChangeBranch}
          value={
            valueBranch !== "" && valueBranch !== undefined
              ? valueBranch
              : cart._products?.find(
                  (el) =>
                    el.branches?.find((value) => value.quantity >= el.quantity)
                      ?.branchId
                )
          }
          className={classes.branchList}
        >
          {branchList?.branches?.map((item, index) => {
            let temp = [];
            let temp2 = [];

            cart._products?.some((el) => {
              el.branches?.forEach((value) => {
                if (value.quantity < el.quantity) {
                  temp.push(value.branchId);
                  if (valueBranch === value.branchId) {
                    setValueBranch("");
                    setBranchName("");
                  }
                } else if (value.branchId === item._id) {
                  temp2.push(value.branchId);
                }
              });
            });

            return (
              <Radio
                value={
                  temp.includes(item?._id) || !temp2.includes(item?._id)
                    ? "null"
                    : item?._id
                }
                key={index}
                disabled={
                  temp.includes(item?._id) || !temp2.includes(item?._id)
                    ? true
                    : false
                }
                name={item?.address}
              >
                <div className={classes.address_branch}>
                  <House size={40} weight="fill" color="#d84727" />
                  <p>
                    {item.address}{" "}
                    {temp.includes(item?._id) ? "(Hết hàng)" : ""}
                  </p>
                </div>
              </Radio>
            );
          })}
        </Radio.Group>
      )}
      <Row className={classes.addressSelectContainer}>
        <Col span={24} lg={12} md={24}>
          {address.length === 0 ? (
            <div className={classes.continue} onClick={() => showModal()}>
              <button>Create address</button>
            </div>
          ) : (
            <>
              <Radio.Group
                onChange={onChange}
                value={value}
                className={classes.addressList}
              >
                <Space direction="vertical">
                  {address.map((item, index) => {
                    return (
                      <Radio
                        value={item?._id}
                        ward={item?.ward}
                        district={item?.district}
                        city={item?.city}
                        key={index}
                      >
                        <AddressItem item={item} key={index} />
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>

              <div
                className={classes.continue}
                onClick={() => {
                  if (
                    valueBranch &&
                    branchName &&
                    valueBranch !== "" &&
                    branchName !== ""
                  ) {
                    hanldeSelectAddress(value);
                    handleGetBranchId(valueBranch, branchName);
                  } else {
                    message.error(
                      "Currently the shop is out of stock at all branches"
                    );
                  }
                }}
              >
                <button>Continue payment</button>
              </div>
            </>
          )}
        </Col>
        <Col
          span={24}
          lg={12}
          md={24}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className={classes.right}
        >
          <div className={classes.image}>
            <img src={addressImg} alt="" />
          </div>
          <div className={classes.title}>Where we can get you?</div>
          <span>Please select your address to continue or</span>
          <div className={classes.btn} onClick={() => showModal()}>
            <button>Add new address</button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SelectAddress;
