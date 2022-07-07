import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Menu, Spin } from "antd";
import "antd/dist/antd.css";
import { motion } from "framer-motion";
import { DotsNine, ListDashes, Funnel } from "phosphor-react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBrand } from "../../../api/Brand";
import EmptyPage from "../../../components/Empty";
import { ProductCardGrid } from "../ProductCardGrid";
import { ProductCardList } from "../ProductCardList";
import RangePrice from "../RangePrice";
import classes from "./styles.module.scss";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ListProduct = (props) => {
  const [glActive, setGlActive] = useState(true);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [range, setRange] = useState([1000000, 10000000]);
  const [idBrand, setIdBrand] = useState("");

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
        <p className={classes.min_range_price}>1m </p>
        <p className={classes.max_range_price}>10m</p>
      </div>
      <hr className={classes.line_devide} />
      <p className={classes.title_filter}>Brand</p>
      <Checkbox.Group
        style={{ width: "100%" }}
        className={classes.checkbox_group}
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

      <button
        className={classes.submit_filter}
        onClick={() => props.handleFilter("", idBrand, range[0], range[1], "")}
      >
        Submit
      </button>
    </Menu>
  );

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
          <div className={classes.short__list__grid}>
            <Dropdown
              overlay={menu}
              placement="bottomLeft"
              arrow
              trigger={["click"]}
              overlayClassName={classes.filter}
            >
              <Funnel size={24} weight="thin" style={{ cursor: "pointer" }} />
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
            <Spin indicator={antIcon} />
          </div>
        ) : props.data.products?.length > 0 ? (
          <div id="scrollableDiv">
            <InfiniteScroll
              dataLength={1}
              next={() => {
                alert("asdjsadj");
                if (page < props.totalPages) {
                  props.fetchMore(page);
                }
              }}
              hasMore={true}
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
