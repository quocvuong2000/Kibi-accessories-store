import { Empty, message, Steps } from "antd";
import "antd/dist/antd.css";
import { CreditCard, HandGrabbing, Truck } from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppLoader from "../../../components/AppLoader";
import OrderListItem from "./OrderListItem/OrderListItem";
import { doGetListOrder, doGetListOrderByCustomer } from "./OrderManagementAPI";
import classes from "./styles.module.scss";

const { Step } = Steps;
const STATUS = {
  0: "PENDING",
  1: "DELIVERY",
  2: "COMPLETED",
};
const OrderManagement = () => {
  const [current, setCurrent] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(STATUS[0]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [noOrderData, setNoOrderData] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [nextPage, setNextPage] = useState();
  const onChange = (value) => {
    setCurrent(value);
    setCurrentStatus(STATUS[value]);
  };
  console.log(currentStatus);
  useEffect(() => {
    setPage(1);
    doGetListOrderByCustomer(1, currentStatus, user.currentUser.username)
      .then((res) => {
        setOrderList(res.orders);
        setNextPage(res.nextPage);
        setNoOrderData(false);
        if (res.totalItems === 0) {
          setNoOrderData(true);
        }
      })
      .catch(() => {
        message.error("Loading error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.currentUser.username, currentStatus]);

  const fetchNext = () => {
    setPage(page + 1);
    doGetListOrderByCustomer(page + 1, currentStatus, user.currentUser.username)
      .then((res) => {
        setOrderList((prev) => [...prev, ...res.orders]);
        setNextPage(res.nextPage);
      })
      .catch(() => {
        message.error("Loading error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Steps current={current} onChange={onChange}>
        <Step
          className={`${classes.stepContainer} ${
            current === 0 && classes.active
          }`}
          title="In Progress"
          icon={<CreditCard />}
        />
        <Step
          className={`${classes.stepContainer} ${
            current === 1 && classes.active1
          }`}
          title="Delivery"
          icon={<Truck />}
        />
        <Step
          className={`${classes.stepContainer} ${
            current === 2 && classes.active1
          }`}
          title="Received"
          icon={<HandGrabbing />}
        />
      </Steps>
      <div className={classes.orderList}>
        {loading ? (
          <div className={classes.loading}>
            <AppLoader />
          </div>
        ) : noOrderData ? (
          <div className={classes.noData} style={{ marginTop: "80px" }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={"No Data"}
            />
          </div>
        ) : (
          <>
            {orderList.map((item, index) => {
              return <OrderListItem key={index} orderItem={item} />;
            })}
            {nextPage !== null && (
              <div
                className={classes.seeMore}
                onClick={() => {
                  fetchNext();
                }}
              >
                See more order
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
