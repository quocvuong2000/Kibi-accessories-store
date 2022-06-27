import { CalendarCheck, CreditCard, ListChecks } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getInfoService, getShippingCost } from "../../api/Shipping";
import Confirmation from "./Confirmation/Confirmation";
import PaymentDetail from "./PaymentDetail/PaymentDetail";
import classes from "./styles.module.scss";
const fakePaymentData = {
  detailOrder: {
    subTotal: 2152000,
    shippingCost: 500000,
    promoCode: "VietNamVoDich",
    packaging: 50000,
    grandTotal: 2702000,
  },
  paymentDetail: {
    timeLitmit: "12:00:00",
  },
  orderDetail: {
    OrderNumber: "MTAWEB-3A86D4DB",
    PurchaseDate: "2019-11-07 14:01:48",
    items: [
      {
        product: "Way Kambas Mini Ebony",
        quantity: 2,
        price: 10240000,
      },
      {
        product: "Sikka (Ebony & Mapple)",
        quantity: 1,
        price: 12640000,
      },
    ],
    customerName: "Rasyidin Arsyad Nasution",
    customerPhone: "0707000449",
    customerEmail: "vuongtech@gmail.com",
    shippingAddress: "367 Hong Bang P11 Q5",
  },
};
const Payment = () => {
  const location = useLocation();
  const [step, setStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setStep(location.pathname.split("/")[1] === "payment" ? 0 : 1);
  }, [location.pathname]);

  const [serviceId, setServiceId] = useState(0);
  const [shopinfo, setShopInfo] = useState([]);

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    getInfoService(1542, 1442).then((res) => {
      if (res) {
        setShopInfo(res.data);
        setServiceId(res.data.data[0].service_id);
      }
    });
  }, []);

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
  }, [serviceId]);

  console.log("shippingCost:", shippingCost);

  return (
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
          <div className={`${classes.title} ${step === 0 && classes.active}`}>
            2. Payment
            <div className={classes.icon}>
              <CreditCard size={28} weight="fill" />
            </div>
          </div>
          <div className={classes.line}></div>
          <div className={`${classes.title} ${step === 1 && classes.active}`}>
            3. Confirmation
            <div className={classes.icon}>
              <ListChecks size={28} weight="fill" />
            </div>
          </div>
        </div>
        <div className={classes.content}>
          {step === 0 ? (
            <PaymentDetail
              shippingCost={shippingCost}
              cart={cart}
              user={user}
            />
          ) : (
            <Confirmation shippingCost={shippingCost} cart={cart} user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
