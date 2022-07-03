import { message, Radio } from "antd";
import PropsType from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import numberWithCommas from "../../../utils/numberWithCommas";
import classes from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getInfoService, getShippingCost } from "../../../api/Shipping";
import StripeCheckout from "react-stripe-checkout";
import avatarPlaceholder from "../../../assets/user_avatar.jpg";
import { checkTypeItem } from "../../../utils/checkTypeItem";
import { CreditCard, Truck } from "phosphor-react";
import {
  doCheckoutByCard,
  doCheckoutByCod,
  doDeleteAllCart,
} from "../PaymentAPI";
import { deleteAllCart } from "../../../redux/cartRedux";

const STRIPE_PK_KEY =
  "pk_test_51K0LBnFjydqiWgwtTtGT2ONJJuo4TAWczmDWero4QwWVw7p6n93JvDHkkDe70u1XVF5cT0kCsJQC59DJmQdBGPys00B3LSLWLk";

const PaymentDetail = (props) => {
  const [methodPayment, setMethodPayment] = useState(1);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      props.hanldeLoading(true);
      const data = {
        tokenId: token.id,
        amount: props.cart.totalPrice,
        username: props.user.currentUser.username,
        email: props.user.currentUser.email,
        address: props.address[0].address,
        recipientName: props.address[0].recipientName,
        recipientPhone: props.address[0].recipientPhone,
      };
      doCheckoutByCard(data)
        .then((res) => {
          // console.log(res);
          message.success("Payment success");
          props.hanldeLoading(false);
          console.log(res);
          // props.takeOrderDetailForConfirmation(res.newOrder._id);

          setTimeout(() => {
            doDeleteAllCart({ username: data.username });
            dispatch(deleteAllCart());
            navigate(`/confirmation/${res.newOrder._id}`);
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
      address: props.address[0].address,
      recipientName: props.address[0].recipientName,
      recipientPhone: props.address[0].recipientPhone,
    };
    doCheckoutByCod(data)
      .then((res) => {
        message.success("Payment success");
        props.hanldeLoading(false);
        // props.takeOrderDetailForConfirmation(res._id);

        setTimeout(() => {
          doDeleteAllCart({ username: data.username });
          dispatch(deleteAllCart());
          navigate(`/confirmation/${res._id}`);
        }, 1000);
      })
      .catch(() => {
        message.error("payment fail, sthing went worng");
      });
  };
  // console.log(props);

  return (
    <>
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
                    {numberWithCommas(props.shippingCost)} VND
                  </div>
                </div>

                <div className={classes.total}>
                  <div className={classes.display}>Grand Total</div>
                  <div className={classes.price}>
                    {numberWithCommas(
                      props.cart.totalPrice + props.shippingCost
                    )}{" "}
                    VND
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.paymentDetails}>
              {/* <div className={classes.top}>
                <div className={classes.title}>Payment Detail</div>
                <div className={classes.time}>
                </div>
              </div>
              <div className={classes.bottom}>
                Please make a payment according with the limit time specified,
                starting from now
              </div> */}
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
                    {checkTypeItem(props.user.currentUser.phone)}
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
                    {props.address[0].address}
                    {/* {paymentInfo.orderDetail.shippingAddress} */}
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Recipient Name</div>
                  <div className={classes.shippingAddress}>
                    {props.address[0].recipientName}
                    {/* {paymentInfo.orderDetail.shippingAddress} */}
                  </div>
                </div>
                <div className={classes.contentItem}>
                  <div className={classes.display}>Recipient Phone</div>
                  <div className={classes.shippingAddress}>
                    {props.address[0].recipientPhone}
                    {/* {paymentInfo.orderDetail.shippingAddress} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {methodPayment === 1 ? (
          <StripeCheckout
            name={props.user.currentUser.name}
            image={avatarPlaceholder}
            description={`Tổng của bạn là ${numberWithCommas(
              props.cart.totalPrice
            )} VND`}
            amount={props.cart.totalPrice}
            email={props.user.currentUser.email}
            token={onToken}
            stripeKey={STRIPE_PK_KEY}
            currency="VND"
          >
            <div className={classes.btn}>
              <button>Proceed Payment</button>
            </div>
          </StripeCheckout>
        ) : (
          <div className={classes.btn} onClick={hanldeCheckoutCOD}>
            <button>Proceed Payment</button>
          </div>
        )}
      </div>
    </>
  );
};
PaymentDetail.propsType = {
  paymentInfo: PropsType.object,
};

export default PaymentDetail;
