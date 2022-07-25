import { message, Modal, Radio } from "antd";
import {
  ArrowFatLinesRight,
  CreditCard,
  Tag,
  Truck,
  Wallet,
} from "phosphor-react";
import PropsType from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {
  getInfoService,
  getLeadTime,
  getShippingCost,
} from "../../../api/Shipping";
import { deletedVoucher, getVoucher } from "../../../api/Voucher";
import avatarPlaceholder from "../../../assets/user_avatar.jpg";
import { deleteAllCart } from "../../../redux/cartRedux";
import { checkTypeItem } from "../../../utils/checkTypeItem";
import numberWithCommas from "../../../utils/numberWithCommas";
import { getBranchById } from "../BranchAPI";
import ListVoucher from "../ListVoucher";
import {
  doCheckoutByCard,
  doCheckoutByCod,
  doDeleteAllCart,
  doGetSignature,
  goLinkMomoPayment,
  updateOrder,
} from "../PaymentAPI";
import classes from "./styles.module.scss";

const STRIPE_PK_KEY =
  "pk_test_51K0LBnFjydqiWgwtTtGT2ONJJuo4TAWczmDWero4QwWVw7p6n93JvDHkkDe70u1XVF5cT0kCsJQC59DJmQdBGPys00B3LSLWLk";

const PaymentDetail = (props) => {
  //-----------------------------------STATE MOMO-----------------------------------
  const cart = useSelector((state) => state.cart);
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const amount = new URLSearchParams(search).get("amount");
  const extraData = new URLSearchParams(search).get("extraData");
  const messageRs = new URLSearchParams(search).get("message");
  const orderId = new URLSearchParams(search).get("orderId");
  const orderInfo = new URLSearchParams(search).get("orderInfo");
  const orderType = new URLSearchParams(search).get("orderType");
  const partnerCode = new URLSearchParams(search).get("partnerCode");
  const payType = new URLSearchParams(search).get("payType");
  const requestId = new URLSearchParams(search).get("requestId");
  const responseTime = new URLSearchParams(search).get("responseTime");
  const resultCode = new URLSearchParams(search).get("resultCode");
  const transId = new URLSearchParams(search).get("transId");
  const signature = new URLSearchParams(search).get("signature");

  // -----------------------------------END STATE MOMO-----------------------------------

  // if (
  //   (typeof props.addressSelected?.address === "undefined" ||
  //     !props.branchId) &&
  //   localStorage.getItem("isMomoPayment") === null
  // ) {
  //   window.location.href = "/checkout";
  // }
  //--------------------------STATE GHN--------------------------

  //-------------------------------------START STATE VOUCHER---------------------------------------------

  const [listVoucher, setListVoucher] = useState([]);
  const [salePrice, setSalePrice] = useState(0);
  const [idVoucher, setIdVoucher] = useState(0);
  const [nameVoucher, setNameVoucher] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    getVoucher(props.user.currentUser.username).then((res) => {
      setListVoucher(res.data);
    });
  }, [props.user.currentUser.username]);

  //-------------------------------------END STATE VOUCHER---------------------------------------------

  const [methodPayment, setMethodPayment] = useState(1);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentAddressName = props.addressSelected
    ? props.addressSelected.address
    : props.address[0]?.address;
  const currentRecipientName = props.addressSelected
    ? props.addressSelected.recipientName
    : props.address[0]?.recipientName;
  const currentRecipientPhone = props.addressSelected
    ? props.addressSelected.recipientPhone
    : props.address[0]?.recipientPhone;
  const currentWard = props.addressSelected
    ? props.addressSelected.ward
    : props.address[0]?.ward;
  const currentDistrict = props.addressSelected
    ? props.addressSelected.district
    : props.address[0]?.district;
  const [serviceId, setServiceId] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [fromWard, setFromWard] = useState(1450);
  const [from, setFrom] = useState(1450);
  const [shopId, setShopId] = useState(3064791);
  const [provinceId, setProvinceId] = useState(202);

  const [leadTime, setLeadTime] = useState(0);

  useEffect(() => {
    getBranchById(props.branchId).then((res) => {
      setFrom(res.branches.districtId);
      setShopId(res.branches.shopId);
      setProvinceId(res.branches.cityId);
      setFromWard(res.branches.wardId);
      props.handleTakeShopId(res.branches.shopId);
      props.handleTakeFrom(res.branches.districtId);
      props.handleTakeFromWard(res.branches.wardId);
      props.handleTakeProvinceId(res.branches.cityId);
    });
  }, [props, props.branchId]);

  useEffect(() => {
    getInfoService(from, currentDistrict, shopId).then((res) => {
      if (res) {
        setServiceId(res.data.data[0].service_id);
      }
    });
  }, [currentDistrict, from, shopId]);

  useEffect(() => {
    if (parseInt(props.addressSelected?.city) !== provinceId) {
      setShippingCost(35000);
      props.setShippingCost(35000);
    } else {
      if (serviceId !== 0) {
        getShippingCost(
          serviceId,
          parseInt(props.cart.totalPrice),
          null,
          currentWard,
          currentDistrict,
          from,
          1000,
          15,
          15,
          15,
          shopId
        )
          .then((res) => {
            if (res) {
              setShippingCost(res.data.data.total);
              props.setShippingCost(res.data.data.total);
            }
          })
          .finally(() => props.hanldeLoading(false));
      }
    }
  }, [
    from,
    serviceId,
    props.cart.totalPrice,
    currentWard,
    currentDistrict,
    props.addressSelected,
    props,
    provinceId,
    shopId,
  ]);

  useEffect(() => {
    if (parseInt(props.addressSelected?.city) !== props.provinceId) {
      var result = new Date(Date.now());
      result.setDate(result.getDate() + 10);
      setLeadTime(Date.parse(result));
    } else {
      if (serviceId !== null && serviceId !== 0) {
        getLeadTime(
          from,
          fromWard,
          currentDistrict,
          currentWard,
          serviceId,
          shopId
        ).then((res) => {
          setLeadTime(res.data?.data.leadtime);
        });
      }
    }
  }, [from, fromWard, currentDistrict, currentWard, serviceId, shopId]);

  useEffect(() => {
    if (token) {
      props.hanldeLoading(true);
      const data = {
        tokenId: token.id,
        amount: props.cart.numberCart,
        totalPrice:
          props.cart.totalPrice + parseInt(shippingCost) - salePrice > 0
            ? parseInt(props.cart.totalPrice) +
              parseInt(shippingCost) -
              salePrice
            : 0,
        username: props.user.currentUser.username,
        email: props.user.currentUser.email,
        address: props.address[0].address,
        recipientName: props.address[0].recipientName,
        recipientPhone: props.address[0].recipientPhone,
        shippingPrice: shippingCost,
        branchId: props.branchId,
        branchName: props.branchName,
        leadTime: leadTime,
      };
      doCheckoutByCard(data)
        .then((res) => {
          message.success("Payment success");
          props.hanldeLoading(false);
          if (idVoucher !== "" && idVoucher) {
            deletedVoucher(idVoucher).then(() => {});
          }
          props.setSendEmail(true);
          setTimeout(() => {
            doDeleteAllCart({ username: data.username });
            dispatch(deleteAllCart());
            navigate(`/confirmation/${res.newOrder._id}?sendemail=true`);
          }, 1000);
        })
        .catch(() => {
          message.error("payment fail, sthing went worng");
        });
    }
  }, [token]);

  const onChange = (e) => {
    setMethodPayment(e.target.value);
  };
  const onToken = (token) => {
    setToken(token);
  };
  const hanldeCheckoutCOD = () => {
    props.hanldeLoading(true);

    const data = {
      username: props.user.currentUser.username,
      email: props.user.currentUser.email,
      address: currentAddressName,
      recipientName: currentRecipientName,
      recipientPhone: currentRecipientPhone,
      shippingPrice: shippingCost,
      branchId: props.branchId,
      branchName: props.branchName,
      amount: props.cart.numberCart,
      totalPrice:
        props.cart.totalPrice + shippingCost - salePrice > 0
          ? props.cart.totalPrice + shippingCost - salePrice
          : 0,
      leadTime: leadTime,
    };
    doCheckoutByCod(data)
      .then((res) => {
        message.success("Payment success");

        props.hanldeLoading(false);
        // props.takeOrderDetailForConfirmation(res._id);
        if (idVoucher !== "" && idVoucher) {
          deletedVoucher(idVoucher).then(() => {});
        }
        props.setSendEmail(true);
        setTimeout(() => {
          doDeleteAllCart({ username: data.username });
          dispatch(deleteAllCart());
          navigate(`/confirmation/${res._id}?sendemail=true`);
        }, 1000);
      })
      .catch(() => {
        message.error("payment fail, sthing went worng");
      });
  };

  //---------------------------------------MOMO-----------------------------------------------
  useEffect(() => {
    props.hanldeLoading(true);
    if (
      query.has("amount") &&
      query.has("extraData") &&
      query.has("message") &&
      query.has("orderId") &&
      query.has("orderInfo") &&
      query.has("orderType") &&
      query.has("partnerCode") &&
      query.has("payType") &&
      query.has("requestId") &&
      query.has("responseTime") &&
      query.has("resultCode") &&
      query.has("transId")
    ) {
      if (resultCode === "0") {
        doGetSignature(
          amount,
          extraData,
          messageRs,
          orderId,
          orderInfo,
          orderType,
          partnerCode,
          payType,
          requestId,
          responseTime,
          resultCode,
          transId
        ).then((res) => {
          if (res.statusCode === 200) {
            if (res.data === signature) {
              const shipping = localStorage.getItem("shippingCost");
              const branchId = localStorage.getItem("branchId");
              const branchName = localStorage.getItem("branchName");
              const leadtime = localStorage.getItem("leadtime");
              localStorage.removeItem("shippingCost");
              localStorage.removeItem("branchId");
              localStorage.removeItem("branchName");
              localStorage.removeItem("leadtime");
              const totalPrice = cart.totalPrice.toString().replace(".", "");
              const datasecond = {
                amount: cart.numberCart,
                totalPrice:
                  cart.totalPrice + parseInt(shipping) - salePrice > 0
                    ? parseInt(totalPrice) + parseInt(shipping) - salePrice
                    : 0,
                username: props.user.currentUser.username,
                email: props.user.currentUser.email,
                address: props.address[0].address,
                recipientName: props.address[0].recipientName,
                recipientPhone: props.address[0].recipientPhone,
                shippingPrice: shipping,
                branchId: branchId,
                branchName: branchName,
                leadTime: leadtime,
              };
              updateOrder(datasecond).then((res) => {
                if (res.statusCode === 200) {
                  message.success("Payment success");
                  props.hanldeLoading(false);
                  doDeleteAllCart({ username: datasecond.username });
                  dispatch(deleteAllCart());
                  localStorage.removeItem("isMomoPayment");
                  navigate(
                    `/confirmation/${res.data.newOrder._id}?sendemail=true`
                  );
                }
              });
            }
          }
        });
      } else {
        message.error(messageRs);
        localStorage.removeItem("shippingCost");
        localStorage.removeItem("branchId");
        localStorage.removeItem("branchName");
      }
    }
    props.hanldeLoading(false);
  }, []);

  const handleMomo = (amount) => {
    localStorage.setItem("idVauchoemxiuanhnhe", idVoucher);
    localStorage.setItem("shippingCost", shippingCost);
    localStorage.setItem("branchId", props.branchId);
    localStorage.setItem("branchName", props.branchName);
    localStorage.setItem("isMomoPayment", true);
    localStorage.setItem("leadtime", leadTime);
    goLinkMomoPayment(amount).then((res) => {
      if (res.statusCode === 200) {
        var win = window.open(res.data.payUrl);
        win.focus();
      }
    });
  };

  //-------------------------------------END MOMO---------------------------------------------

  //-------------------------------------START VOUCHER---------------------------------------------

  return (
    <div className={classes.container}>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <ListVoucher
          listVoucher={listVoucher}
          setIdVoucher={setIdVoucher}
          setSalePrice={setSalePrice}
          setNameVoucher={setNameVoucher}
          totalPrice={props.cart.totalPrice + shippingCost - salePrice}
        />
      </Modal>
      <div className={classes.paymentDetail}>
        <div className={classes.information}>
          <div className={classes.left}>
            <div className={classes.detailOrder}>
              <div className={classes.title}>Detail Order</div>
              <div className={classes.detailContent}>
                <div className={classes.contentItem}>
                  <div className={classes.display}>SubTotal</div>
                  <div className={classes.price}>
                    {numberWithCommas(props.cart.totalPrice)} VND
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Shipping Cost</div>

                  <div className={classes.price}>
                    {numberWithCommas(shippingCost)} VND
                  </div>
                </div>
                <div
                  className={classes.select_voucher}
                  onClick={() => showModal()}
                >
                  <div className={classes.title_voucher}>
                    <ArrowFatLinesRight size={20} weight="thin" /> Select
                    Voucher <Tag size={20} weight="thin" />
                  </div>
                  <div className={classes.name_voucher}>{nameVoucher}</div>
                </div>
                <div className={classes.total}>
                  <div className={classes.display}>Grand Total</div>
                  <div className={classes.price}>
                    {props.cart.totalPrice + shippingCost - salePrice > 0
                      ? numberWithCommas(
                          props.cart.totalPrice + shippingCost - salePrice
                        )
                      : 0}{" "}
                    VND
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.paymentDetails}>
              <div className={classes.paymentMethod}>
                <div className={classes.title}>Payment Method</div>
                <Radio.Group
                  onChange={onChange}
                  value={methodPayment}
                  className={classes.paymentChoice}
                >
                  <Radio value={1} className={classes.paymentMethodItem}>
                    <CreditCard size={20} color="#000" />
                    Credit Card
                  </Radio>
                  <Radio value={2} className={classes.paymentMethodItem}>
                    <Truck size={20} color="#000" />
                    Cash on delivery
                  </Radio>
                  <Radio value={3} className={classes.paymentMethodItem}>
                    <Wallet size={20} color="#000" />
                    Momo
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.orderDetail}>
              <div className={classes.title}>Order Detail</div>
              <div className={classes.orderContent}>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Items</div>
                  <div className={classes.itemList}>
                    {props.cart._products?.map((item, index) => {
                      return (
                        <div className={classes.item} key={index}>
                          <div className={classes.productName}>
                            {item.productName}
                          </div>
                          <span>
                            {item.quantity} x{" "}
                            {numberWithCommas(item.productPrice)} VND
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Name</div>
                  <div className={classes.customerName}>
                    {props.user.currentUser.name}
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Phone</div>
                  <div className={classes.customerPhone}>
                    {checkTypeItem(
                      props.user.currentUser.phone !== "0"
                        ? props.user.currentUser.phone
                        : "N/A"
                    )}
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Email</div>
                  <div className={classes.customerEmail}>
                    {props.user.currentUser.email}
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Shipping Address</div>
                  <div className={classes.shippingAddress}>
                    {currentAddressName}
                    {/* {paymentInfo.orderDetail.shippingAddress} */}
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Recipient Name</div>
                  <div className={classes.shippingAddress}>
                    {currentRecipientName}
                    {/* {paymentInfo.orderDetail.shippingAddress} */}
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Recipient Phone</div>
                  <div className={classes.shippingAddress}>
                    {currentRecipientPhone}
                    {/* {paymentInfo.orderDetail.shippingAddress} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {methodPayment === 1 ? (
          <div className={classes.btnContainer}>
            <div className={classes.btn} onClick={() => navigate("/checkout")}>
              <button>Select address</button>
            </div>
            <StripeCheckout
              name={props.user.currentUser.name}
              image={avatarPlaceholder}
              description={`Tổng của bạn là ${numberWithCommas(
                props.cart.totalPrice + props.shippingCost - salePrice >= 0
                  ? parseInt(
                      props.cart.totalPrice.toString().replace(".", "")
                    ) +
                      props.shippingCost -
                      salePrice
                  : 0
              )} VND`}
              amount={
                props.cart.totalPrice + props.shippingCost - salePrice >= 0
                  ? parseInt(
                      props.cart.totalPrice.toString().replace(".", "")
                    ) +
                    props.shippingCost -
                    salePrice
                  : 0
              }
              email={props.user.currentUser.email}
              token={onToken}
              stripeKey={STRIPE_PK_KEY}
              currency="VND"
            >
              <div className={classes.btn}>
                <button>Proceed Payment</button>
              </div>
            </StripeCheckout>
          </div>
        ) : methodPayment === 2 ? (
          <div className={classes.btnContainer}>
            <div className={classes.btn} onClick={() => navigate("/checkout")}>
              <button>Select address</button>
            </div>
            <div className={classes.btn} onClick={hanldeCheckoutCOD}>
              <button>Proceed Payment</button>
            </div>
          </div>
        ) : (
          <div className={classes.btnContainer}>
            <div className={classes.btn} onClick={() => navigate("/checkout")}>
              <button>Select address</button>
            </div>
            <div
              className={classes.btn}
              onClick={() =>
                handleMomo(
                  props.cart.totalPrice + props.shippingCost - salePrice >= 0
                    ? parseInt(
                        props.cart.totalPrice.toString().replace(".", "")
                      ) +
                        props.shippingCost -
                        salePrice
                    : 0
                )
              }
            >
              <button>Proceed Payment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
PaymentDetail.propsType = {
  paymentInfo: PropsType.object,
};

export default PaymentDetail;
