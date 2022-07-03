import { message } from "antd";
import { CalendarCheck, CreditCard, ListChecks } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getInfoService, getShippingCost } from "../../api/Shipping";
import Confirmation from "./Confirmation/Confirmation";
import { getAddress } from "./PaymentAPI";
import PaymentDetail from "./PaymentDetail/PaymentDetail";
import classes from "./styles.module.scss";
import AppLoader from "../../components/AppLoader";
import { doGetDetailOrder, doGetDetailOrderCard } from "./ConfirmationAPI";

const Payment = () => {
  const location = useLocation();
  const [step, setStep] = useState(0);

  const [serviceId, setServiceId] = useState(0);
  const [shopinfo, setShopInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [address, setAdrress] = useState();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [shippingCost, setShippingCost] = useState(0);
  const [orderDetail, setOrderDetail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    setStep(location.pathname.split("/")[1] === "payment" ? 0 : 1);
  }, [location.pathname]);
  useEffect(() => {
    getInfoService(1542, 1442).then((res) => {
      if (res) {
        setShopInfo(res.data);
        setServiceId(res.data.data[0].service_id);
      }
    });
  }, []);
  useEffect(() => {
    getAddress(user.currentUser.username)
      .then((res) => {
        //console.log(res[0].addressList);
        setAdrress(res[0].addressList);
      })
      .catch(() => {
        message.error("Loading address fail, you must create one to continue");
        navigate("/myaccount/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.currentUser.username]);

  useEffect(() => {
    getShippingCost(
      serviceId,
      cart.totalPrice,
      null,
      "20314",
      1444,
      1542,
      1000,
      15,
      15,
      15
    ).then((res) => {
      if (res) {
        setShippingCost(res.data.data.total);
      }
    });
  }, [serviceId, cart.totalPrice]);

  //console.log("shippingCost:", shippingCost);
  const hanldeLoading = (isLoading) => {
    setLoadingPayment(isLoading);
  };

  // const takeOrderDetailForConfirmation = (id) => {
  //   doGetDetailOrder(id)
  //     .then((res) => {
  //       setOrderDetail(res);
  //     })
  //     .catch(() => {
  //       message.error("Loading order detail fail");
  //     });
  // };

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <div className={classes.paymentContainer}>
          <div className={classes.payment}>
            <div className={classes.paymentHeader}>
              <div className={classes.title}>
                1. Checkout
                <div className={classes.icon}>
                  <CalendarCheck size={28} weight="fill" />
                </div>
              </div>
              <div className={classes.line}></div>
              <div
                className={`${classes.title} ${step === 0 && classes.active}`}
              >
                2. Payment
                <div className={classes.icon}>
                  <CreditCard size={28} weight="fill" />
                </div>
              </div>
              <div className={classes.line}></div>
              <div
                className={`${classes.title} ${step === 1 && classes.active}`}
              >
                3. Confirmation
                <div className={classes.icon}>
                  <ListChecks size={28} weight="fill" />
                </div>
              </div>
            </div>
            {loadingPayment && <AppLoader />}
            <div className={classes.content}>
              {step === 0 ? (
                <PaymentDetail
                  shippingCost={shippingCost}
                  cart={cart}
                  user={user}
                  address={address}
                  hanldeLoading={hanldeLoading}
                />
              ) : (
                <Confirmation shippingCost={shippingCost} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
