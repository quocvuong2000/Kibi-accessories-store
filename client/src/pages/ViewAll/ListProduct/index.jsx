import { useClickOutside } from "@mantine/hooks";
import { Button, Dropdown, Menu, Radio } from "antd";
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
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [range, setRange] = useState([1000000, 10000000]);
  const [idBrand, setIdBrand] = useState("");
  const [visibleDropdown2, setVisibleDropdown2] = useState(false);
  const ref3 = useClickOutside(() => setVisibleDropdown2(false));
  const handleGrid = () => {
    setGlActive(false);
  };
  const handleList = () => {
    setGlActive(true);
  };

  function handleChange(checkedValues) {
    setValue(checkedValues.target.value);
  }
  const menu = (
    <Menu>
      <RangePrice setValue={setRange} value={range} />
      <div className={classes.text_range}>
        <p className={classes.min_range_price}>1.000.000vnđ</p>
        <p className={classes.max_range_price}>10.000.000vnđ</p>
      </div>
      <hr className={classes.line_devide} />
      <p className={classes.title_filter}>Brand</p>
      <Radio.Group style={{ width: "100%" }} className={classes.checkbox_group}>
        {props.listBrand?.brands?.map((item, index) => {
          return (
            <Radio
              key={index}
              checked={item._id === value}
              value={item._id}
              onChange={() => setIdBrand(item._id)}
            >
              {item.brand}
            </Radio>
          );
        })}
      </Radio.Group>
      <hr className={classes.line_devide} />
      <p className={classes.title_filter}>Rating</p>
      <Button
        className={classes.submit_filter}
        onClick={() => {
          setVisibleDropdown2(false);
          props.handleFilter("", idBrand, range[0], range[1], "");
        }}
      >
        Submit
      </Button>
    </Menu>
  );
  const handleVisibleChange = (flag) => {
    setVisibleDropdown2(flag);
  };
  return (
    <>
      <div className={classes.container} id="scrollableDiv">
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
                onVisibleChange={handleVisibleChange}
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
        ) : props.data.products?.length > 0 ? (
          <div>
            <InfiniteScroll
              dataLength={props.data.products.length}
              next={() => {
                alert("asdsadjh");
              }}
              hasMore={true}
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
                {props.data.products?.map((item, index) => {
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
