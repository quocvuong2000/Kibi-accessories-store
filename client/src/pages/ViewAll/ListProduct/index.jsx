import { useClickOutside } from "@mantine/hooks";
import { Button, Checkbox, Dropdown, Menu, Radio, Rate } from "antd";
import "antd/dist/antd.css";
import { motion } from "framer-motion";
import { DotsNine, Funnel, ListDashes } from "phosphor-react";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyPage from "../../../components/Empty";
import DotLoading from "../../../components/Verify/DotLoading";
import { ProductCardGrid } from "../ProductCardGrid";
import { ProductCardList } from "../ProductCardList";
import RangePrice from "../RangePrice";
import classes from "./styles.module.scss";

const ListProduct = (props) => {
  const [glActive, setGlActive] = useState(true);

  const [value, setValue] = useState("");
  const [range, setRange] = useState([1000000, 10000000]);
  const [idBrand, setIdBrand] = useState([]);
  const [visibleDropdown2, setVisibleDropdown2] = useState(false);
  const ref3 = useClickOutside(() => setVisibleDropdown2(false));
  const [rating, setRating] = useState(0);
  const handleGrid = () => {
    setGlActive(false);
  };
  const handleList = () => {
    setGlActive(true);
  };

  function handleChange(checkedValues) {
    setValue(checkedValues.target.value);
  }

  function handleChangeRating(e) {
    setRating(e.target.value);
  }
  const onChange = (checkedValues) => {
    setIdBrand(checkedValues);
  };
  const fakeRating = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item disabled style={{ cursor: "auto", color: "unset" }} key={20}>
        <>
          <RangePrice setValue={setRange} value={range} key={1} />

          <div className={classes.text_range} key={2}>
            <p className={classes.min_range_price}>1.000.000vnđ</p>
            <p className={classes.max_range_price}>10.000.000vnđ</p>
          </div>
          <hr className={classes.line_devide} key={3} />
          <p className={classes.title_filter} key={4}>
            Brand
          </p>
          <Checkbox.Group
            style={{ width: "100%" }}
            className={classes.checkbox_group}
            key={5}
            onChange={onChange}
          >
            {props.listBrand?.brands?.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  checked={item._id === value}
                  value={item._id}
                  onChange={() => setIdBrand(item._id)}
                >
                  {item.brand}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
          <hr className={classes.line_devide} key={6} />
          <p className={classes.title_filter} key={7}>
            Rating
          </p>
          <Radio.Group
            style={{ width: "100%" }}
            className={classes.rating_box}
            key={9}
          >
            {fakeRating.map((item, index) => {
              return (
                <Radio
                  key={index + 1}
                  checked={index + 1 === rating}
                  value={index + 1}
                  onChange={handleChangeRating}
                >
                  {item.id} <Rate disabled value={index + 1} />
                </Radio>
              );
            })}
          </Radio.Group>
        </>
      </Menu.Item>
      <Menu.Item key={21}>
        <Button
          key={8}
          className={classes.submit_filter}
          onClick={() => {
            setVisibleDropdown2(false);
            props.handleFilter("", idBrand, range[0], range[1], rating);
          }}
        >
          Submit
        </Button>
      </Menu.Item>
    </Menu>
  );
  const handleVisibleChange = (flag) => {
    setVisibleDropdown2(flag);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.image__wrap}>
          <img
            src="https://matoa-indonesia.com/wp-content/uploads/2022/05/Req-10-01-1-scaled.jpg"
            alt=""
          />
        </div>
        <div className={classes.way__result}>
          <p className={classes.showing}>
            {props.data?.totalItems <= 10
              ? props.data?.totalItems !== 0 &&
                props.data?.totalItems !== undefined &&
                `Showing 1- ${props.data?.totalItems} of ${props.data?.totalItems} results`
              : `Showing 1-10 of ${props.data?.totalItems} results`}

            {props.data?.totalItems === undefined ||
              (props.data?.totalItems === 0 && `Showing 0 of 0 result`)}
          </p>
          <div className={classes.short__list__grid} ref={ref3}>
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              arrow
              trigger={["click"]}
              overlayClassName={classes.filter}
              // visible={visibleDropdown2}
            >
              <Funnel
                size={24}
                weight="thin"
                style={{ cursor: "pointer" }}
                onClick={() => setVisibleDropdown2(!visibleDropdown2)}
              />
            </Dropdown>
            <p className={classes.txtviewon}>View on</p>
            <ListDashes
              size={32}
              onClick={handleList}
              className={glActive ? classes.opa1 : classes.opa07}
            />
            <DotsNine
              size={32}
              onClick={handleGrid}
              className={!glActive ? classes.opa1 : classes.opa07}
            />
          </div>
        </div>
        {props.loading === true ? (
          <div className={classes.spin}>
            <DotLoading />
          </div>
        ) : props.listProduct?.length > 0 ? (
          <div>
            <InfiniteScroll
              containerHeight={200}
              dataLength={props.listProduct?.length}
              next={() => {
                props.fetchMore(props.page + 1);
                props.setPage(props.page + 1);
              }}
              hasMore={props.page !== props.totalPages ? true : false}
              loader={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "50px",
                  }}
                >
                  <DotLoading />
                </div>
              }
              scrollableTarget="scrollableDiv"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div
                className={`${classes.listItem} ${glActive ? classes.row : ""}`}
              >
                {props.listProduct?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {glActive ? (
                        <motion.span
                          animate={
                            glActive
                              ? { scale: [2, 1], opacity: [0, 1] }
                              : { x: "-100%" }
                          }
                          key={index}
                        >
                          <ProductCardList data={item} key={index} />
                        </motion.span>
                      ) : (
                        <motion.span
                          animate={{
                            x: [-500, 0],
                            opacity: [0, 1],
                          }}
                          key={index + 1}
                        >
                          <ProductCardGrid data={item} key={index} />{" "}
                        </motion.span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <EmptyPage />
        )}
      </div>
    </>
  );
};

export default ListProduct;
